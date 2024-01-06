<template>
  <div class="servers__message">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "custom-message-block"
  }
</script>

<style scoped lang="scss">
.servers__message {
  position: absolute;
  bottom: 1rem;
  left: 3rem;
  color: red;
  font-size: 0.8rem;
}
</style>