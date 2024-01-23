<template>
  <HeaderComponent>
    <h2>Vue Playground</h2>
    <h3 style="margin-left: auto">{{ userInfo?.displayName }}</h3>
    <ButtonComponent @click="signOut()" background="white" color="blue"> Sign out </ButtonComponent>
  </HeaderComponent>
  <div style="display: grid; grid-template-columns: 200px auto" v-fo>
    <div id="navbar">
      <ul>
        <li v-for="({ name, text, style }, index) in routeData" :key="index">
          <RouterLink :to="{ name }" :style="style">{{ text }} </RouterLink>
        </li>
      </ul>
    </div>
    <div id="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, useFirebaseAuth } from 'vuefire'

interface RouteData {
  name: string
  text: string
  style?: object
}

const router = useRouter()
const auth = useFirebaseAuth()

const userInfo = ref()
const routeData = ref<RouteData[]>([
  {
    name: 'todo',
    text: 'Todo App'
  },
  {
    name: 'settings',
    text: 'Settings',
    style: { marginTop: 'auto' }
  }
])

const signOut = () => {
  auth?.signOut()
  router.push({ name: 'login' })
}

onMounted(async () => {
  try {
    userInfo.value = await getCurrentUser()
  } catch (err) {
    if (typeof err === 'string') {
      console.log(err)
    } else if (err instanceof Error) {
      console.log(err.message)
    }
  }
})
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 1rem 0;
  background-color: #f1f1f1;
  width: 200px;
  position: fixed;
  height: 100%;
  overflow: auto;
}

li {
  border-radius: 2px;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

li a.active {
  background-color: #04aa6d;
  color: white;
}

li a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>
