import type { AxiosResponse } from 'axios'
import type { ApiResponseModel } from './api-response-model'

export type ApiDataResponse<T> = AxiosResponse<ApiResponseModel<T>>
