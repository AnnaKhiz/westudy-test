<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "custom-button"
  }
</script>

<style scoped lang="scss">
.btn {
  display: block;
  padding: 1.3rem;
  border: 1px solid teal;
  background-color: white;
}
</style>