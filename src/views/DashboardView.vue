<template>
  <div id="dashboard">
    <button @click="back()" style="margin-bottom: 1rem">Back</button>
    <h1>{{ userInfo.firstName }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore)

const back = () => {
  router.back()
}

onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        router.push({ name: 'home' })
      }
      throw new Error(data.message)
    }

    userInfo.value = data
  } catch (err) {
    if (typeof err === 'string') {
      console.log(err)
    } else if (err instanceof Error) {
      console.log(err.message)
    }
  }
})
</script>
