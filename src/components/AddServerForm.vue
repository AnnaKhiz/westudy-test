<template>
  <form class="form__add-server" v-if="!edit">

    <label for="server-name">Название сервера:</label>
    <custom-input
      placeholder="Введите название..."
      id="server-name"
      name="server-name"
      v-model.trim="server.name"
    />

    <label for="server-cpu">Загрузка процессора в процентах:</label>
    <custom-input
      placeholder="Введите загрузку процессора..."
      id="server-cpu"
      name="server-cpu"
      type="number"
      v-model.trim.number="server.serverInfo.cpu_temp"
    />

    <label for="server-hdd">Загрузка оперативной памяти в процентах:</label>
    <custom-input
      placeholder="Введите загрузку оперативной памяти..."
      id="server-hdd"
      name="server-hdd"
      type="number"
      v-model.trim.number="server.serverInfo.hdd_load"
    />

    <custom-button  class="form__btn" @click.prevent @click="createServer">Добавить</custom-button>
    <custom-message-block >{{ message }}</custom-message-block>

  </form>

  <form v-else class="form__add-server">

    <label for="server-edit-name">Название сервера:</label>
    <custom-input
      placeholder="Введите название..."
      id="server-edit-name"
      name="server-name"
      :value="editServerForm.name"
      v-model.trim="editServerForm.name"
    />

    <label for="server-edit-cpu">Загрузка процессора в процентах:</label>
    <custom-input
      placeholder="Введите загрузку процессора..."
      id="server-edit-cpu"
      name="server-cpu"
      type="number"
      :value="editServerForm.serverInfo.cpu_temp"
      v-model.trim.number="editServerForm.serverInfo.cpu_temp"
    />

    <label for="server-edit-hdd">Загрузка оперативной памяти в процентах:</label>
    <custom-input
      placeholder="Введите загрузку оперативной памяти..."
      id="server-edit-hdd"
      name="server-hdd"
      type="number"
      :value="editServerForm.serverInfo.hdd_load"
      v-model.trim.number="editServerForm.serverInfo.hdd_load"
    />

    <custom-button class="form__btn" @click.prevent @click="saveChanges">Редактировать</custom-button>
    <custom-message-block >{{ message }}</custom-message-block>

  </form>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'AddServerForm.vue',
    data() {
      return {
        server: {
          id: '',
          name: '',
          serverInfo: {
            cpu_temp: '',
            hdd_load: ''
          },
          projects: []
        },
        message: ''
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      editServerForm: {
        type: Object,
      },
      edit: {
        type: Boolean,
        default: false
      },
    },
    emits: ['create'],
    methods: {

     async saveChanges() {
        try {
          await axios.patch(`http://localhost:3000/servers/${this.editServerForm.id}`, {
            id: this.editServerForm.id,
            name: this.editServerForm.name,
            serverInfo: {
              cpu_temp: this.editServerForm.serverInfo.cpu_temp,
              hdd_load: this.editServerForm.serverInfo.hdd_load
            }
          })
          this.$emit('update:show', false);
          this.$emit('update:edit', false);
        } catch {
          throw new Error('error in POST request');
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
          this.message = '';
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
}
</style>