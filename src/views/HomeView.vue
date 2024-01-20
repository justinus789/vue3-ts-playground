<script setup lang="ts">
import { ref } from 'vue'
interface User {
  username: string
  password: string
}

const user = ref<User>({ username: '', password: '' })

function handleSubmit() {
  if (user.value.username.length < 6 || user.value.username.length > 12) {
    return alert('username length should be 6 - 12')
  }

  if (user.value.password.length < 6 || user.value.password.length > 12) {
    return alert('Password length should be 6 - 12')
  }

  alert(JSON.stringify(user.value))
}
</script>

<template>
  <div class="container">
    <p style="font-size: 2.5rem; color: white; margin: 1rem">Welcome to Vue Playground !</p>
    <div class="login-container">
      <div class="title-container">
        <h2>Please Login to access the playground</h2>
      </div>
      <form class="form-login">
        <p>Username:</p>
        <input type="text" v-model="user.username" minlength="6" />
        <p>Password:</p>
        <input type="password" v-model="user.password" minlength="6" maxlength="12" />

        <button class="btn-submit" @click.prevent="handleSubmit">submit</button>
      </form>
    </div>
  </div>
</template>

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
  width: 35%;
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
</style>
