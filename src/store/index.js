import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state ={
    chinaData:{},
    a:1
}
const mutations = {

    submitChinaData(state,value){
        state.chinaData = JSON.parse(value.data.data)
    }
}
const getters={
    getChinaData(){
        return state.chinaData
    }
}
const actions ={
    setChinaData(context,value){
        context.commit('submitChinaData',value)
    },
}
const store = new Vuex.Store({
    mutations,
    state,
    getters,
    actions
});
export default  store
