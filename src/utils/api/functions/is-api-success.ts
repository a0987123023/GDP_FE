import type { ApiDataResponse, ApiResponse } from '@/utils/api'

type Response = ApiResponse | ApiDataResponse<any>

/**
 * 檢查 Api Response 是否成功
 */
export default function isApiSuccess(response: Response | Response[]): boolean {
  return Array.isArray(response)
    ? response.every(
        ({ data }) => data.rtnCode === '0' || data.rtnCode === '01'
      )
    : response.data.rtnCode === '0' || response.data.rtnCode === '01'
}
