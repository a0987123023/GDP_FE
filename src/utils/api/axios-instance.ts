import type { AxiosError } from 'axios'
import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { storeToRefs } from 'pinia'
import { useLocationUtils, useNotification } from '@/composables'
import { useEnv } from '@/composables/use-env'
import { langConfig } from '@/configs'
import i18n from '@/plugins/i18n'
import { useAuthStore } from '@/stores/auth'
import pinia from '@/stores/create-pinia'
import { useLoadingStore } from '@/stores/loading'
import { useUserStore } from '@/stores/user'
import { debounce } from '@/utils/function'
import { blobToApiResponse } from '../file'
import type { ApiDataResponse } from './models'

const authStore = useAuthStore(pinia)
const userStore = useUserStore(pinia)
const loadingStore = useLoadingStore(pinia)
const { resetTokenData } = authStore
const { tokenData } = storeToRefs(authStore)
const { isLoading } = storeToRefs(loadingStore)
const { resetUserProfile } = userStore
const { t, locale } = i18n.global

/** 預設的 API 網址，當前網址 + 88 port */
const defaultBaseURL = `${window.location.protocol}//${window.location.hostname}`

const insuranceInfoRequest = axios.create({
  // 未設定 VITE_API_BASE_URL 時（值為 falsy），使用預設的 API 網址
  baseURL: useEnv().VITE_API_BASE_URL || defaultBaseURL
})

const locationUtils = useLocationUtils()

let loadingCount = 0
let loading: LoadingInstance | null = null

const addLoading = ({
  target,
  loadingText = 'Loading'
}: {
  target?: string | HTMLElement
  loadingText?: string
}) => {
  isLoading.value = true
  if (loadingCount === 0 && !loading) {
    loading = ElLoading.service({
      lock: true,
      text: target ? loadingText : 'loading...',
      background: target
        ? 'rgba(255, 255, 255, 0.6)'
        : 'rgba(255, 255, 255, 0)',
      target
    })

    const TOP_Z_INDEX = '9999'
    if (!target) {
      /** 沒有指定目標(body)的話，覆蓋 element 自動計算 zIndex 值，使 loading 永遠在最上層 */
      loading.$el.style.zIndex = TOP_Z_INDEX
      // loading.$el.style.visibility = 'hidden'
      loading.$el.style.color = 'red'
      loading.$el.style.stroke = 'red'
    }
  }
  loadingCount++
}
const closeLoading = () => {
  loadingCount--
  if (loadingCount === 0) {
    closeLoadingHandler()
  }
}

/** 只執行 delay 期間的最後一次 loading  */
const closeLoadingHandler = debounce(() => {
  if (loadingCount > 0) {
    /** 若在 delay 期間還有持續發送請求，則不關閉 loading */
    return
  }
  isLoading.value = false
  loading?.close()
  loading = null
})

insuranceInfoRequest.interceptors.request.use(
  (config) => {
    if (config.extraConfig?.isShowLoading) {
      addLoading({
        target: config.extraConfig.loadingTarget,
        loadingText: config.extraConfig.loadingText
      })
    }

    if (tokenData.value?.token) {
      config.headers['Authorization'] = `Bearer ${tokenData.value?.token}`
    }

    // 設定語系 header
    const lang = (locale as unknown as globalThis.Ref<keyof typeof langConfig>)
      .value
    config.headers['Accept-Language'] =
      langConfig[lang]?.headerLang ?? langConfig['tw'].headerLang

    return { ...config }
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 因 auth-guard.ts 使用 LoginService.userData()，
 * 如果import @/router/index.ts 的 router 時會產生循環依賴的問題，
 * 因此登出時使用 locationUtils.toLogin() 直接改變 location.pathname
 *
 * 循環依賴順序如下
 * => @/utils/api/axios-instance.ts
 * => @/router/index.ts
 * => @/guards/auth-guard.ts
 * => @/services/login-api.service.ts
 * => @/utils/api/api-factory.ts
 * => @/utils/api/axios-instance.ts
 */
insuranceInfoRequest.interceptors.response.use(
  async (response: ApiDataResponse<any>) => {
    const { config, data } = response

    const { message, rtnCode } = data
    const isSuccess = rtnCode === '0'
    if (config.extraConfig?.isShowLoading) {
      closeLoading()
    }
    if (rtnCode === '2') {
      resetTokenData()
      resetUserProfile()
      locationUtils.toLogin()
    }
    if (rtnCode === '3') {
      /** 提示錯誤後  按下確定後返回首頁 */
      ElMessageBox.alert(message, t('_Common.States.Warning'), {
        confirmButtonText: t('_Common.Buttons.Ok'),
        type: 'warning',
        showClose: false
      }).then(() => {
        locationUtils.toHome()
      })
      return response
    }

    if (rtnCode === '5') {
      useNotification().infoNotification(message)
      return response
    }

    if (response.headers['content-type'].includes('application/octet-stream')) {
      return response
    }
    if (
      response.headers['content-type'].includes(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    ) {
      return response
    }

    //  rtnCode = 01 & 11 時需要使用alert提示
    if (rtnCode === '01' || rtnCode === '11') {
      await ElMessageBox.alert(
        message,
        rtnCode === '01'
          ? t('_Common.States.Message')
          : t('_Common.States.Warning'),
        {
          confirmButtonText: t('_Common.Buttons.Ok')
        }
      ).catch(() => {})
      return response
    }

    // 檔案下載有錯誤，當回應為 Blob 且 Content-Type 為 application/json 時
    if (
      response.data instanceof Blob &&
      response.headers['content-type'].includes('application/json')
    ) {
      // 將 Blob 轉換為 JSON
      const data = await blobToApiResponse(response)
      // 顯示錯誤訊息
      useNotification().errorNotification(data.message)
    }

    if (!isSuccess && rtnCode !== '-1') {
      useNotification().errorNotification(message)
    }

    return response
  },
  (error: AxiosError) => {
    if (error.config?.extraConfig?.isShowLoading) {
      closeLoading()
    }
    console.log(error)
    if (error.response?.status === 401) {
      resetTokenData()
      resetUserProfile()
      locationUtils.toLogin()
    }

    // Error 403 防呆回首頁
    if (error.response?.status === 403) {
      locationUtils.setPathname('/')
    }

    return Promise.reject(error)
  }
)

export default insuranceInfoRequest
