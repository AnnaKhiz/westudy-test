<template>

    <form class="form__add-server" v-if="!edit">

      <label for="project-id" >ID:</label>
      <custom-input
        placeholder="Введите ID..."
        id="project-id"
        name="project-id"
        v-model="project.id"
      />

      <label for="project-name">Название проекта:</label>
      <custom-input
        placeholder="Введите название проекта..."
        id="project-name"
        name="project-name"
        v-model="project.name"
      />

      <label for="project-type">Тип проекта:</label>
      <custom-input
        placeholder="Введите тип проекта..."
        id="project-type"
        name="project-type"
        v-model="project.type"
      />

      <label for="project-domain">Домен:</label>
      <custom-input
        placeholder="Введите домен..."
        id="project-domain"
        name="project-domain"
        v-model="project.domain"
      />

      <label for="project-port">Порт:</label>
      <custom-input
        placeholder="Введите порт..."
        id="project-port"
        name="project-port"
        v-model="project.port"
      />

      <label for="project-active">Активный:</label>
      <custom-input
        placeholder="Введите порт..."
        id="project-active"
        name="project-active"
        v-model="project.active"
      />

      <custom-button  class="form__btn" @click.prevent @click="">Добавить</custom-button>

      <custom-message-block >{{ message }}</custom-message-block>

    </form>
  <form v-else class="form__add-server">

<!--    <label for="project-id" >ID:</label>-->
<!--    <custom-input-->
<!--      readonly-->
<!--      placeholder="Введите ID..."-->
<!--      id="project-id"-->
<!--      name="project-id"-->
<!--      v-model="editServerForm.id"-->
<!--    />-->
    <div class="project__title">ID: {{editServerForm.id}}</div>
    <label for="project-name">Название проекта:</label>
    <custom-input
      placeholder="Введите название проекта..."
      id="project-name"
      name="project-name"
      :value="editServerForm.name"
      v-model="editServerForm.name"
    />

    <label for="project-type">Тип проекта:</label>
    <custom-input
      placeholder="Введите тип проекта..."
      id="project-type"
      name="project-type"
      :value="editServerForm.type"
      v-model="editServerForm.type"
    />

    <label for="project-domain">Домен:</label>
    <custom-input
      placeholder="Введите домен..."
      id="project-domain"
      name="project-domain"
      :value="editServerForm.domain"
      v-model="editServerForm.domain"
    />

    <label for="project-port">Порт:</label>
    <custom-input
      placeholder="Введите порт..."
      id="project-port"
      name="project-port"
      :value="editServerForm.port"
      v-model="editServerForm.port"
    />

    <label for="project-active">Активный:</label>
    <custom-input
      placeholder="Введите порт..."
      id="project-active"
      name="project-active"
      v-model="editServerForm.active"
      :value="editServerForm.active"
    />

    <custom-button  class="form__btn" @click.prevent @click="saveEditedProject" >Редактировать</custom-button>

    <custom-message-block >{{ message }}</custom-message-block>

  </form>


</template>

<script>

  import ModalAddServer from "@/components/ModalAddServer";
  import CustomInput from "@/components/UI/CustomInput";
  import axios from "axios";
  export default {
    name: "AddProject.vue",
    components: {ModalAddServer, CustomInput},
    data() {
      return {
        project: {
          id: '',
          name: '',
          type: '',
          domain: '',
          port: '',
          active: ''
        },
        message: ''
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
    methods: {
      hideModal() {
        this.$emit('update:show', false)
        this.$emit('update:edit', false)
        this.$emit('update:ren', false)
      },
      saveEditedProject(event) {
        // console.log(this.project.id)
        const target = event.target.id
        const obj = {
          projects: [
            {
              id: this.editServerForm.id,
              name: this.editServerForm.name,
              type: this.editServerForm.type,
              domain: this.editServerForm.domain,
              port: this.editServerForm.port,
              active: this.editServerForm.active
            }
          ]

        }


        try {
          console.log(`http://localhost:3000/servers/${this.serverId}`)
          axios.patch(`http://localhost:3000/servers/${this.serverId}`, obj)
            this.hideModal()
            .then(res => console.log(res))
        } catch {
          throw new Error('error in POST request')
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
</style>