import type { ApiDataResponse } from '../models'

/**
 * 解析 API Response，取得資料
 */
export default function <T = any>(response: ApiDataResponse<T>): T {
  return response.data.data
}
