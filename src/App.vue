<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Rxjs />
  </div>
</template>

<script lang="ts">
import Rxjs from './components/Rxjs.vue'

export default {
  name: 'app',
  components: {
    Rxjs
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
