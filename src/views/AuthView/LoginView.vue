<template>
  <div class="container">
    <div class="login-container">
      <div class="title-container">
        <h2>Login Vue Playground</h2>
      </div>
      <form class="form-login" @submit.prevent="handleSubmit">
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

        <button type="submit" :disabled="isLoading" class="btn-submit">submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { isValidEmail } from '@/utils/formValidation'

interface User {
  email: string
  password: string
}

const router = useRouter()
const auth = useFirebaseAuth()!

const user = ref<User>({ email: '', password: '' })
const isLoading = ref<boolean>(false)

const validateUser = () => {
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

const login = async () => {
  try {
    isLoading.value = true
    await signInWithEmailAndPassword(auth, user.value.email, user.value.password)

    router.push({ name: 'dashboard' })
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
    await login()
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

.login-container {
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

.form-login {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
}

.form-login > p {
  width: 100%;
  color: azure;
  margin: 0.5rem 0;
}

.form-login > input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
}

.btn-submit {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  background-color: burlywood;
  padding: 0.3rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  color: blueviolet;
  cursor: pointer;
}

.btn-submit:disabled {
  cursor: default;
  color: #c39cf0;
  background-color: #d4d3d1;
}
</style>
