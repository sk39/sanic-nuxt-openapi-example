<template>
  <div>
    <div class="sub-bar elevation-1">
      <div>テストページ</div>
    </div>
    <v-container>
      <div class="t-row">
        <div class="label">AccessToken</div>
        <div class="value">{{ accessToken }}</div>
      </div>
      <div class="t-row">
        <div class="label">RefreshToken</div>
        <div class="value">{{ refreshToken }}</div>
      </div>
      <div class="btn-area">
        <v-btn color="primary" @click="disableAccessToken">
          Disable AccessToken
        </v-btn>
        <v-btn color="primary" @click="disableRefreshToken">
          Disable RefreshToken
        </v-btn>
        <v-btn color="primary" @click="testApi"> Request Api</v-btn>
      </div>
      <div class="process-msg">
        {{ process }}
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authStore } from '~/store'
import ServerApi from '~/api/ServerApi'

@Component({
  layout: 'auth',
  middleware: 'auth',
  components: {},
})
export default class TestPage extends Vue {
  process: string = null

  get accessToken() {
    return authStore.accessToken
  }

  get refreshToken() {
    return authStore.refreshToken
  }

  disableAccessToken() {
    authStore.setToken({
      accessToken: 'dummy-token',
      refreshToken: authStore.refreshToken,
    })
  }

  disableRefreshToken() {
    authStore.setToken({
      accessToken: authStore.accessToken,
      refreshToken: 'dummy-token',
    })
  }

  async testApi() {
    try {
      this.process = 'requesting...'
      const user = await ServerApi.auth().getSignInUser()
      this.process = `request OK. user_id=${user.id}`
    } catch (e) {
      this.process = `request NG. ${e.message}`
    }
  }
}
</script>

<style lang="scss" scoped>
.t-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 16px;
  margin-bottom: 12px;
}

.label {
  min-width: 120px;
  padding-right: 12px;
  font-size: 1rem;
  font-weight: 700;
}

.value {
  word-break: break-all;
  font-size: 0.8rem;
}
</style>
