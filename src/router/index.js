import { createRouter, createWebHistory } from 'vue-router'
import MainPrices from "@/pages/MainPrices";
import Servers from "@/pages/Servers";

const routes = [
  {
    path: '/',
    name: 'prices',
    component: MainPrices
  },
  {
    path: '/servers',
    name: 'servers',
    component: Servers
  },
  {
    path: '/servers/data.json',
    name: 'database',
    component: Servers
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),

})

export default router
