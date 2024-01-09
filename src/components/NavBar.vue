<template>
  <nav class="nav__block">
    <custom-button @click="$router.push(`/`)">
      PRICES
    </custom-button>
    <custom-button @click="$router.push(`/servers`)">
      SERVERS
    </custom-button>
  </nav>
</template>

<script>
  export default {
    name: "NavBar.vue",
  }
</script>

<style scoped lang="scss">
.nav__block {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
  column-gap: 15px;
  background-color: rgba(0, 128, 128, 0.3);
}
</style>