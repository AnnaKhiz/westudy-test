<template>
  <select @change="changeOption" class="select" :value="modelValue">
    <option value="" selected disabled>Выберите тип проекта</option>
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
  margin-bottom: 2rem;
  border-radius: 10px;
  border: 1px solid teal;
  font-size: 1rem;
  height: 2.5rem
}
</style>