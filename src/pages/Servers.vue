<template>
  <div class="servers__btn">
    <custom-button @click="showModal">
      Добавить сервер
    </custom-button>

  </div>

  <div class="servers" v-if="servers.length > 0">

    <div class="servers__block">

      <div class="servers__card" :servers="servers" v-for="server in servers" :key="server.id" @click="$emit('click', server.id)" >
        <custom-close-icon @click="deleteServer" class="close-icon" :id="server.id"></custom-close-icon>
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

  <div v-else class="loading">Идет загрузка...</div>
  <modal-add-server
    v-model:show="isModal"
    :edit="isEdit"
    v-model:edit="isEdit"
    :ren="isRender"
    v-model:ren="isRender"
  >

    <add-server-form
      :ren="isRender"
      v-model:ren="isRender"
      :show="isModal"
      v-model:show="isModal"
      :edit="isEdit"
      v-model:edit="isEdit"
      :editServerForm="checkedElement"
      @create="createServer"
    />
  </modal-add-server>

</template>

<script>

  import ModalAddServer from "@/components/ModalAddServer";
  import AddServerForm from "@/components/AddServerForm";
  import axios from "axios";
  import {toRaw} from "@vue/reactivity";

  export default {
    name: "Servers.vue",
    components: {AddServerForm, ModalAddServer},
    data() {
      return {
        servers: [],
        inputName: '',
        editButtonId: 0,
        checkedElement: {},
        isModal: false,
        isEdit: false,
        isRender: false,
        isLoading: false,
      }
    },
    emits: ['click'],
    methods: {
      showModal() {
        this.isModal = true;
      },

      showModalForEdit(event) {
        this.showModal();
        this.editButtonId = event.target.id;
        const data = this.servers.filter(el => +el.id === +this.editButtonId);
        this.checkedElement = toRaw(...data);
        this.isEdit = true;
      },

      async createServer(server) {
        try {
          await axios.post('http://localhost:3000/servers', server)

          this.isModal = false;
        } catch {
          throw new Error('error in POST request');
        }
      },

      async renderServers() {
          try {
            this.isLoading = true;
            const response = await axios.get('http://localhost:3000/servers');
            const data = response.data;
            this.servers = data.map((element) => (
              {
                id: element.id,
                name: element.name,
                serverInfo: {
                  cpu_temp: element.serverInfo.cpu_temp,
                  hdd_load: element.serverInfo.hdd_load
                }
              }
            ))
            this.isLoading = false;
          } catch {
            throw new Error('fetch error');
          }
      },

      async deleteServer(event) {
        this.editButtonId = event.target.parentElement.id;
        try {
          const res = await axios.delete(`http://localhost:3000/servers/${this.editButtonId}`);
          res.status === 200 ? this.isRender = !this.isRender : false
        } catch {
          throw new Error('error in DELETE request (delete server function)');
        }
      }
    },

    mounted() {
      if(!this.isRender) {
        this.renderServers();
        this.isRender = true;
      }
    },
    watch: {
      isRender() {
        this.renderServers();
      },
      isModal() {
        this.renderServers();
      },
      isEdit() {
        this.renderServers();
      },
    },
  }
</script>

<style scoped lang="scss">

.loading {
  font-size: 1.5rem;
}

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
    flex-wrap: wrap;
  }
  &__card {
    position: relative;
    width: 30%;
    padding: 1.5rem 1.5rem 0 1.5rem;
    border: 1px solid teal;
    text-align: left;
  }
  &__text {
    font-size: 1.3rem;
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
  font-size: 1.4rem;
  font-weight: 700;
}
.close-icon {

}
</style>