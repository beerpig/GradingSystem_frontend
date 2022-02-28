import axios from "axios";
import { Message } from "element-ui";
import router from "./router";
// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 });
instance.interceptors.request.use(
    config => {
        console.log('发送请求')

        console.log("config.headers:", config.headers)
        let token = sessionStorage.getItem('token')
        let username = sessionStorage.getItem('username')
            // 如果username是中文，会报etRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point.
        username = encodeURIComponent(username)
        config.headers.token = token
        config.headers.username = username

        return config

    },

    error => {
        console.log('请求失败！！')
        console.log(error)
        return Promise.reject(error)

    })

//异步请求后，判断token是否过期
instance.interceptors.response.use(
    response => {
        console.log("response interceptors process...", response);
        if (response.data.code === 10100) {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('token');
            Message.error("验证已过期，请重新登录！");
            router.push({ path: "/" });
        }
        // console.log("overdue");
        return response;
    },
    error => {
        console.log("response interceptors process... error", error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    sessionStorage.removeItem('token');
                    // this.$router.push({ path: "/" });
            }
        }
    }
)
export default instance;