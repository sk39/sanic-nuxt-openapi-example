<template>
  <div class="todo-page">
    <div class="sub-bar elevation-1">
      <div>To-do リスト</div>
      <RefreshButton @click="refresh" />
    </div>
    <div class="todo-container">
      <div class="list-wrapper">
        <TodoList
          :list="todos"
          :processing-id="processingId"
          @change-status="changeStatus"
          @edit="editStart"
          @remove="remove"
        />
      </div>
      <div class="add-btn-wrapper">
        <v-btn class="add-btn" color="primary" large @click="showCreate = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <CreateTodo v-model="showCreate" @done="create" />
      <EditTodo v-model="editTarget" @done="editTitle" />
      <ErrorDialog v-model="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Todo } from '~/api/generate'
import ServerApi from '~/api/ServerApi'
import TodoList from '~/components/todo/TodoList.vue'
import CreateTodo from '~/components/todo/CreateTodo.vue'
import EditTodo from '~/components/todo/EditTodo.vue'
import RefreshButton from '~/components/common/button/RefreshButton.vue'
import ErrorDialog from '~/components/common/notification/ErrorDialog.vue'

@Component({
  layout: 'auth',
  middleware: 'auth',
  components: { TodoList, CreateTodo, EditTodo, RefreshButton, ErrorDialog },
})
export default class TodoPage extends Vue {
  todos: Todo[] = []
  processingId: string = null
  showCreate = false
  editTarget: Todo = null
  errorMessage: string = null

  created() {
    this.refresh()
  }

  async refresh() {
    try {
      const res = await ServerApi.todos().listTodo()
      this.todos = res.list
    } catch (res) {
      this.errorMessage = await ServerApi.toErrorMsg(res)
    }
  }

  async handleCRUDError(res) {
    this.errorMessage = await ServerApi.toErrorMsg(res)
    await this.refresh()
  }

  async create(title: string) {
    try {
      this.showCreate = false
      this.processingId = 'new-todo'
      await ServerApi.todos().createTodo({ title })
      await this.refresh()
    } catch (res) {
      await this.handleCRUDError(res)
    } finally {
      this.processingId = null
    }
  }

  async changeStatus(todo: Todo) {
    try {
      this.processingId = todo.id
      await ServerApi.todos().updateTodo(todo.id, {
        completed: todo.completed,
      })
    } catch (res) {
      await this.handleCRUDError(res)
    } finally {
      this.processingId = null
    }
  }

  editStart(todo: Todo) {
    this.editTarget = todo
  }

  async editTitle(todo: Todo) {
    try {
      this.editTarget = null
      this.processingId = todo.id
      await ServerApi.todos().updateTodo(todo.id, {
        title: todo.title,
      })
    } catch (res) {
      await this.handleCRUDError(res)
    } finally {
      this.processingId = null
    }
  }

  async remove(todo: Todo) {
    try {
      this.processingId = todo.id
      await ServerApi.todos().removeTodo(todo.id)
      await this.refresh()
    } catch (res) {
      await this.handleCRUDError(res)
    } finally {
      this.processingId = null
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
}

.list-wrapper {
  overflow-y: auto;
  padding-bottom: 56px;
}

.add-btn-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.add-btn {
  width: 100%;
  border-radius: 0;
}

.sub-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
