import { authStore } from '~/store'

export default function ({ redirect }) {
  return authStore.refresh().catch(() => {
    return redirect('/auth/sign_in')
  })
}
