<template>
  <nav-bar></nav-bar>
  <router-view />
</template>

<script >
  import NavBar from "@/components/NavBar"
  export default {
    components: {NavBar},
  }
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 10px;
}
#app {
  padding: 0 3rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
