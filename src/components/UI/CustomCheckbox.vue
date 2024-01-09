<template>
  <input
    class="checkbox-el"
    type="checkbox"
    @change="updateCheckbox"
  />
</template>

<script>
  export default {
    name: "custom-checkbox",
    props: {
      isActive: Boolean
    },
    methods: {
      updateCheckbox() {
        this.$emit('update:isActive', !this.isActive)
      },
    },
  }
</script>

<style scoped>
.checkbox-el {
  margin-right: 10px;
  transform: scale(1.5);
  opacity: 0.9;
  cursor: pointer;
}
</style>