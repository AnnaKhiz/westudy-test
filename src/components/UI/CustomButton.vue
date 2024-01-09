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
  padding: 0.8rem;
  border: 1px solid teal;
  border-radius: 0.3rem;
  background-color: white;
  cursor: pointer;
}
</style>