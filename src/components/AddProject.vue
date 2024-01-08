<template>

    <form class="form__add-server" v-if="!edit">

      <label for="project-id" >ID:</label>
      <custom-input
        placeholder="Введите ID..."
        id="project-id"
        name="project-id"
        v-model.trim="project.id"
      />

      <label for="project-name">Название проекта:</label>
      <custom-input
        placeholder="Введите название проекта..."
        id="project-name"
        name="project-name"
        v-model.trim="project.name"
      />

      <custom-select
        id="project-type"
        :options="projectTypes"
        v-model="project.type"
      />

      <label for="project-domain">Домен:</label>
      <custom-input
        placeholder="Введите домен..."
        id="project-domain"
        name="project-domain"
        v-model.trim="project.domain"
      />

      <label for="project-port">Порт:</label>
      <custom-input
        placeholder="Введите порт..."
        id="project-port"
        name="project-port"
        v-model.trim.number="project.port"
      />

      <custom-checkbox
        id="project-active"
        v-model:isActive="project.active"
      />
      <label for="project-active" class="checkbox-label">Активный</label>

      <custom-button  v-if="isDisabled" class="form__btn" @click.prevent @click="addNewProject" disabled>Добавить</custom-button>
      <custom-button  v-else class="form__btn" @click.prevent @click="addNewProject" >Добавить</custom-button>

      <custom-message-block >{{ message }}</custom-message-block>

    </form>
  <form v-else class="form__add-server">

    <div class="project__title">ID: {{editServerForm.id}}</div>
    <label for="project-name">Название проекта:</label>
    <custom-input
      placeholder="Введите название проекта..."
      id="project-name"
      name="project-name"
      :value="editServerForm.name"
      v-model.trim="editServerForm.name"
    />

    <label for="project-type">Тип проекта ({{ editServerForm.type }}). Изменить:</label>
    <custom-select
      id="project-type"
      :options="projectTypes"
      v-model="editServerForm.type"
    />


    <label for="project-domain">Домен:</label>
    <custom-input
      placeholder="Введите домен..."
      id="project-domain"
      name="project-domain"
      :value="editServerForm.domain"
      v-model.trim="editServerForm.domain"
    />

    <label for="project-port">Порт:</label>
    <custom-input
      placeholder="Введите порт..."
      id="project-port"
      name="project-port"
      :value="editServerForm.port"
      v-model.trim.number="editServerForm.port"
    />

    <custom-checkbox
      v-if="editServerForm.active === true"
      checked
      id="project-active"
      v-model:isActive="editServerForm.active"
    />
    <custom-checkbox
      v-else
      id="project-active"
      v-model:isActive="editServerForm.active"
    />

    <label for="project-active" class="checkbox-label">Активный</label>

    <custom-button  class="form__btn" @click.prevent @click="saveEditedProject" >Редактировать</custom-button>

    <custom-message-block >{{ message }}</custom-message-block>

  </form>


</template>

<script>
  import ModalAddServer from "@/components/ModalAddServer";
  import CustomInput from "@/components/UI/CustomInput";
  import axios from "axios";
  import CustomSelect from "@/components/UI/CustomSelect";

  export default {
    name: "AddProject.vue",
    components: {CustomSelect, ModalAddServer, CustomInput},
    data() {
      return {
        project: {
          id: '',
          name: '',
          type: this.selectedSort,
          domain: '',
          port: '',
          active: this.isActive
        },
        projectTypes: [
          { name: "Api", value: "api" },
          { name: "Front", value: "front" },
          { name: "Worker", value: "worker"}
        ],
        message: '',
        isActive: false,
        selectedSort: '',
        isDisabled: false
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
      },
      editServerForm: {
        type: Object,
      },
      serverId: {
        type: Number
      },
    },
    emits: ['create'],
    methods: {

      hideModal() {
        this.$emit('update:show', false)
        this.$emit('update:edit', false)
        this.$emit('update:ren', false)
      },
      addNewProject() {
        if (Object.values(this.project).every(value => value === '')) {
          this.message = 'Заполните все поля'
        } else {

          this.project = {
            id: this.project.id,
            name: this.project.name,
            type: this.project.type,
            domain: this.project.domain,
            port: this.project.port,
            active: this.project.active
          }
          this.$emit('create', this.project);
        }
      },

      async saveEditedProject(event) {

        try {
          console.log(`http://localhost:3000/servers/${this.serverId}`)
          const response = await axios.get(`http://localhost:3000/servers/${this.serverId}`);
          const data = await response.data;
          const projects = data.projects
          projects.forEach(el => {
            if (el.id === this.editServerForm.id) {
              el.id = this.editServerForm.id,
              el.name = this.editServerForm.name,
              el.type = this.editServerForm.type,
              el.domain = this.editServerForm.domain,
              el.port = this.editServerForm.port,
              el.active = this.editServerForm.active
              }
          })

          await axios.patch(`http://localhost:3000/servers/${this.serverId}`, data)

          this.$emit('update:show', false)

        } catch {
          throw new Error('error in POST request')
        }
      }
    },


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
.project {
  &__title {
    margin-bottom: 10px;
    font-weight: 600;
  }
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
.checkbox-label {
  display: inline;
}
</style>