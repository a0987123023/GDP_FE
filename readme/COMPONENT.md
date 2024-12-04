# .vue 檔撰寫規範

## 說明

1. 組件名稱除 index.vue 外，使用至少 2 個英文單字命名（防止與現在或未來的 Html 標籤重名）。
2. 組件名稱使用 Kebab Case 規則，單字用 - 隔開，例如 app-table.vue、user-list.vue。
3. script 寫法 - TypeScript + composition api + setup。
4. style 寫法 - SCSS + scoped。

## script 程式碼順序

1. type
2. interface
3. [defineOptions](https://vue-macros.sxzz.moe/macros/define-options.html)
4. [Props (defineProps)](https://cn.vuejs.org/guide/components/props.html)
5. [Events (defineEmits)](https://cn.vuejs.org/guide/components/events.html#component-events)
6. [route/router](https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api)
7. [store 相關](https://pinia.vuejs.org/zh/core-concepts/#using-the-store)
8. 非響應式變數
9. [子組件 ref](https://cn.vuejs.org/guide/essentials/template-refs.html#template-refs)
10. [ref 變數](https://cn.vuejs.org/api/reactivity-core.html#ref)
11. [reactive 變數](https://cn.vuejs.org/api/reactivity-core.html#reactive)
12. [computed](https://cn.vuejs.org/api/reactivity-core.html#computed)
13. [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)
14. [watch](https://cn.vuejs.org/api/reactivity-core.html#watch)
15. function
16. async/await function
17. [生命週期 (Lifecycle hooks)](https://cn.vuejs.org/api/composition-api-lifecycle.html)

## 範例

```
<script setup lang="ts">
  type Value = string | number

  interface User {
    id: string
    name: string
  }

  // 設定 name 或 inheritAttrs
  defineOptions({
    // 組件檔名為 index.vue 或其他通用名稱時，需手動設定組件名稱，以便在瀏覽器 Debug 時方便找到有問題的組件
    name: 'example-component'
  })

  // route 相關
  const route = useRoute()
  const router = useRouter()

  // store 相關
  const userStore = useUserStore()
  const { setUser } = userStore
  const { userData } = storeToRefs(userStore)

  // Props
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  })

  // Emit
  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
  }>()

  /**
   * 子組件 ref
   * 命名 - 子組件名稱 + Ref(後綴)
   * 型別 - 組件實例型別 | null
   * 預設值 - null
   */
  const inputRef = ref<ComponentInstanceType | null>(null)

  // ref 變數定義
  const var1 = ref<string>('')

  // reactive 變數定義
  const var2 = reactive<User>({
    id: '0',
    name: 'Vue'
  })

  // computed
  const var 3 = computed(() => {
    return ...
  })

  // defineExpose - 定義外部可訪問的變數或方法
  defineExpose({ var1, var2, var3, method1, method2 })

  // watch 及其他 watch 相關方法
  watch(var1 => {
    ...
  })

  // 生命週期 (Lifecycle Hooks)
  onMounted(() => {
    ...
  })
  ...其他生命週期方法

  // 一般方法
  function method1() {
    ...
  }

  // Async/Await 方法
  async function method2() {
    await...
  }

</script>

<template>
</template>

<style lang="scss" scoped>
</style>
```
