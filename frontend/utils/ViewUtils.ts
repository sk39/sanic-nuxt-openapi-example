import { i18n } from '~/plugins/nuxt-i18n'

export default class ViewUtils {
  static sleep(time): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  static t(key: string, ...args: any[]): string {
    return i18n.tc(key, null, args)
  }
}
