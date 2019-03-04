import Vue from 'vue'
import Router from 'vue-router'
const Search = () => import('@/pages/search')
// 首页
const Home = () => import('@/pages/home')
const Register = () => import('@/pages/register')
const Complaint = () => import('@/pages/complait')
const Success = () => import('@/pages/success')



Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/search',
      name: '在线查询',
      component: Search,
    },
    {
      path: '/register',
      name: '在线登记',
      component: Register,
    },
    {
      path: '/complaint',
      name: '在线申诉',
      component: Complaint,
    },
    {
      path: '/success',
      name: '成功',
      component: Success,
    }

  ]
})

export default router
