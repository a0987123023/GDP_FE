import type { ApiRtnCode } from './api-rtn-code'
import type { ApiValidateErrorModel } from './api-validate-errors'

export interface ApiResponseModel<T = any> {
  message: string
  /**
   * API 回傳狀態碼
   *
   * - -1: 表單驗證錯誤
   * -  0: API 請求成功
   * -  1: API 錯誤
   */
  rtnCode: ApiRtnCode
  pageSize: number | null
  currentPage: number | null
  totalRecord: number | null
  validateErrors: ApiValidateErrorModel[]
  data: T
}
