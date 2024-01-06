<template>
  <form class="form__add-server" v-if="!edit">

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

      <custom-button  class="form__btn" @click.prevent @click="createServer">Добавить</custom-button>

      <custom-message-block >{{ message }}</custom-message-block>

  </form>

  <form v-else class="form__add-server" @click="showMe">

    <label for="server-name">Название сервера:</label>
    <custom-input
      placeholder="Введите название..."
      id="server-name"
      name="server-name"
      v-model="editServerForm.name"

    />

    <label for="server-cpu">Загрузка процессора в процентах:</label>
    <custom-input
      placeholder="Введите загрузку процессора..."
      id="server-cpu"
      name="server-cpu"
      v-model="editServerForm.serverInfo.cpu_temp"
    />

    <label for="server-hdd">Загрузка оперативной памяти в процентах:</label>
    <custom-input
      placeholder="Введите загрузку оперативной памяти..."
      id="server-hdd"
      name="server-hdd"
      v-model="editServerForm.serverInfo.hdd_load"
    />

    <custom-button class="form__btn" @click.prevent @click="saveChanges">Редактировать</custom-button>

    <custom-message-block >{{ message }}</custom-message-block>

  </form>


</template>

<script>
  import CustomButton from "@/components/UI/CustomButton";
  import CustomInput from "@/components/UI/CustomInput";
  import axios from "axios";

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
        },
        message: ''
      }
    },
    props: {
      editServerForm: {
        type: Object,
      },
      edit: {
        type: Boolean,
        default: true
      }
    },
    emits: ['create'],
    methods: {
      saveChanges() {
        try {
          axios.patch(`http://localhost:3000/servers/${this.editServerForm.id}`, {
            id: this.editServerForm.id,
            name: this.editServerForm.name,
            serverInfo: {
              cpu_temp: this.editServerForm.serverInfo.cpu_temp,
              hdd_load: this.editServerForm.serverInfo.hdd_load
            }
          })
            .then(res => console.log(res))
        } catch {
          throw new Error('error in POST request')
        }
      },
      createServer() {
      if (this.server.name === '' || this.server.serverInfo.cpu_temp === '' || this.server.serverInfo.hdd_load === '') {
        this.message = 'Заполните все поля'
      } else {
        this.server.id = Date.now();
        this.$emit('create', this.server);
        this.server = {
          name: '',
          serverInfo: {
            cpu_temp: '',
            hdd_load: ''
          }
        }
        this.message = ''
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
input {
  padding: 10px;
  border: 1px solid teal;
  border-radius: 10px;
  margin-bottom: 15px;
}
.form {
  &__add-server {
    text-align: left;
  }
  &__btn {
    margin: auto;
  }
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