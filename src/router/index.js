import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '@/components/Dashboard'
import Data from '@/components/DataDeviceSensor'
import Toolkit from '@/components/Toolkit'
import Help from '@/components/Help'

Vue.use(VueRouter)

const routes = [
  // linkExactActiveClass: 'router-link-active',
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard-page',
    component: Dashboard
  },
  {
    path: '/datadevicesensor',
    name: 'data-page',
    component: Data
  },
  {
    path: '/toolkit',
    name: 'toolkit-page',
    component: Toolkit
  },
  {
    path: '/help',
    name: 'help-page',
    component: Help
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
