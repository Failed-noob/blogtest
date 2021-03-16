import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component:()=>import('../views/Home.vue'),
    redirect:'/homepage',
    children:[
      {
        path:'homepage',
        name:"homepage",
        component:()=>import('../views/Homepage.vue')
      },
      {
        path:'bloglist',
        component:()=>import('../views/Bloglist.vue')
      },
      {
        path:'mine',
        component:()=>import('../views/Mine.vue')
      }
  
  ] 
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import('@/views/Login.vue')
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//前置路由钩子 默认显示为登录页面, 未登录前
router.beforeEach((to,from,next)=>{
  let loginToken = sessionStorage.getItem('loginToken')
 
  if(to.path =='/login'){
    next();
  }else  loginToken ? next() : next('/login');
  

})
export default router
