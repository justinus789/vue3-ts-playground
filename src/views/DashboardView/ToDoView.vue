<template>
  <div class="container">
    <h1 style="text-align: center">Todo List</h1>
    <div class="input-container">
      <input @keyup.enter="addTodo" type="text" v-model="todo" width="100%" />
      <ButtonComponent :onClick="addTodo">Add</ButtonComponent>
    </div>
    <div class="todo-list">
      <TransitionGroup name="todo">
        <div v-for="(data, index) in todos" :key="index" class="todo-container">
          <div style="display: flex; gap: 1rem">
            <p :style="{ 'text-decoration': data?.status ? 'line-through' : 'none' }">
              {{ data?.name }}
            </p>
            <ButtonComponent
              @click="toggleTodoStatus(data?.id, !data?.status)"
              style="margin-left: auto"
              >{{ buttonToggleName(data?.status) }}</ButtonComponent
            >
            <ButtonComponent @click="deleteTodo(data?.id)">Delete</ButtonComponent>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import { computed, ref } from 'vue'
import { useFirestore, useCollection } from 'vuefire'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'

const db = useFirestore()
const todosRef = collection(db, 'todos')
const q = query(todosRef, orderBy('createdAt', 'desc'))
const todos = useCollection(q)

const todo = ref<string>('')

const buttonToggleName = computed(() => (status: boolean) => (status ? 'reset' : 'done'))

async function addTodo() {
  await addDoc(todosRef, {
    name: todo.value,
    status: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })

  todo.value = ''
}

async function toggleTodoStatus(id: string, status: boolean) {
  const dataRef = doc(todosRef, id)
  await updateDoc(dataRef, {
    status,
    updatedAt: serverTimestamp()
  })
}

async function deleteTodo(id: string) {
  const dataRef = doc(todosRef, id)
  await deleteDoc(dataRef)
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

.input-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
}

.todo-container {
  border: 1px solid black;
  border-radius: 2px;
  padding: 1rem;
  margin: 0.5rem 0;
  min-width: 400px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-enter-active,
.todo-leave-active {
  transition: all 0.5s ease;
}
.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
