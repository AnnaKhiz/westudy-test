<template>
  <div class="servers__modal" v-if="show" @click="hideModal" >
    <div class="servers__form" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ModalAddServer.vue",
    data() {
      return {
        // isModal: false
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hideModal() {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style scoped lang="scss">
.servers {
  &__modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
  }
  &__form {
    margin: auto;
    background-color: white;
    border-radius: 12px;
    max-width: 500px;
    max-height: 500px;
    padding: 20px;
    border: 1px solid teal;
    font-size: 1rem;
    text-align: center;
  }
}

</style>