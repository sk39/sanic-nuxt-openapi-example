<template>
  <v-app>
    <v-app-bar class="elevation-0" fixed app>
      <Logo />
      <v-spacer />
      <SignInUserMenu />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/common/Logo.vue'
import SignInUserMenu from '~/components/navigator/SignInUserMenu.vue'

@Component({ components: { Logo, SignInUserMenu } })
export default class AuthLayout extends Vue {}
</script>
