<template>
  <div class="text-center">
    <v-bottom-sheet :value="value != null" inset @input="close">
      <v-sheet class="todo-operation-sheet text-center">
        <div class="t-title">タスクを編集します</div>
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
            更新する
          </v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator'
import s from 'underscore.string'
import { Todo } from '~/api/generate'
import TodoTextField from '~/components/todo/TodoTextField.vue'

@Component({ components: { TodoTextField } })
export default class EditTodo extends Vue {
  @Prop({ required: true })
  value: Todo

  valid: boolean = false
  title: string = null

  get canDone() {
    return !s.isBlank(this.title)
  }

  @Watch('value')
  prepare() {
    if (this.value) {
      this.title = this.value.title
    }
  }

  @Emit('input')
  close() {
    return null
  }

  @Emit('done')
  done() {
    this.value.title = this.title
    return this.value
  }
}
</script>
