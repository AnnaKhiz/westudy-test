<template>
  <div class="servers__btn">
    <custom-button @click="showModal">
      Добавить сервер
    </custom-button>
  </div>

  <div class="servers">
    <div class="servers__block">
      <div class="servers__card" v-for="server in servers" :key="server.id" @click="$emit('click', server.id)">
        <p class="servers__text">Название сервера: <span class="bold">{{ server.name }}</span></p>
        <p class="servers__text">Загрузка процессора: <span class="bold"> {{ server.serverInfo.cpu_temp }}%</span></p>
        <p class="servers__text last">Загрузка оперативной памяти: <span class="bold">{{ server.serverInfo.hdd_load }}%</span></p>
        <div class="servers__btn">
          <custom-button @click="showModalForEdit" :id="server.id" >Редактировать</custom-button>
          <custom-button @click="$router.push(`/servers/${server.id}/projects`)" >Редактировать проекты</custom-button>
        </div>
      </div>
    </div>
  </div>
  <modal-add-server
    :edit="isEdit"
    v-model:edit="isEdit"
    v-model:show="isModal"
  >
    <add-server-form
      :edit="isEdit"
      :editServerForm="checkedElement"
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
  import {toRaw} from "@vue/reactivity";
  export default {
    name: "Servers.vue",
    components: {CustomButton, AddServerForm, ModalAddServer},
    data() {
      return {
        servers: data.servers,
        isModal: false,
        inputName: '',
        editButtonId: 0,
        checkedElement: '',
        isEdit: false,
      }
    },
    emits: ['click'],
    methods: {
      showModal() {
        this.isModal = true;
      },
      showModalForEdit(event) {
        this.isModal = true;
        this.editButtonId = event.target.id
        const data = this.servers.filter(el => +el.id === +this.editButtonId)
        this.checkedElement = toRaw(...data)
        this.isEdit = true
      },
      createServer(server) {
        try {
          axios.post('http://localhost:3000/servers', server)
          .then(res => console.log(res))
        } catch {
          throw new Error('error in POST request')
        }
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
  }
  &__text {
    font-size: 1.5rem;
    margin-bottom: 15px;
    &.last {
      margin-bottom: 25px;
    }
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