import { createApp } from 'vue'
import AppComponent from './app.vue'
import { initDynamicLayout, router } from './router'
import pinia from './stores/create-pinia'

// css
import './assets/styles/normalize.css'
import './assets/styles/main.css'
import '@/styles/main.scss'

const app = createApp(AppComponent).use(pinia).use(router)

/** 初始化動態 Layout */
initDynamicLayout(app)

app.mount('#app')
