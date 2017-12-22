<template>
  <div id="app">
    <header class="bg-white px-8 py-2 shadow">
      <div class="inline-flex items-center leading-none">
        <div class="flex-1">
          <img src="./assets/images/logo.png" class="h-12 " />
        </div>
        <h1 class="flex-1 pl-4">Barstaat</h1>
      </div>
    </header>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}
</style>

<style src="./styles/main.css"></style>
