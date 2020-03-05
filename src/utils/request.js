const axios = require('axios')
export default {
    axiosGet:function(url,param){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params:{param}}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    axiosPost:function(url,param){
        return new Promise((resolve,reject)=>{
            axios.post(url,param,{headers:{'Content-Type':'application/json'}}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}
