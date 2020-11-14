<template>
  <v-text-field
    :value="value"
    type="text"
    label="タスク"
    :rules="inputRules"
    required
    counter
    maxlength="60"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Validator, { ValidateType } from '~/utils/validator/Validator'

@Component({ components: {} })
export default class TodoTextField extends Vue {
  @Prop({})
  value: string

  inputRules = Validator.rules([
    ValidateType.required,
    { type: ValidateType.maxlength, arg: { length: 60 } },
  ])

  @Emit('input')
  handleInput(value) {
    return value
  }
}
</script>
