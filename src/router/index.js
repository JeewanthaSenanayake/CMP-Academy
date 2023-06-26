import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SingUpView from '@/views/SingUpView.vue'
import HomeView from '@/views/Students/HomeView.vue'
import DashboardView from '@/views/Students/DashboardView.vue'
import TeacherDashboardView from '@/views/Teacher/DashboardViwe.vue'
import ClassView from '@/views/Teacher/ClassViwe.vue'
import ClassView_sturent from '@/views/Students/ClassView.vue'

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
  },
  {
    path: '/dashboard',
    name:'Dashboard',
    component : DashboardView
  },
  {
    path: '/class',
    name:'class',
    component : ClassView_sturent
  },
  {
    path: '/teacher-dashboard',
    name:'Dashboard',
    component : TeacherDashboardView
  },
  {
    path: '/teacher-class',
    name:'Class',
    component : ClassView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
