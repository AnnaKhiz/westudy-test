<template>
  <select @change="changeOption" class="select">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"

    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: "custom-select",
    props: {
      modelValue: {
        type: String
      },
      options: {
        type: Array,
        default: () => []
      },
      selected: String,
    },

    methods: {
      changeOption(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
.select {
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid teal;
  font-size: 1rem;
  height: 2.5rem
}
</style>