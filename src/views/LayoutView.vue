<template>
  <header>
    <RouterLink :to="{ name: 'login' }"> Login </RouterLink>
    <RouterLink :to="{ name: 'register' }"> Register </RouterLink>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  background-color: rgb(214, 216, 110);
}
</style>
