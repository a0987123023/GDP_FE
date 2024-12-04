// import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// import { RouterName } from '@/enums'
// import { LoginService } from '@/services'
// import { useAuthStore } from '@/stores/auth'
// import { useUserStore } from '@/stores/user'
// import { isApiSuccess, resolveApiData } from '@/utils/api/functions'

// /**
//  * 權限頁面路由守衛
//  */
// export async function authGuard(
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ): Promise<boolean> {
//   const authStore = useAuthStore()
//   const userStore = useUserStore()

//   // Token Store 為空時，從 Cookies 取得資料寫入 Store
//   if (authStore.isTokenEmpty && authStore.isCookiesTokenDataValid()) {
//     authStore.setTokenDataByCookies()
//   }

//   // // 使用者資料 Store 為空時，從 Cookies 取得資料寫入 Store
//   // if (useStore.isUserProfileEmpty && useStore.isCookiesUserProfileValid()) {
//   //   useStore.setUserProfileByCookies()
//   // }

//   const userRes = await LoginService.userData()
//   if (isApiSuccess(userRes)) {
//     userStore.setUserProfile(resolveApiData(userRes))
//   } else {
//     authStore.resetTokenData()
//     userStore.resetUserProfile()

//     next({ name: RouterName.LOGIN })
//     return false
//   }

//   // 如果 [Token] 或 [使用者資料] 為空時，重設兩者資料後導回首頁
//   //|| useStore.isUserProfileEmpty
//   if (authStore.isTokenEmpty || userStore.isUserProfileEmpty) {
//     authStore.resetTokenData()
//     userStore.resetUserProfile()

//     next({ name: RouterName.LOGIN })
//     return false
//   }

//   next()
//   return true
// }
