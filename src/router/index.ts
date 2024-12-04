import { defineAsyncComponent, type App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import { useWebUpdateNotice } from '@/composables/web-update-notice'
import { RouterName } from '@/enums'
// import { authGuard } from '@/guards/auth-guard'
// import { useHistoryStateStore } from '@/stores/history-state'
// import { useMenuStore } from '@/stores/menu'

// const historyStateStore = useHistoryStateStore()
// const webUpdateNotice = useWebUpdateNotice()
// const menuStore = useMenuStore()

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    menuPath?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /** 登入頁 */
    {
      name: RouterName.LOGIN,
      path: '/login',
      meta: { layout: 'empty-layout' },
      component: () => import('@/views/Common/LogIn/index.vue')
    },
    {
      path: '/',
      // beforeEnter: [authGuard],
      children: [
        // TODO: 為解決Vue Router Warn，目前尚未建置的頁面都先顯示該畫面
        {
          name: RouterName.PAGE_NOT_FOUND,
          path: '/:pathMatch(.*)',
          component: () => import('@/views/Common/NotFound/index.vue')
        },
        /** 首頁 */
        {
          name: RouterName.HOME,
          path: '/',
          component: () => import('@/views/Home/index.vue')
        }
      ] satisfies (RouteRecordRaw & {
        name: RouterName
        path: string
        component: any
      })[]
    }
  ]
})

// 路由變更
router.beforeEach((_to, _from, next) => {
  // 手動檢查系統版本是否變更
  // webUpdateNotice.checkUpdate()
  next()
})

router.afterEach((to) => {
  console.log('🚀 ~ router.afterEach ~ to:', to)
  // historyStateStore.resetHistoryState()
  // historyStateStore.getHistoryState()
  // menuStore.setIsShow(true)
})

/**
 * 初始化動態 Layout
 *
 * 為避免循環依賴，因此由 @/main.ts 初始化動態 Layout
 * => @/router/index.ts
 * => @/main.ts (引入 app)
 * => @router/index.ts (引入 router)
 */
const initDynamicLayout = (app: App<Element>) => {
  const DEFAULT_LAYOUT = 'main-layout'
  router.beforeEach((to) => {
    // 若layout未設定，就設定為 DEFAULT_LAYOUT
    if (!to.meta.layout) {
      to.meta.layout = DEFAULT_LAYOUT
    }
    // 若該layout尚未註冊，就進行動態註冊
    if (!app.component(to.meta.layout)) {
      app.component(
        to.meta.layout,
        defineAsyncComponent(() =>
          import(`@/layouts/${to.meta.layout}.vue`).catch(
            () => import(`@/layouts/${to.meta.layout}/index.vue`)
          )
        )
      )
    }
    return true
  })
}

export { router, initDynamicLayout }
