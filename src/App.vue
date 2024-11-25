<script setup>
  import { RouterView } from 'vue-router'
  import NavigationDrawer from './components/NavigationDrawer.vue';

</script>

<template>
  <NavigationDrawer />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
</style>
