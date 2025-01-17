import type { AxiosResponse } from 'axios'
import { ApiFactory } from '@/utils/api'
import type { ApiResponse } from './../utils/api/models/api-response'

class loadingService extends ApiFactory {
  constructor() {
    super('', '')
  }
  test(): Promise<ApiResponse> {
    return this.get('86614756-9053-4ef7-9b4a-8c7ac0704e58?mocky-delay=10000ms')
  }
}

export default new loadingService()
