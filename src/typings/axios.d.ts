import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    extraConfig?: {
      // 是否顯示讀取框
      isShowLoading?: boolean
      // 讀取框目標
      loadingTarget?: string | HTMLElement
      // 載入中的文字
      loadingText?: string
    }
  }
}
