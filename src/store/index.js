import { createStore } from "vuex";
import {serversModule} from "@/store/serversModule";
import {priceModule} from "@/store/priceModule";

export default createStore({

  modules: {
    price: priceModule,
    server: serversModule
  }
})