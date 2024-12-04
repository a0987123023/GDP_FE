import { computed, type WritableComputedRef } from 'vue'

/**
 * 子組件綁定 prop 及 emit，實現父子組件資料雙向綁定
 *
 * @param props 子組件的 Props 資料
 * @param key 要綁定的 Props 名稱 (需為 ref 資料)
 * @param emit 子組件的 emit 資料，需包含 update:{key}
 */
export function bindVModel<P, K extends keyof P>(
  props: P,
  emit: (name: any, ...args: any[]) => void,
  key: K
): WritableComputedRef<P[K]> {
  const propsKey = key
  const emitName = `update:${propsKey as string}`

  let computedRef: WritableComputedRef<P[K]>

  // 資料為 object 時才使用 proxy，set 時透過 emit('update:name')，由父組件更新資料
  if (typeof props[propsKey] === 'object' && props[propsKey] != null) {
    computedRef = computed({
      get() {
        return new Proxy(props[propsKey] as any, {
          set(obj, key, value) {
            computedRef.value = { ...obj, [key]: value }
            return true
          }
        })
      },
      set(newValue) {
        emit(emitName, newValue)
      }
    })
  } else {
    computedRef = computed({
      get() {
        return props[propsKey]
      },
      set(newValue) {
        emit(emitName, newValue)
      }
    })
  }

  return computedRef
}
