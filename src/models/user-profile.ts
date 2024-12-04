/**
 * 使用者資訊
 */
export interface UserProfile {
  userId: string
}
export class UserProfile {
  constructor() {
    return {
      userId: ''
    }
  }
}
