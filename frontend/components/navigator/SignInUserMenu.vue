<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" outlined v-on="on">
          {{ username }}
          <v-icon right color="secondary">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component({ components: {} })
export default class SignInUserMenu extends Vue {
  items = [{ title: 'サインアウト', action: this.signOut }]

  get username() {
    return authStore.username
  }

  signOut() {
    authStore.signOut()
    this.$router.replace('/auth/sign_in')
  }
}
</script>
