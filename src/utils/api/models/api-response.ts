import type { AxiosResponse } from 'axios'
import type { ApiResponseModel } from './api-response-model'

export type ApiResponse = AxiosResponse<Omit<ApiResponseModel, 'data'>>
