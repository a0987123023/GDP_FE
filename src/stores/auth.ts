import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { StorageKey } from '@/enums'
import type { TokenData } from '@/models/token-data'

export const useAuthStore = defineStore('auth', () => {
  const { TOKEN } = StorageKey
  const { cookies } = useCookies()

  /** Token 資料 */
  const tokenData = ref<TokenData | null>(null)

  /** Token 資料是否為空 */
  const isTokenEmpty = computed(() => !tokenData.value)

  /**
   * Cookies 的 Token 資料是否正確
   */
  const isCookiesTokenDataValid = (): boolean => {
    return !!cookies.get(TOKEN)
  }

  /**
   * 重設 Token 資料
   */
  const resetTokenData = (): void => {
    tokenData.value = null
    cookies.remove(TOKEN)
  }

  /**
   * 設定 Token 資料
   */
  const setTokenData = (data: TokenData): void => {
    tokenData.value = data
    cookies.set(TOKEN, JSON.stringify(data), Infinity)
  }

  /**
   * 從 Cookies 取得 Token 資料，並寫入 Store
   */
  const setTokenDataByCookies = (): void => {
    if (isCookiesTokenDataValid() && cookies.get(TOKEN)) {
      const data = cookies.get(TOKEN)
      tokenData.value = typeof data === 'object' ? data : JSON.parse(data)
    }
  }

  return {
    isTokenEmpty,
    tokenData,
    isCookiesTokenDataValid,
    resetTokenData,
    setTokenData,
    setTokenDataByCookies
  }
})
