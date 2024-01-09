<template>
  <div class="form__close" >
    <img src="../../../public/close.svg" alt="close icon">
  </div>
</template>

<script>
  export default {
    name: "custom-close-icon"
  }
</script>

<style scoped lang="scss">
.form {
  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }
  & img svg{
    fill: #42b983;
    width: 30px;
    height: 30px;
  }
}
</style>