<template>
  <div id="dashboard">
    <button @click="signOut()" style="margin-bottom: 1rem">Sign out</button>
    <h1>{{ userInfo.displayName }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, useFirebaseAuth } from 'vuefire'

const router = useRouter()
const userInfo = ref<any>({})
const auth = useFirebaseAuth()

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

<style>
#dashboard {
  padding: 1rem;
}
</style>
