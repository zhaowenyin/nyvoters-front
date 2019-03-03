import Vue from 'vue'
import Router from 'vue-router'
import { hasSession, clearSession, getSession } from './utils/session'
import { logout } from './pages/login/service'
import { noLoginArr } from './pages/login/config'

/* Global */
import CommonLayout from './pages/common-layout'

const Login = () => import('./pages/login')
const Home = () => import('./pages/home')
const VoterRegister = () => import('./pages/voter-register')
const VoterRegisters = () => import('./pages/voter-registers')
const VoterInfo = () => import('./pages/voter-info')


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      component: CommonLayout,
      children: [
        {
          path: '',
          name: '首页',
          component: Home
        },
        {
          path: 'voter-register',
          name: '选民在线登记',
          component: VoterRegister
        },
        {
          path: '/voter-registers',
          name: '选民批量登记',
          component: VoterRegisters
        },
        {
          path: '/voter-info',
          name: '选民信息查询',
          component: VoterInfo
        }
      ]
    },

  ]
})

router.beforeEach(async ({path},from, next) => {
  const isLogin = hasSession() // true用户已登录， false用户未登录

  const authToken = getSession()
  const verifyArr = (authToken && authToken.verifyArr) || []
  // 权限验证
  const re = (list) => {
    if (path === '/login') return true
    for (const key of list) {
      if (key === path) {
        return true
      }
    }
    return false
  }
  if (!re(verifyArr)) return next({ path: '/login' })

  // 不需要登录验证的地址
  for (let i = 0, len = noLoginArr.length; i < len; i++) {
    if (noLoginArr[i] === path) {
      return next()
    }
  }

  if (path === '/login' && isLogin) {
    try {
      await logout()
    } finally {
      clearSession()
      location.reload()
    }
  }
  if (path !== '/login' && !isLogin) {
    return next({ path: '/login' })
  }
  next()
})
export default router
