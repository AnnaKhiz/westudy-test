import axios from "axios";

export const priceModule = {
  namespaced: true,
  state: () => ({
    serverData: [],
    isLoading: false,
  }),
  mutations: {
    setServerData(state, data) {
      state.serverData = data
    },
    setIsLoading(state, bool) {
      state.isLoading = bool
    }
  },
  actions: {
    async getPrice({state, commit}) {
      try {
        commit('setIsLoading', true)
        const response = await axios.get('https://api.westudy.ua/business_plans/westudy');
        const data = response.data.data;
        commit('setServerData', state.serverData = data.map((element) => (
          {
            name: element.name,
            price: element.price,
            description: element.description
          }
        )))
        commit('setIsLoading', false)
      } catch {
        throw new Error('fetch error')
      }
    }
  }

}