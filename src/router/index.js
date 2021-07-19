import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const Home = resolve => require(['@/viwes/home.vue'], resolve)
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        name:'home',
        component:Home
    },
    {
        path: '/global',
        name: 'global',
        component: 
          resolve =>  require(['../views/global'], resolve)
    },
    {
        path: '/area',
        name: 'area',
        component: 
          resolve =>  require(['../views/area'], resolve)
    },
    {
        path: '/parent',
        name: 'parent',
        component: 
          resolve =>  require(['../views/parent'], resolve)
    },
    {
        path: '/blog',
        name: 'blog',
        component: 
          resolve =>  require(['../views/blog'], resolve)
    },
    {
        path: '/movieSeat',
        name: 'movieSeat',
        component: 
          resolve =>  require(['../views/movieSeat'], resolve)
    }
]
const router = new VueRouter({
    routes
})
export default router
