import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store'
import './styles/init.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.init({
    apikey: "cf9092797fe138e06f8b92417639e1963cc51d3cd4b3a01aef0dfdcf4e6c9e66",
    httpTimeout:5000,
    silentConsole:true
})
fundebugVue(fundebug, Vue);

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  store,
    render: h => h(App)
}).$mount('#app')
