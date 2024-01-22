<template>
  <div id="dashboard">
    <button @click="back()" style="margin-bottom: 1rem">Back</button>
    <h1>{{ userInfo.displayName }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = useRouter()
const userInfo = ref<any>({})

const back = () => {
  router.back()
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
