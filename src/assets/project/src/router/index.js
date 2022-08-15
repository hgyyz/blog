import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: () => import('@/views/iframe/iframe.vue'),
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/sonManage',
        name: 'sonManage',
        component: () => import('@/views/resources/sonManage/sonManage.vue')
      },

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
