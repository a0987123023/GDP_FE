import { createI18n } from 'vue-i18n'
import en from '@/lang/en.json'
import tw from '@/lang/tw.json'

const i18n = createI18n({
  locale: 'tw',
  fallbackLocale: 'tw',
  globalInjection: true,
  messages: {
    tw,
    en
    // TODO: 新增 cn 語系
  }
})

export default i18n
