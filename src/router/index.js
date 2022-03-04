import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductManage from "../views/ProductManage";
import Add from "../views/Add";
import Update from "../views/Update";
import Bar from "../views/Bar";
import Pie from "../views/Pie";
import AddZip from "../views/AddZip"
import Collapse from "../views/Collapse"
import Memu from "../views/Memu"
import Login from "../views/Login"
import Register from "../views/Register"
import Homepage from "../views/Homepage"
import SlideCaptcha from "../views/SlideCaptcha"




Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        // redirect: '/productManage',
        children: [{
                path: '/productManage',
                name: '提交管理',
                component: ProductManage
            },
            {
                path: '/add',
                name: '添加商品',
                component: Add
            },
            {
                path: '/addZip',
                name: '添加作品',
                component: AddZip
            },
            {
                path: '/update',
                name: '修改商品',
                component: Update
            },
            {
                path: '/bar',
                name: '柱状图',
                component: Bar
            },
            {
                path: '/pie',
                name: '饼图',
                component: Pie
            },
            {
                path: '/collapse',
                name: '评分查看',
                component: Collapse
            },
            {
                path: '/memu',
                component: Memu
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/homepage',
        name: 'Homepage',
        component: Homepage
    },
    {
        path: '/captcha',
        name: 'SlideCaptcha',
        component: SlideCaptcha
    },

]



const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})





router.beforeEach((to, from, next) => {
    // 登录界面登录成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭即失效。
    let token = sessionStorage.getItem('token')
        // let userName = sessionStorage.getItem('user')
    if (to.path === '/register') {
        next()
    } else if (to.path === '/login') {
        // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
        if (token) {
            next({ path: '/addZip' })
        } else {
            next()
        }
    } else {
        if (!token) {
            // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
            next({ path: '/login' })
        } else {
            // 加载动态菜单和路由
            // addDynamicMenuAndRoutes(userName, to, from)
            next()
        }
    }
})

export default router