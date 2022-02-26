import axios from "axios";
// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 });
instance.interceptors.request.use(
    config => {
        console.log('发送请求')
        let token = sessionStorage.getItem('token')
        let username = sessionStorage.getItem('username')
        config.headers.token = token
        config.headers.username = username
            // console.log(localStorage.getItem('token'))
        if (sessionStorage.getItem('token')) {
            // console.log('请求头加入token')
            config.headers.token = sessionStorage.getItem('token')
        }

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
        return response;
    },
    error => {
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