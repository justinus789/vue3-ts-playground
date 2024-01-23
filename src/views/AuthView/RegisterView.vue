<template>
  <div class="container">
    <div class="register-container">
      <div class="title-container">
        <h2>Register</h2>
      </div>
      <form class="form-register" @submit.prevent="handleSubmit">
        <p>Name:</p>
        <input id="name" type="text" v-model="user.name" autocomplete="name" />
        <p>Email:</p>
        <input id="email" type="text" v-model="user.email" autocomplete="email" minlength="6" />
        <p>Password:</p>
        <input
          id="password"
          type="password"
          v-model="user.password"
          autocomplete="current-password"
          maxlength="12"
        />

        <ButtonComponent type="submit" :disabled="isLoading" style="margin-top: 1rem;">Register</ButtonComponent>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth, updateCurrentUserProfile } from 'vuefire'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { isValidEmail } from '@/utils/formValidation'
import ButtonComponent from '@/components/ButtonComponent.vue'

interface User {
  name: string
  email: string
  password: string
}

const router = useRouter()
const auth = useFirebaseAuth()!

const user = ref<User>({ name: '', email: '', password: '' })
const isLoading = ref<boolean>(false)

const validateUser = () => {
  if (!user.value.name) {
    alert('Name must be filled')
  }

  if (!isValidEmail(user.value.email)) {
    alert('email is not valid')
    return false
  }

  if (user.value.email.length < 6) {
    alert('email length should be minimum 6')
    return false
  }

  if (user.value.password.length < 6 || user.value.password.length > 12) {
    alert('Password length should be 6 - 12')
    return false
  }

  return true
}

const register = async () => {
  try {
    isLoading.value = true
    await createUserWithEmailAndPassword(auth, user.value.email, user.value.password)

    updateCurrentUserProfile({ displayName: user.value.name })

    router.push({ name: 'login' })
  } catch (err) {
    if (typeof err === 'string') {
      alert(err.toUpperCase())
    } else if (err instanceof Error) {
      alert(err.message)
    }
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  if (validateUser()) {
    await register()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-container {
  display: flex;
  flex-direction: column;
  place-items: center;
  border-radius: 10px;
  padding: 1rem;
  background-color: skyblue;
  width: 350px;
}

.title-container > h2 {
  color: white;
  text-align: center;
}

.form-register {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
}

.form-register > p {
  width: 100%;
  color: azure;
  margin: 0.5rem 0;
}

.form-register > input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
