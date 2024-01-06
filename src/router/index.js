import { createRouter, createWebHistory } from 'vue-router'
import MainPrices from "@/pages/MainPrices";
import Servers from "@/pages/Servers";
import ServerProjects from "@/pages/ServerProjects";

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
    path: '/servers/:id/projects',
    name: 'projects',
    component: ServerProjects
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),

})

export default router
