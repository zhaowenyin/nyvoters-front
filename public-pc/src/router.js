import Vue from 'vue'
import Router from 'vue-router'
// import { hasSession, clearSession, getSession } from './utils/session'
// import { logout } from './pages/login/service'
// import { noLoginArr } from './pages/login/config'

/* Global */
import CommonLayout from './pages/common-layout'

const Search = () => import('@/pages/search')
// 首页
const Home = () => import('@/pages/home')
const Register = () => import('@/pages/register')
const Complaint = () => import('@/pages/complaint')



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/',
      component: CommonLayout,
      children: [
        {
          path: '/search',
          name: '在线查询',
          component: Search
        },
        {
          path: '/register',
          name: '在线查询',
          component: Register
        },
        {
          path: '/complaint',
          name: '在线查询',
          component: Complaint
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  next()
})
export default router
