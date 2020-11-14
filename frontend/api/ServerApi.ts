import {
  AuthApi,
  BaseAPI,
  Configuration,
  Middleware,
  ResponseContext,
  TodosApi,
} from './generate'
import ViewUtils from '~/utils/ViewUtils'

const BASE_URL = process.env.SERVER_URL

export default class ServerApi {
  private static _config: Configuration
  private static _apis: { [name: string]: BaseAPI } = {}
  protected static token: string = null
  protected static refreshTokenProcess: (
    apiNoRetry: AuthApi
  ) => Promise<void> = null

  protected static getConfig(): Configuration {
    if (!this._config) {
      const middleware: Middleware = {
        post: (context: ResponseContext) => {
          const { status } = context.response
          if (this.refreshTokenProcess && status === 401) {
            return this.retryWithRefreshToken(context)
          } else {
            return null
          }
        },
      }
      this._config = new Configuration({
        basePath: BASE_URL,
        middleware: [middleware],
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : null,
      })
    }

    return this._config
  }

  protected static async retryWithRefreshToken(context: ResponseContext) {
    try {
      const config = new Configuration({ basePath: BASE_URL })
      const apiNoRetry = new AuthApi(config)
      await this.refreshTokenProcess(apiNoRetry)
      context.init.headers = { Authorization: `Bearer ${this.token}` }
      return await fetch(context.url, context.init)
    } catch (e) {
      return null
    }
  }

  static setupRefreshToken(process: (apiNoRetry: AuthApi) => Promise<any>) {
    this.refreshTokenProcess = process
  }

  static setAccessToken(token: string) {
    if (this.token !== token) {
      this.token = token
      this._config = null
      this._apis = {}
    }
  }

  static async toErrorMsg(res) {
    if (res.json) {
      try {
        const obj = await res.json()
        return obj.errors.map((e) => e.message).join(' ')
      } catch (e) {
        return ViewUtils.t('error.network')
      }
    } else {
      return ViewUtils.t('error.network')
    }
  }

  static auth(): AuthApi {
    const KEY = 'auth'
    if (!this._apis[KEY]) {
      this._apis[KEY] = new AuthApi(this.getConfig())
    }

    return this._apis[KEY] as AuthApi
  }

  static todos(): TodosApi {
    const KEY = 'todos'
    if (!this._apis[KEY]) {
      this._apis[KEY] = new TodosApi(this.getConfig())
    }

    return this._apis[KEY] as TodosApi
  }
}
