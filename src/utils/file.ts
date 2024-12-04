import type { AxiosResponse } from 'axios'
import type { ApiResponse, ApiResponseModel } from './api'

/**
 * 下載檔案
 * @param response 回應
 * @param fileName 檔案名稱 (預設為回應的 Content-Disposition 標頭中的檔案名稱)
 * @param callback 下載完成後的回呼函式
 */
export async function downloadFile({
  response,
  fileName
}: {
  response: ApiResponse | AxiosResponse<BlobPart>
  fileName?: string
}): Promise<void> {
  // 如果回應不是 Blob 則拋出錯誤
  if (response.data instanceof Blob === false) {
    return Promise.reject(new Error('Response is not Blob'))
  }

  // 當回應為 Blob 且 Content-Type 為 application/json 時
  if (
    response.data instanceof Blob &&
    response.headers['content-type'].includes('application/json')
  ) {
    const jsonText = await response.data.text()
    const data = JSON.parse(jsonText) as ApiResponseModel

    return Promise.reject(new Error(data.message))
  }

  // 處理下載檔案
  try {
    const url = window.URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers['content-type']?.toString()
      })
    )

    const name =
      fileName ||
      getFileNameFromContentDisposition(
        response.headers['content-disposition']?.toString()
      ) ||
      'download'

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return Promise.resolve()
  } catch (error) {
    console.error('Download failed:', error)
    return Promise.reject(error)
  }
}

/**
 * 判斷回應是否為 Blob
 * @param response 回應
 * @returns 是否為 Blob
 */
export function isBlob(
  response: ApiResponse | AxiosResponse<BlobPart>
): response is AxiosResponse<BlobPart> {
  return !(
    'data' in
    (response.data as unknown as ApiResponse | AxiosResponse<BlobPart>)
  )
}

/**
 * 從 Content-Disposition 標頭中取得檔案名稱
 * ```ts
 * // 使用範例
 * const contentDisposition = 'attachment; filename="example.txt"; filename*=UTF-8\'\'%E6%89%BF%E8%AB%BE%E9%A1%8D%E5%BA%A6%E8%BC%B8%E5%85%A5%E8%B3%87%E6%96%99%E5%8C%AF%E5%87%BA%E6%99%82%E9%96%9320240729_020133.xlsx'
 * const fileName = getFileNameFromContentDisposition(contentDisposition)
 * console.log(fileName) // 應該輸出: 承諾額度輸入資料匯出時間20240729_020133.xlsx
 * ```
 * @param contentDisposition Content-Disposition 標頭
 * @returns 檔案名稱
 */
export function getFileNameFromContentDisposition(
  contentDisposition: string | null | undefined
): string | null {
  if (!contentDisposition) {
    return null
  }

  const filenameMatch = contentDisposition.match(/filename="([^"]+)"/)
  const filenameStarMatch = contentDisposition.match(
    /filename\*=UTF-8''([^;]+)/
  )

  if (filenameStarMatch && filenameStarMatch[1]) {
    return decodeURIComponent(filenameStarMatch[1])
  } else if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1]
  }

  return null
}

/**
 * 將 Blob 轉換為 API response 格式
 * @param response
 * @return API response 格式
 */
export async function blobToApiResponse(
  response: ApiResponse | AxiosResponse<BlobPart>
): Promise<ApiResponseModel<any>> {
  if (response.data instanceof Blob === false) {
    return Promise.reject(new Error('Response is not Blob'))
  }

  if (!response.headers['content-type'].includes('application/json')) {
    return Promise.reject(new Error('Content-Type is not application/json'))
  }

  const jsonText = await response.data.text()

  try {
    return JSON.parse(jsonText) as ApiResponseModel
  } catch (error) {
    return Promise.reject(error)
  }
}
