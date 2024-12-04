import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { StorageKey } from '@/enums'
import { UserProfile } from '@/models/user-profile'

export const useUserStore = defineStore('user', () => {
  const { USER_PROFILE } = StorageKey
  const { cookies } = useCookies()

  /** 使用者資料 */
  const userProfile = reactive<UserProfile>(new UserProfile())

  /** 使用者資料是否為空 */
  const isUserProfileEmpty = computed(() =>
    Object.values(userProfile).every((value) => !value)
  )

  /**
   * Cookies 的使用者資料是否正確
   */
  function isCookiesUserProfileValid(): boolean {
    return !!cookies.get(USER_PROFILE)
  }

  /**
   * 重設 Token 資料
   */
  function resetUserProfile(): void {
    Object.assign(userProfile, new UserProfile())
    cookies.remove(USER_PROFILE)
  }

  /**
   * 設定使用者資料
   */
  function setUserProfile(data: UserProfile): void {
    Object.assign(userProfile, data)
    cookies.set(USER_PROFILE, JSON.stringify(data))
  }

  /**
   * 從 Cookies 取得使用者資料，並寫入 Store
   */
  function setUserProfileByCookies(): void {
    if (isCookiesUserProfileValid()) {
      Object.assign(userProfile, cookies.get(USER_PROFILE))
    }
  }

  return {
    isUserProfileEmpty,
    isCookiesUserProfileValid,
    userProfile,
    resetUserProfile,
    setUserProfile,
    setUserProfileByCookies
  }
})
