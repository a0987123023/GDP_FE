<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useEnv } from './composables'
import { reloadKey } from './types'
const env = useEnv()
const route = useRoute()
const isRouterAlive = ref(true)
const reload = (): void => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide(reloadKey, reload)

const layout = computed(() => {
  console.log('🚀 ~ route:', route)
  return route.meta?.layout
})

console.info({
  env
})

watch(route, (newRoute) => {
  console.log('🚀 ~ route:', newRoute)
})
</script>

<template>
  <component :is="layout" v-if="layout">
    <router-view v-if="isRouterAlive" />
  </component>
</template>
