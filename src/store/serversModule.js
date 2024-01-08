import {toRaw} from "@vue/reactivity";


export const serversModule = {
  namespaced: true,
  state: () => ({
    servers: [
      {
        name: "server1",
        id: 1,
        serverInfo: {
          cpu_temp: 23,
          hdd_load: 32
        },
        projects: [
          {
            id: 111,
            name: "project name 11",
            type: "api",
            domain: "somedomain551",
            port: 3000,
            active: true
          },
          {
            id: 112,
            name: "project name 12",
            type: "front",
            domain: "somedomain552",
            port: 3030,
            active: false
          }
        ]
      },
      {
        name: "server2",
        id: "2",
        serverInfo: {
          cpu_temp: 23,
          hdd_load: 32
        },
        projects: [
          {
            id: 22,
            name: "project name 11",
            type: "api",
            domain: "somedomain551",
            port: 3000,
            active: true
          },
          {
            id: 222,
            name: "project name 12",
            type: "front",
            domain: "somedomain552",
            port: 3030,
            active: false
          }
        ]
      },
    ],
    isModal: false,
    inputName: '',
    editButtonId: 0,
    checkedElement: '',
    isEdit: false,
    isRender: false,
    isLoading: false
  }),
  getters: {

  },
  mutations: {
    setServers(state, servers) {
      state.servers = servers
    },
    setIsModal(state, bool) {
      state.isModal = bool
    },
    setInputName(state, inputName) {
      state.inputName = inputName
    },
    setEditButtonId(state, editButtonId) {
      state.editButtonId = editButtonId
    },
    setCheckedElement(state, checkedElement) {
      state.checkedElement = checkedElement
    },
    setIsEdit(state, isEdit) {
      state.isEdit = isEdit
    },
    setIsRender(state, isRender) {
      state.isRender = isRender
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },


  },
  actions: {
    showModalForEdit({state, commit}, event) {
      commit('setIsModal', true)
      commit('editButtonId', event.target.id)
      const data = state.servers.filter(el => +el.id === +state.editButtonId)
      commit('setCheckedElement', toRaw(...data))
      commit('setIsEdit', true)
    }
  }
}