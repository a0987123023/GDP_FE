import type { AxiosRequestConfig } from 'axios'
import axios from './axios-instance'
import type { ApiDataResponse, ApiResponse } from './models'

/**
 * - /api: API
 **/
type ApiPrefixPath = '/api' | '/fnapi'

export class ApiFactory {
  /** 預設API */
  private _apiPrefixPath = '/'

  /**
   * Creates an instance of ApiFactory.
   * @param {string} apiUrl API URL
   * @param {string} [listApiUrl] getList API URL
   * @param {ApiPrefixPath} [apiPrefixPath] API Prefix Path (default: /api)
   */
  constructor(
    private apiUrl: string,
    private listApiUrl?: string,
    private apiPrefixPath?: ApiPrefixPath
  ) {
    this._apiPrefixPath = this.apiPrefixPath || this._apiPrefixPath
  }

  /**
   * 取得單筆資料
   */
  protected getData(
    id: string | number,
    params?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiDataResponse<any>> {
    return this.get(`${this.apiUrl}/${id}`, params, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * 取得單筆資料 (多參數 Query Parameters)
   */
  protected getDataByParams(
    params: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiDataResponse<any>> {
    return this.get(this.apiUrl, params, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * 取得多筆資料
   */
  protected getList(
    params: any,
    config?: AxiosRequestConfig
  ): Promise<ApiDataResponse<any>> {
    return this.get(`${this.listApiUrl}`, params, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * 新增資料
   */
  protected createData(
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> {
    return axios.post(this._apiPrefixPath + this.apiUrl, data, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * 更新資料
   */
  protected updateData(
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> {
    return axios.put(this._apiPrefixPath + this.apiUrl, data, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * 刪除資料
   */
  protected deleteData(
    params: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> {
    return this.delete(this.apiUrl, params, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * Get 方法
   */
  protected get<Param, Response = ApiResponse>(
    url: string,
    params?: Param,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    const apiConfig: AxiosRequestConfig = {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      },
      params: { ...config?.params, ...params }
    }

    return axios.get(this._apiPrefixPath + url, apiConfig)
  }

  /**
   * Post 方法
   */
  protected post<Data, Response = ApiResponse>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    return axios.post(this._apiPrefixPath + url, data, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * Put 方法
   */
  protected put<Data, Response = ApiResponse>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    return axios.put(this._apiPrefixPath + url, data, {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      }
    })
  }

  /**
   * Delete 方法
   */
  protected delete<Param extends object, Response = ApiResponse>(
    url: string,
    params?: Param,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    const apiConfig: AxiosRequestConfig = {
      ...config,
      extraConfig: {
        isShowLoading: true,
        ...config?.extraConfig
      },
      params: { ...config?.params, ...params }
    }

    return axios.delete(this._apiPrefixPath + url, apiConfig)
  }
}
