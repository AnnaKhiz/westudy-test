<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="input"
    type="text"
    required
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
      },
    }
  }
</script>

<style scoped lang="scss">
.input {
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  border: 1px solid teal;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  &:last-of-type {
    margin-bottom: 30px;
  }
  :invalid {
    color: red
  }
}
</style>