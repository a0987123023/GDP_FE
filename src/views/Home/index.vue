<script setup lang="ts">
defineOptions({
  name: 'home-index'
})
</script>

<template>
  <div>homepage</div>
</template>

<style lang="scss" scoped>
.home-index {
  text-align: center;
}
.dashed {
  margin-bottom: 1.5rem;
  border-top: 2px dashed var(--el-border-color);
}
.max-height {
  max-height: 30vh;
  overflow-y: auto;
}
</style>
