import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth, { initialize as initializeAuth } from './auth'

let authStore: Auth = null

function initializeStores(store: Store<any>) {
  authStore = getModule(Auth, store)
  initializeAuth(authStore)
}

const initializer = (store: Store<any>) => initializeStores(store)

export const plugins = [initializer]
export { authStore }
