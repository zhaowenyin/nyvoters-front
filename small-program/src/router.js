import Vue from 'vue'
import Router from 'vue-router'

const Task = () => import('@/pages/task')
const Html = () => import('@/pages/task/html')
const Result = () => import('@/pages/task/result')
const Result2 = () => import('@/pages/task/result2')
const Confirm = () => import('./pages/task/confirm')
// 药品
const Medicine = () => import('@/pages/task/medicine')
const Selector = () => import('./pages/task/medicine/selector')

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Task
    },
    {
      path: '/task',
      name: '任务模板',
      component: Task
    },
    {
      path: '/confirm',
      name: '结果确认',
      component: Confirm
    },
    {
      path: '/result',
      name: '结果',
      component: Result
    },
    {
      path: '/result2',
      name: '结果2',
      component: Result2
    },
    {
      path: '/html',
      name: '富文本',
      component: Html
    },
    {
      path: '/ai',
      name: 'AI问诊',
      component: AI
    },
    {
      path: '/search',
      name: 'AI搜索',
      component: SearchAi
    },
    {
      path: '/consider',
      name: '考虑诊断',
      component: Consider
    },
    {
      path: '/medicine',
      name: '药品',
      component: Medicine
    },
    {
      path: '/selector',
      name: '选择',
      component: Selector
    }

  ]
})

export default router
