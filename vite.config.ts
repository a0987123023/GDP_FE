import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import sass from 'sass-embedded'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      eslintrc: {
        enabled: true
      },
      imports: ['vue', 'vue-i18n', 'vue-router'],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass // Use sass-embedded for SCSS processing
      }
    }
  }
})
