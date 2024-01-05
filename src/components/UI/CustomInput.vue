<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="input"
    type="text"
  />
</template>

<script>
  export default {
    name: "custom-input",
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
.input {
  padding: 10px;
  border: 1px solid teal;
  border-radius: 10px;
  margin-bottom: 15px;
}
</style>