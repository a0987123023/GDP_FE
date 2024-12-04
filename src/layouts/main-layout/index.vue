<script setup lang="ts">
// import { ElLoading } from 'element-plus'
// import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
// import { storeToRefs } from 'pinia'
// import pinia from '@/stores/create-pinia'
// import { useLoadingStore } from '@/stores/loading'
import TheHeader from './components/the-header.vue'
import TheMenu from './components/the-menu.vue'
defineOptions({
  name: 'main-layout'
})
// const loadingStore = useLoadingStore(pinia)
// const { isLoading } = storeToRefs(loadingStore)
// const loading: LoadingInstance = ElLoading.service({
//   lock: true,
//   text: 'loading',
//   background: 'rgba(255, 255, 255, .5)',
//   target: 'app'
// })
// onMounted(() => {
//   isLoading.value = true
//   console.log('🚀 ~ loading:', loading)
// })
</script>

<template>
  <div :class="['main-layout']">
    <div class="header-wrapper" style="width: 100px">
      <the-header :columns="[]" :data="{}" />
      <the-menu />
    </div>

    <div :class="['content']">
      <div class="breadcrumb"></div>
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  @apply max-w-full min-h-full bg-[#fafafa] duration-700;
  @apply grid grid-cols-[350px_1fr] grid-rows-[minmax(80px,auto)_1fr];

  &.hide-menu {
    @apply grid grid-cols-[0px_1fr];
  }

  .header-wrapper {
    @apply row-[1/2] col-[1/3];
    @apply sticky top-0 z-10;
    .the-header {
      @apply sticky top-0 z-[999];
    }
    .the-menu {
      @apply absolute left-0;
      @apply overflow-x-hidden overflow-y-auto w-[350px] h-[calc(100vh-100%)] duration-700;
      @apply grid grid-rows-[auto_1fr];

      &.hide-menu {
        @apply left-[-350px];
      }
    }

    // 列印時 header 不浮動，避免瀏覽器畫面高度不足時，畫面會重疊
    @media print {
      position: unset !important;
    }
  }

  .content {
    @apply p-4 pt-2 overflow-x-auto overflow-y-auto;
    @apply flex flex-col row-[2/3] col-[2/3];

    &.hide-breadcrumb {
      @apply grid grid-rows-[1fr];
    }
    .breadcrumb {
      @apply pt-1.5 text-xs;
      .active-item {
        :deep(.el-breadcrumb__inner) {
          @apply text-[var(--el-menu-active-color)];
        }
      }
    }
    .main {
      @apply p-3 bg-white border flex-auto;
    }
  }

  // 列印時移除多餘的高度
  @media print {
    min-height: unset !important;
  }
}
</style>
