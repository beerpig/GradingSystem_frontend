// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from 'axios'
import instance from './http'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/store'
// import './styles/element-variables.scss'
// import 'normalize.css'

import SlideVerify from 'vue-monoplasty-slide-verify'

import './mock'

Vue.prototype.$axios = instance
Vue.config.productionTip = false
Vue.use(SlideVerify)


// Vue.use(SlideVerify)
/* eslint-disable no-new */

// const instance = axios.create({
//     validateStatus: true
// })

// // http request 拦截器
// instance.interceptors.request.use(
//     config => {
//         var token = sessionStorage.getItem('token');
//         if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             token = sessionStorage.getItem('token') + ':';
//             console.log('token:', token)
//             config.headers.Authorization = `Basic ${new Buffer(token).toString('base64')}`;
//         }
//         return config;
//     },
//     error => {
//         Message({
//             message: "登录状态信息过期,请重新登录",
//             type: "error"
//         });
//         router.push({
//             path: "/login"
//         });
//         // return Promise.reject(error);
//     }
// )

// // http response 拦截器
// instance.interceptors.response.use(
//     response => {
//         // if (response.data.success === true) {
//         //     console.log("response interceptor")


//         // }
//         // console.log(response)
//         return response
//     },
//     error => {
//         console.log("response interceptor error")
//         if (error.response) {
//             console.log('instance:' + error.response.status);
//             switch (error.response.status) {
//                 case 403:
//                     // 返回403 清除token信息并跳转到登录页面
//                     sessionStorage.clear()
//                     router.replace({
//                         path: '/login',
//                         query: { redirect: router.currentRoute.fullPath } // 重新登录后，返回之前的页面
//                     })
//                     Message({ showClose: true, message: '未登录，返回登陆界面', type: 'error', duration: 3000 })

//             }
//         }
//         return Promise.reject(error); // 返回接口的错误信息
//     }
// )


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})