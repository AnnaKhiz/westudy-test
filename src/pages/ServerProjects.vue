<template>
  <div class="projects">
    <div class="projects__btn">
      <custom-button @click="showProjectModal">
        Добавить проект
      </custom-button>
    </div>

    <div v-if="projects.length === 0" class="projects-list__title">У этого сервера нет проектов</div>
    <div v-else class="projects-list__title">Проекты сервера - ID: {{$route.params.id}}</div>

    <table v-if="!isLoading" class="table__main">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Domain</th>
        <th>Port</th>
        <th>Active</th>
      </tr>
      <tr v-for="project in projects" :key="project.id">
        <td class="table__column">
          {{ project.id }}
        </td>
        <td class="table__column">
          {{ project.name }}
        </td>
        <td class="table__column">
          {{ project.type }}
        </td>
        <td class="table__column">
          {{ project.domain }}
        </td>
        <td class="table__column">
          {{ project.port }}
        </td>
        <td class="table__column">
          {{ project.active }}
        </td>
        <td class="table__edit">
          <custom-button @click="showProjectModalForEdit" :id="project.id" >Редактировать</custom-button>
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
      :show="isModal"
      v-model:show="isModal"
      :edit="isEdit"
      v-model:edit="isEdit"
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
  import {toRaw} from "@vue/reactivity";

  export default {
    name: "ServerProjects.vue",
    components: {AddProject, ModalAddServer},
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

      async createProject(project) {
        try {
          const response = await axios.get(`http://localhost:3000/servers/${this.serverId}`)
          const data = await response.data;
          const projects = data.projects;
          projects.push(project)
          await axios.patch(`http://localhost:3000/servers/${this.serverId}`, data)
          this.isModal = false
        } catch {
          throw new Error('project not created')
        }
      },

      showProjectModal() {
        this.isModal = true;
      },

      showProjectModalForEdit(event) {
        this.showProjectModal();
        this.isEdit = true;
        this.editButtonId = event.target.id
        const data = this.projects.filter(el => +el.id === +this.editButtonId)
        this.checkedElement = toRaw(...data)
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
      isRender() {
        this.getProjects();
      },
      isModal() {
        this.getProjects();
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
    margin: auto;
    border: 1px solid #ddd;
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    font-size: 1rem;
  }
  &__column {
    width: 15%;
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
.loading, .projects-list__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>