import {
  Action,
  config,
  Module,
  Mutation,
  MutationAction,
  VuexModule,
} from 'vuex-module-decorators'
import ServerApi from '~/api/ServerApi'
import { AuthApi, AuthToken, User } from '~/api/generate'

config.rawError = true
const STORAGE_KEY = 'refresh_key'

function loadRefreshToken() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed load refreshToken from localstorage', e)
    return null
  }
}

function saveRefreshToken(token) {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch (e) {
    console.warn('Failed save refreshToken to localstorage', e)
  }
}

@Module({ name: 'auth', stateFactory: true, namespaced: true })
export default class AuthStore extends VuexModule {
  user: User = null
  accessToken: string = null
  refreshToken: string = loadRefreshToken()

  get username() {
    return this.user ? this.user.id : ''
  }

  @Mutation
  setToken(authToken: AuthToken) {
    if (!authToken) {
      return this.clear()
    }

    this.accessToken = authToken.accessToken
    this.refreshToken = authToken.refreshToken
    saveRefreshToken(authToken.refreshToken)
    ServerApi.setAccessToken(authToken.accessToken)
  }

  @Mutation
  clear() {
    this.user = null
    this.accessToken = null
    this.refreshToken = null
    saveRefreshToken(null)
    ServerApi.setAccessToken(null)
  }

  @Action({})
  async signIn(payload: { userId: string; password: string }) {
    try {
      const res = await ServerApi.auth().signIn(payload)
      this.setToken(res)
      await this.afterAuth()
      return res
    } catch (res) {
      const message = await ServerApi.toErrorMsg(res)
      throw new Error(message)
    }
  }

  @Action({})
  signOut() {
    this.clear()
  }

  @Action({})
  async refresh() {
    if (!this.refreshToken) {
      throw new Error('Refresh token does not exist')
    }

    try {
      const res = await ServerApi.auth().refreshToken({
        refreshToken: this.refreshToken,
      })
      this.setToken(res)
      await this.afterAuth()
      return res
    } catch (res) {
      const message = await ServerApi.toErrorMsg(res)
      throw new Error(message)
    }
  }

  @MutationAction({ mutate: ['user'] })
  private async afterAuth() {
    const user = await ServerApi.auth().getSignInUser()
    return { user }
  }
}

export function initialize(autoStore: AuthStore) {
  ServerApi.setupRefreshToken(async (apiNoRetry: AuthApi) => {
    try {
      const { refreshToken } = autoStore
      if (!refreshToken) {
        await window.$nuxt.$router.push('auth/sign_in')
        return null
      }

      const res = await apiNoRetry.refreshToken({ refreshToken })
      autoStore.setToken(res)
    } catch (res) {
      await window.$nuxt.$router.push('auth/sign_in')
    }
  })
}
