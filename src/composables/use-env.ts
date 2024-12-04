/**
 * 提供系統環境變數 Environment Variables
 */
export function useEnv() {
  /** Api Base Url */

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  /** 是否顯示開發環境用的選單 */
  const VITE_SHOW_DEVELOP_MENU = import.meta.env.VITE_SHOW_DEVELOP_MENU

  return {
    VITE_API_BASE_URL,
    VITE_SHOW_DEVELOP_MENU
  }
}
