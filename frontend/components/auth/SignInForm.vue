<template>
  <div class="container elevation-3">
    <div class="logo-wrapper">
      <Logo size="72" text-size="44" />
    </div>
    <v-form ref="form" v-model="valid" class="form" lazy-validation>
      <v-text-field
        v-model="userId"
        prepend-icon="mdi-account-circle"
        type="text"
        label="User Name"
        :rules="inputRules"
        required
      />
      <v-text-field
        v-model="password"
        prepend-icon="mdi-lock"
        type="password"
        label="Password"
        :rules="inputRules"
        required
      />
      <v-btn
        class="btn-signIn"
        color="primary"
        block
        large
        :loading="loading"
        @click="signIn"
      >
        サインイン
      </v-btn>
      <p>
        「User Name」と「Password」は任意の文字列でOKです。<br />
        ここで指定した「User Name」ごとにTo-doは管理されます。
      </p>
    </v-form>
    <ErrorDialog v-model="errorMessage" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/common/Logo.vue'
import { authStore } from '~/store'
import Validator, { ValidateType } from '~/utils/validator/Validator'
import ErrorDialog from '~/components/common/notification/ErrorDialog.vue'

@Component({ components: { Logo, ErrorDialog } })
export default class SignInForm extends Vue {
  loading: boolean = false
  valid: boolean = false
  errorMessage: string = null
  userId: string = ''
  password: string = ''

  inputRules = Validator.rules([ValidateType.required])

  validateForm() {
    const form = this.$refs.form as any
    return form.validate()
  }

  async signIn() {
    this.errorMessage = null
    if (!this.validateForm()) {
      return
    }

    this.loading = true
    try {
      await authStore.signIn({
        userId: this.userId,
        password: this.password,
      })
      await this.$router.replace('/')
    } catch (e) {
      this.errorMessage = e.message
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: $color_card_back;
  max-width: 600px;
  border-radius: 20px;
  margin: auto;
  text-align: center;
}

.form {
  padding: 24px 24px;
}

.btn-signIn {
  margin: 36px 0 12px;
}

.logo-wrapper {
  padding: 48px 0 16px;
}

p {
  color: $color_base_text;
  opacity: 0.7;
  font-size: 0.9rem;
  line-height: 1.8rem;
  font-weight: 700;
  margin: 36px 0 0;
}
</style>
