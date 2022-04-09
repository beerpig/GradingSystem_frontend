import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductManage from "../views/ProductManage";
import Bar from "../views/Bar";
import Pie from "../views/Pie";
import AddZip from "../views/AddZip"
import Collapse from "../views/Collapse"
import Memu from "../views/Memu"
import Login from "../views/Login"
import Register from "../views/Register"
import Homepage from "../views/Homepage"
import SlideCaptcha from "../views/SlideCaptcha"
import Welcome from "../views/Welcome"
import Forget from "../views/Forget"
import MutilAdd from "../views/MutilAdd"
import History from "../views/History"
import HistoryAssignUser from "../views/HistoryAssignUser"
import ApplyConsultant from "../views/ApplyConsultant"
import SpecifyBP from "../views/SpecifyBP"




Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        children: [{
                path: '/productManage',
                name: '提交管理',
                component: ProductManage
            },
            {
                path: '/welcome',
                name: '欢迎体验',
                component: Welcome
            },
            {
                path: '/addZip',
                name: '添加作品',
                component: AddZip
            },
            {
                path: '/mutilAdd',
                name: '批量上传',
                component: MutilAdd
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
                name: '查看评分',
                component: Collapse
            },
            {
                path: '/memu',
                component: Memu
            },
            {
                path: '/history',
                component: History
            },
            {
                path: '/historyAssignUser/:id',
                component: HistoryAssignUser,
                props: true
            },
            {
                path: '/applyConsultant',
                component: ApplyConsultant,
            },
            {
                path: '/specifyBP',
                component: SpecifyBP,
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
    {
        path: '/forget',
        name: 'ForgetPass',
        component: Forget
    }
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
    if (to.path === '/register' | to.path === '/forget') {
        next()
    } else if (to.path === '/login') {
        // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
        if (token) {
            next({ path: '/' })
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
