import type { NotificationOptions } from 'element-plus'
import i18n from '@/plugins/i18n'

export function useNotification() {
  const { t } = i18n.global

  const notification = (options?: Partial<NotificationOptions>) => {
    ElNotification({
      duration: 4500,
      showClose: true,
      ...options
    })
  }

  const successNotification = (message: string) => {
    notification({
      title: t('_Common.States.Success'),
      type: 'success',
      message
    })
  }

  const errorNotification = (message: string) => {
    notification({
      duration: 10000,
      title: t('_Common.States.Error'),
      type: 'error',
      message
    })
  }

  const infoNotification = (message: string) => {
    notification({
      title: t('_Common.States.Info'),
      type: 'info',
      message
    })
  }

  return {
    errorNotification,
    successNotification,
    infoNotification
  }
}
