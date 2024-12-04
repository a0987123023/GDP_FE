/**
 * 瀏覽器 location 共用方法
 */
export function useLocationUtils() {
  /**
   * 設定瀏覽器 pathname
   */
  const setPathname = (pathname: string) => {
    if (location.pathname !== pathname) {
      location.pathname = pathname
    }
  }

  /**
   * 設定瀏覽器 pathname 至登入頁
   */
  const toLogin = () => {
    setPathname('/login')
  }
  /**
   * 設定瀏覽器 pathname 至首頁
   */
  const toHome = () => {
    setPathname('/')
  }

  return {
    setPathname,
    toLogin,
    toHome
  }
}
