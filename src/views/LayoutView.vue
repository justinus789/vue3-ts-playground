<template>
  <div class="container">
    <header>
      <RouterLink :to="{ name: 'login' }"> Login </RouterLink>
      <RouterLink :to="{ name: 'register' }"> Register </RouterLink>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  background-color: rgb(214, 216, 110);
}

.container {
  background-image: url('@/assets/playground.avif');
}
</style>
