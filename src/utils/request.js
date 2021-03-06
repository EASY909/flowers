import axios from "axios";
// const BASEURL = process.env.NODE_ENV === 'production' ? '/devApi' : '/devApi';
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
import Qs from 'qs'
//拦截器
console.log(process.env.NODE_ENV);
const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
   
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
    },
    withCredentials: false,

});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
   
    // 在发送请求之前做些什么
    if (config.method === "post") {

        config.data = Qs.stringify(config.data);
        // console.log( config.data)
      }
  

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

    // 对响应数据做点什么
    let data = response.data;
    return data;
    // if (data.code != 1) {
    //     return Promise.reject(response);
    // } else {
    //     return data;
    // }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;