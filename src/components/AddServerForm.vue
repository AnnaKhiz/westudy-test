<template>
  <form >
    <label for="server-name">Название сервера:</label>
    <custom-input
      placeholder="Введите название..."
      id="server-name"
      name="server-name"
      v-model="server.name"
    />

    <label for="server-cpu">Загрузка процессора в процентах:</label>
    <custom-input
      placeholder="Введите загрузку процессора..."
      id="server-cpu"
      name="server-cpu"
      v-model="server.serverInfo.cpu_temp"
    />

    <label for="server-hdd">Загрузка оперативной памяти в процентах:</label>
    <custom-input
      placeholder="Введите загрузку оперативной памяти..."
      id="server-hdd"
      name="server-hdd"
      v-model="server.serverInfo.hdd_load"
    />

    <custom-button class="form__btn" @click.prevent @click="createServer">Добавить</custom-button>
  </form>
</template>

<script>
  import CustomButton from "@/components/UI/CustomButton";
  import CustomInput from "@/components/UI/CustomInput";
  export default {
    name: 'AddServerForm.vue',
    components: {CustomInput, CustomButton},
    data() {
      return {
        server: {
          id: '',
          name: '',
          serverInfo: {
            cpu_temp: '',
            hdd_load: ''
          }
        }
      }
    },
    emits: ['create'],
    methods: {
      createServer() {
        this.server.id = Date.now();
        this.$emit('create', this.server);
        this.server = {
          name: '',
          serverInfo: {
            cpu_temp: '',
            hdd_load: ''
          }
        }
      }

    }
  }
</script>

<style scoped lang="scss">
label {
  display: block;
  margin-bottom: 10px;
}
/*input {*/
/*  padding: 10px;*/
/*  border: 1px solid teal;*/
/*  border-radius: 10px;*/
/*  margin-bottom: 15px;*/
/*}*/
.form__btn {
  margin: auto;
}


</style>