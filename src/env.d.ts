/// <reference types="vite/client" />

/**
 * 是否啟用功能
 *
 * - '0' - 關閉
 * - '1' - 開啟
 */
type EnvIsEnable = '0' | '1'

interface ImportMetaEnv {
  /** Api Base Url */
  readonly VITE_API_BASE_URL: string
  /** 是否顯示開發環境用的選單 */
  readonly VITE_SHOW_DEVELOP_MENU: EnvIsEnable
}
