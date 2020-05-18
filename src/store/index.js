import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state ={
    chinaData:{},
    provinceList:{}
}
const mutations = {

    submitChinaData(state,value){
        state.chinaData = JSON.parse(value.data.data)
    },
    submitProvinceList(state,value){
        state.provinceList = JSON.parse(value.data.data)
    }
}
const getters={
    getChinaData(){
        return state.chinaData
    },
    getProvinceList(){
        return state.provinceList
    }
}
const actions ={
    setChinaData(context,value){
        context.commit('submitChinaData',value)
    },
    setProvinceList(context,value){
        context.commit('submitProvinceList',value)
    }
}
const store = new Vuex.Store({
    mutations,
    state,
    getters,
    actions
});
export default  store
