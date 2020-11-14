<template>
  <div>
    <div class="sub-bar elevation-1">
      <div>サインイン</div>
    </div>
    <v-container>
      <div class="form-wrapper">
        <SignInForm />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SignInForm from '~/components/auth/SignInForm.vue'

@Component({ components: { SignInForm } })
export default class SignIn extends Vue {}
</script>

<style lang="scss" scoped>
.form-wrapper {
  padding: 36px 0;
  text-align: center;
  width: 100%;
}
</style>
