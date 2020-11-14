<template>
  <div class="TodoList">
    <div v-if="list.length === 0" class="no-data-message">
      タスクはありません
    </div>
    <div
      v-for="item in list"
      :key="item.id"
      class="row"
      :class="item.completed ? 'completed' : ''"
    >
      <v-checkbox
        v-model="item.completed"
        class="t-checkbox"
        :readonly="disabledOperation"
        @change="handleChangeStatus(item)"
      />
      <div class="todo-title">
        {{ item.title }}
      </div>
      <div>
        <v-btn
          icon
          color="secondary"
          :disabled="disabledOperation"
          @click="handleEdit(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          color="secondary"
          :disabled="disabledOperation"
          @click="handleRemove(item)"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <div class="progress-wrapper">
          <v-progress-linear
            height="2"
            :indeterminate="item.id === processingId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import SvgIcon from '~/assets/img/nuxt.svg'
import { Todo } from '~/api/generate'

@Component({ components: { SvgIcon } })
export default class TodoList extends Vue {
  @Prop({ required: true })
  list: Todo[]

  @Prop()
  processingId: string

  get disabledOperation() {
    return this.processingId != null
  }

  @Emit('change-status')
  handleChangeStatus(todo: Todo) {
    return todo
  }

  @Emit('edit')
  handleEdit(todo: Todo) {
    return todo
  }

  @Emit('remove')
  handleRemove(todo: Todo) {
    return todo
  }
}
</script>

<style lang="scss" scoped>
.row {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 8px;
  background: $color_card_back;
  &.completed {
    .todo-title {
      text-decoration: line-through;
    }
  }
}

.progress-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.todo-title {
  flex: 1;
  font-size: 1rem;
}
</style>
