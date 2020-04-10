import { login } from "@/api/login.js";
import {getUserName,setUserName,removeUserName} from "@/utils/login"
const state = {
    username:getUserName() || "",
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    access_level:"" || sessionStorage.getItem("access_level"),
   
}
const getters = {
    isCollapse:state=>state.isCollapse,
    access_level:state=>state.access_level
}
const mutations = {
    set_username(state,value){
        state.username=value;
    },
    remove_username(state){
        state.username="";
    },
    setCollapse(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
        //Cookie.set('isCollapse',state.isCollapse)
    },
    setAccess_level(state,value){
        sessionStorage.setItem("access_level",value )
        state.access_level=value;
    },

}
const actions = {
    login({commit},requestData){
        // console.log(content)
        return new Promise((resolve,reject)=>{
            login(requestData).then(resonse => {
           
                commit("set_username",requestData.user_name);
                commit("setAccess_level",resonse.data);
              
                setUserName(requestData.user_name);
                
                resolve(resonse);
            }).catch(error => {
                reject(error)
            })
        })
    },
    out({commit}){
        return new Promise((resolve,reject)=>{
            
            removeUserName();
            commit("setAccess_level","");
            commit('remove_username');
            resolve();
        })
    }

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}