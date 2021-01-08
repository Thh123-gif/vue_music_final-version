import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component:()=>import('../views/Recommend')
  },
  {
    path:'/hot',
    name:'Hot',
    component:()=>import('../views/HotMusic')
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
