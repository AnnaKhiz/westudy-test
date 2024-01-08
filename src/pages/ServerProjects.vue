<template>
  <div class="projects">
    <div class="projects__btn">
      <custom-button @click="showProjectModal">
        Добавить проект
      </custom-button>
    </div>

    <table v-if="projects.length > 0" class="table__main">
      <tr>
        <th>Name</th>
        <th>Type</th>
      </tr>
      <tr v-for="project in projects" :key="project.id">
        <td class="table__name">
          {{ project.name }}
        </td>
        <td class="table__type">
          {{ project.type }}
        </td>
        <td class="table__edit">
          <custom-button @click="showProjectModalForEdit" :id="project.id" >Редактировать {{ project.id }}</custom-button>
        </td>
      </tr>
    </table>
    <div v-else class="loading">Идет загрузка...</div>
  </div>
  <modal-add-server
    v-model:show="isModal"
    :edit="isEdit"
    v-model:edit="isEdit"
    :ren="isRender"
    v-model:ren="isRender"
  >

    <add-project
      :edit="isEdit"
      :editServerForm="checkedElement"
      :serverId="serverId"
      @create="createProject"
    >

    </add-project>
  </modal-add-server>

</template>

<script>
  import axios from "axios";

  import AddProject from "@/components/AddProject";
  import ModalAddServer from "@/components/ModalAddServer";
  import CustomButton from "@/components/UI/CustomButton";
  import {toRaw} from "@vue/reactivity";

  export default {
    name: "ServerProjects.vue",
    components: {CustomButton, AddProject, ModalAddServer},
    data() {
      return {
        serverId: 0,
        projects: [],
        isLoading: false,
        isModal: false,
        isEdit: false,
        editButtonId: 0,
        checkedElement: '',
        isRender: false,
      }
    },
    methods: {
      createProject(project) {
        console.log('function Create project works')
        console.log(project)
      },
      showProjectModal() {
        this.isModal = true;
      },
      showProjectModalForEdit(event) {
        this.isModal = true;
        this.isEdit = true;
        this.editButtonId = event.target.id
        console.log(this.projects.filter(el => +el.id === +this.editButtonId))
        const data = this.projects.filter(el => +el.id === +this.editButtonId)
        this.checkedElement = toRaw(...data)
        console.log(this.checkedElement)
      },
      async getProjects() {
        try {
          this.serverId = this.$route.params.id
          this.isLoading = true;
          const response = await axios.get(`http://localhost:3000/servers/${this.serverId}`);
          const data = response.data.projects;
          this.projects = data.map((element) => (
            {
              id: element.id,
              name: element.name,
              type: element.type,
              domain: element.domain,
              port: element.port,
              active: element.active
            }
          ))
          this.isLoading = false;
        } catch {
          throw new Error('fetch error')
        }
      }
    },
    mounted() {
      if(!this.isRender) {
        this.getProjects();
        this.isRender = true;
      }

    },
    watch: {
      isRender(newValue) {
        this.getProjects()
        this.isRender = newValue;
        // console.log(`watcher ${this.isRender}`)
      }

    }
  }
</script>

<style scoped lang="scss">
.projects {
  font-size: 1rem;
  &__btn {
    display: flex;
    justify-content: flex-start;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
.table {
  &__main {
    border: 1px solid #ddd;
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    font-size: 1rem;
  }
  &__name {
    width: 20%;
  }
  &__price {
    width: 20%;
  }
  &__type {
    width: 20%;
  }
  &__description {
    width: 60%;
  }
  &__edit button {
    margin-left: auto;
  }
}
td, th {
  padding: 0.5rem;
}
tr {
  border-bottom: 1px solid #ddd;
}
.loading {
  font-size: 1.5rem;
}
</style>