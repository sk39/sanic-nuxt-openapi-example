<template>
  <v-app>
    <v-app-bar class="elevation-0" fixed app>
      <Logo />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/common/Logo.vue'

@Component({ components: { Logo } })
export default class DefaultLayout extends Vue {}
</script>
