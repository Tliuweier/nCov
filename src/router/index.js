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
    }
]
const router = new VueRouter({
    routes
})
export default router
