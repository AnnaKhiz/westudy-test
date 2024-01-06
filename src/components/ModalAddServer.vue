<template>
  <div class="servers__modal" v-if="show" @click="hideModal" >
    <div class="servers__form" @click.stop>
      <custom-close-icon @click="hideModal" />
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: "ModalAddServer.vue",
    data() {
      return {

      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hideModal() {
        this.$emit('update:show', false)
        this.$emit('update:edit', false)
      },

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
    max-width: 50rem;
    max-height: 50rem;
    padding: 3rem;
    border: 1px solid #008080;
    font-size: 1rem;
    text-align: center;
    position: relative;
  }

}
/*.form {*/
/*  &__close {*/
/*    position: absolute;*/
/*    top: 0.5rem;*/
/*    right: 0.5rem;*/
/*    cursor: pointer;*/
/*  }*/
/*  & img svg{*/
/*    fill: #42b983;*/
/*    width: 30px;*/
/*    height: 30px;*/
/*  }*/
/*}*/
</style>