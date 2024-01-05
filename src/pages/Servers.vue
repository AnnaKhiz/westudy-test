<template>
  <div class="servers__btn">
    <custom-button @click="showModal">
      Добавить сервер
    </custom-button>
  </div>

  <div class="servers">
    <div class="servers__block">
      <div class="servers__card" v-for="server in servers">
        <p>Название сервера: <span class="bold">{{ server.name }}</span></p>
        <p>Загрузка процессора: <span class="bold"> {{ server.serverInfo.cpu_temp }}%</span></p>
        <p>Загрузка оперативной памяти: <span class="bold">{{ server.serverInfo.hdd_load }}%</span></p>
        <div class="servers__btn">
          <custom-button>Редактировать</custom-button>
          <custom-button>Редактировать проекты</custom-button>
        </div>
      </div>
    </div>
  </div>
  <modal-add-server v-model:show="isModal">
    <add-server-form
      @create="createServer"
    />
  </modal-add-server>


</template>

<script>

  import * as data from '@/database/servers.json';
  import ModalAddServer from "@/components/ModalAddServer";
  import AddServerForm from "@/components/AddServerForm";
  import CustomButton from "@/components/UI/CustomButton";
  import axios from 'axios'
  export default {
    name: "Servers.vue",
    components: {CustomButton, AddServerForm, ModalAddServer},
    data() {
      return {
        servers: data.servers,
        isModal: false,
        inputName: ''
      }
    },
    methods: {
      showModal() {
        this.isModal = true;
      },
      createServer(server) {
        try {
          axios.post('http://localhost:3000/servers', server)
          .then(res => console.log(res))
        } catch {
          throw new Error('error in POST request')
        }

        console.log(this.servers)
      }
    }
  }
</script>

<style scoped lang="scss">
/** {*/
/*  border: 1px solid red*/
/*}*/


.servers {
  &__block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
  }
  &__btn {
    display: flex;
    justify-content: flex-start;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

  }
  &__card {
    width: 45%;
    padding: 1.5rem 1.5rem 0 1.5rem;
    border: 1px solid teal;
    text-align: left;
    font-size: 1.5rem;
  }
}
.btn {
  display: block;
  padding: 1.3rem;
  border: 1px solid teal;
  background-color: white;
}
.bold {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>