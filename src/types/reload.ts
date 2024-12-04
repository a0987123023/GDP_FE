import type { InjectionKey, Ref } from 'vue'

export interface Params {
  name: string
}
export const paramsKey: InjectionKey<Ref<Params>> = Symbol('')
export type reload = () => void
export const reloadKey: InjectionKey<reload> = Symbol('')
