<template>
  <v-btn
    color="secondary"
    class="refresh-btn"
    icon
    :loading="loading"
    @click="onClick"
  >
    <v-icon>mdi-refresh</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: {} })
export default class RefreshButton extends Vue {
  @Prop({})
  loading: boolean

  @Emit('click')
  onClick() {
    return null
  }
}
</script>
