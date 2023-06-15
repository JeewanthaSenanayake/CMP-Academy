import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SingUpView from '@/views/SingUpView.vue'
import HomeView from '@/views/Students/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/sing-up',
    name: 'SingUpView',
    component: SingUpView
  },
  {
    path: '/home',
    name:'HomeView',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
