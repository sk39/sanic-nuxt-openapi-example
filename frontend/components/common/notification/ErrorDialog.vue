<template>
  <v-dialog :value="show" max-width="560" persistent>
    <v-card class="error-dialog">
      <v-card-title>Error</v-card-title>
      <v-card-text class="error-message">{{ value }}</v-card-text>
      <v-card-actions class="btn-area">
        <v-spacer />
        <v-btn color="secondary" text large width="120" @click="close">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import s from 'underscore.string'

@Component({ components: {} })
export default class ErrorDialog extends Vue {
  @Prop({ required: true })
  value: string | null

  get show() {
    return !s.isBlank(this.value)
  }

  @Emit('input')
  close() {
    return null
  }
}
</script>

<style lang="scss" scoped>
.error-dialog {
  border-left: 4px solid $color_error;
}

.btn-area {
  padding: 16px;
}
</style>
