import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component:()=>import('../views/Recommend'),
    meta:{showNav:true}  //meta路由原信息.
  }, 
  {
    path:'/playlist/:plistid',
    name:'Playlist',
    component:()=>import('../views/Playlist'),
    props:true,
    meta:{showNav:false}  //meta路由原信息.
  },
  {
    path:'/hot',
    name:'Hot',
    component:()=>import('../views/HotMusic'),
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search'),
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path:'/mine',
    name:'Mine',
    component:()=>import('../views/Mine'),
    meta:{showNav:true},
    beforeEnter(to,from,next){
      let luname = window.sessionStorage.getItem('username');
      let lupass = window.sessionStorage.getItem('userpass');
      if(luname == "admin" && lupass == "123456"){
          next('/minepage');
      }else{
          alert('请登录');
          next();
      }
    },
  },
  {
    path:'/minepage',
    name:'MinePage',
    component:()=>import('../views/MinePage'),
    meta:{showNav:false},
  }
]

const router = new VueRouter({
  routes
})

export default router
