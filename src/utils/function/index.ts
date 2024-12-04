/**
 * 防抖。可用於 input 輸入框、搜尋框等
 * @param fn
 * @param delay
 */
export const debounce = (fn: Function, delay = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * 節流。可用於 scroll、resize 等
 * @param fn
 * @param delay
 */
export const throttle = (fn: Function, delay: number = 300) => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number
  return function (this: any, ...args: any[]) {
    const context = this
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= delay) {
            fn.apply(context, args)
            lastTime = Date.now()
          }
        },
        Math.max(delay - (Date.now() - lastTime), 0)
      )
    }
  }
}
