import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductManage from "../views/ProductManage";
import Add from "../views/Add";
import Update from "../views/Update";
import Bar from "../views/Bar";
import Pie from "../views/Pie";
import AddZip from "../views/AddZip"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/addZip',
    children: [
      {
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
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
