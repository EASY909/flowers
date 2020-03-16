import { login } from "@/api/login.js";
import {getUserName,setUserName} from "@/utils/login"
const state = {
    username:getUserName() || "",
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
}
const getters = {
    isCollapse:state=>state.isCollapse,
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
}
const actions = {
    login({commit},requestData){
        // console.log(content)
        return new Promise((resolve,reject)=>{
            login(requestData).then(resonse => {
                commit("set_username",requestData.user_name);
                setUserName(requestData.user_name);
                
                resolve(resonse);
            }).catch(error => {
                reject(error)
            })
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