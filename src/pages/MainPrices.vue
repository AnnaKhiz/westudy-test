<template>
  <table v-if="serverData.length > 0" class="table__main">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Description</th>
    </tr>
    <tr v-for="data in serverData">
      <td class="table__name">
        {{ data.name }}
      </td>
      <td class="table__price">
        {{ data.price }}
      </td>
      <td class="table__description">
        {{ data.description }}
      </td>
    </tr>
  </table>
  <div v-else class="loading">Идет загрузка...</div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Prices.vue",
    data() {
      return {
        serverData: [],
        isLoading: false,
      }
    },
    methods: {
      async getPrice() {
        try {
          this.isLoading = true;
          const response = await axios.get('https://api.westudy.ua/business_plans/westudy');
          const data = response.data.data;
          this.serverData = data.map((element) => (
            {
              name: element.name,
              price: element.price,
              description: element.description
            }
          ))
          this.isLoading = false;
        } catch {
          throw new Error('fetch error')
        }
      }
    },
    mounted() {
      this.getPrice();
    }
  }
</script>

<style scoped lang="scss">
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
  &__description {
    width: 60%;
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