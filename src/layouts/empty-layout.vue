<script setup lang="ts">
defineOptions({
  name: 'empty-layout'
})
</script>

<template>
  <div class="empty-layout">
    <div class="content">
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty-layout {
  @apply overflow-x-hidden overflow-y-auto max-w-full min-h-full bg-[#fafafa];
  @apply grid grid-rows-1 grid-cols-1;
  .content {
    @apply grid grid-rows-1 grid-cols-1;
  }
}
</style>
