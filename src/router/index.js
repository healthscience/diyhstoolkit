import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Help from '@/components/help/Help'

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
    path: '/help',
    name: 'help-page',
    component: Help
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
