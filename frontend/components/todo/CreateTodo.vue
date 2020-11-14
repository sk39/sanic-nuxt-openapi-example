<template>
  <div class="text-center">
    <v-bottom-sheet :value="value" inset @input="close">
      <v-sheet class="todo-operation-sheet text-center">
        <div class="t-title">新しいタスクを作成します</div>
        <v-form ref="form" v-model="valid" class="form" lazy-validation>
          <TodoTextField v-model="title" />
        </v-form>
        <div class="btn-group">
          <v-btn class="mt-6" text @click="close">キャンセル</v-btn>
          <v-btn
            class="mt-6"
            text
            color="primary"
            :disabled="!canDone"
            @click="done"
          >
            作成する
          </v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator'
import s from 'underscore.string'
import TodoTextField from '~/components/todo/TodoTextField.vue'

@Component({ components: { TodoTextField } })
export default class CreateTodo extends Vue {
  @Prop({ required: true })
  value: boolean

  valid: boolean = false
  title: string = null

  get canDone() {
    return !s.isBlank(this.title)
  }

  @Watch('value')
  prepare(value) {
    if (value) {
      this.title = null
      const form = this.$refs.form as any
      form && form.reset()
    }
  }

  @Emit('input')
  close() {
    return false
  }

  @Emit('done')
  done() {
    return this.title
  }
}
</script>
