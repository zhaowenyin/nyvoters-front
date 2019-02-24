import Vue from 'vue'
import Router from 'vue-router'
import { hasSession, clearSession, getSession } from './utils/session'
import { logout } from './pages/login/service'
import { noLoginArr } from './pages/login/config'

/* Global */
import CommonLayout from './pages/common-layout'

const Login = () => import('./pages/login')
const Gauge = () => import('./pages/gauge')
const Template = () => import('./pages/gauge/template')
const Script = () => import('./pages/gauge/script')
const ScriptValid = () => import('./pages/gauge/script/Center')
const ScriptResult = () => import('./pages/gauge/script/result')
const GaugeManage = () => import('./pages/gauge/manage')
const Show = () => import('./pages/gauge/show')
const ServiceManage = () => import('./pages/service/index')
const ServiceEdit = () => import('./pages/service/edit')
const ServiceChart = () => import('./pages/service/edit/chart')
const Service = () => import('./pages/service/edit/service')

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
          path: '/',
          name: '首页',
          redirect: '/gaugeManage'
        },
        {
          path: 'gaugeManage',
          name: '量表管理',
          component: GaugeManage
        },
        {
          path: 'service',
          name: '服务管理',
          component: ServiceManage
        },
        {
          path: 'serviceEdit',
          name: '编辑服务',
          component: ServiceEdit,
          children: [
            {
              path: '',
              name: '流程图',
              component: ServiceChart
            },
            {
              path: 'service',
              name: '服务',
              component: Service
            }
          ]
        },
        {
          path: 'gauge/',
          component: Gauge,
          children: [
            {
              path: '',
              name: '量表',
              component: Template
            },
            {
              path: 'script',
              name: '脚本',
              component: Script,
              children: [
                {
                  path: '',
                  name: '量表校验与计算',
                  component: ScriptValid
                },
                {
                  path: 'result',
                  name: '量表结果计算',
                  component: ScriptResult
                }
              ]
            },
            {
              path: 'show',
              name: '显示跳转设置',
              component: Show
            }
          ]
        },
      ]
    }
  ]
})

router.beforeEach(async ({path}, from, next) => {
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
