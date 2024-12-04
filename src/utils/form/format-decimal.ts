import type { DecimalSetting } from '@/types'

/**
 * 處理資料多餘的小數位數
 */
export function formatDecimal<T extends object>(
  data: T,
  setting: DecimalSetting<T>
): T {
  return Object.entries(data).reduce((prev, [key, value]) => {
    const decimalDigit = setting[key as keyof T]

    prev[key as keyof T] = decimalDigit
      ? // 如果欄位有設定小數位數，將多餘位數的值刪除
        formatDecimalValue(value, decimalDigit)
      : value

    return prev
  }, {} as T)
}

/**
 * 移除多餘的小數位數
 */
function formatDecimalValue(value: string | number, decimalDigit: number) {
  const [intValue, decimalValue] =
    typeof value === 'number' ? value.toString().split('.') : value.split('.')

  if (decimalValue?.length > decimalDigit) {
    // 移除多餘的小數位數
    return `${intValue}.${decimalValue.slice(0, decimalDigit)}`
  }

  return value
}
