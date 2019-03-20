import Vue from 'vue'
import Router from 'vue-router'
import { hasSession, clearSession, getSession } from './utils/session'
import { logout } from './pages/login/service'
import { noLoginArr } from './pages/login/config'

/* Global */
import CommonLayout from './pages/common-layout'

const Login = () => import('./pages/login')
const Home = () => import('./pages/home')
const VoterRegister = () => import('@/pages/voter-register')
// 批量导入
const VoterRegistersLayout = () => import('@/pages/voter-registers')
const VoterRegisters = () => import('@/pages/voter-registers/home')
const VoterRegistersData = () => import('@/pages/voter-registers/data')

const VoterInfo = () => import('./pages/voter-info')
const BehalfCommendedLayout = () => import('@/pages/behalf-recommended')
const BehalfCommended = () => import('@/pages/behalf-recommended/home')
const BehalfCommendedHistory = () => import('@/pages/behalf-recommended/history')
const QualReviewLayout = () => import('./pages/qual-review')
const QualReview = () => import('./pages/qual-review/home')
const QualReviewHistory = () => import('./pages/qual-review/history')
// 系统管理
const RegionManage = () => import('@/pages/system-manage/region-manage')
const BasicManage = () => import('@/pages/system-manage/basic-setting')
const FileManage = () => import('@/pages/system-manage/file-manage')
const OperateLog = () => import('@/pages/system-manage/operate-log')

// 选区管理
const DistricLayout = () => import ('@/pages/district-management/distric-manage')
const DistrictManage = () => import ('@/pages/district-management/distric-manage/home')
const AccountManage = () => import ('@/pages/district-management/distric-manage/account')
const CommitteeLayout = () => import ('@/pages/district-management/committee')
const CommitteeManage = () => import ('@/pages/district-management/committee/home')
const CommitteeAccount = () => import ('@/pages/district-management/committee/account')
const VoterGroup = () => import ('@/pages/district-management/voters-group')



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
          path: 'manage1',
          name: '委员会管理',
          component: CommitteeLayout
        },
        {
          path: 'voter-register',
          name: '选民在线登记',
          component: VoterRegister
        },
        {
          path: 'voter-registers',
          component: VoterRegistersLayout,
          children: [
            {
              path: '',
              name: '导入管理',
              component: VoterRegisters
            },
            {
              path: '/voter-registers-data',
              name: '导入数据',
              component: VoterRegistersData
            }
          ]
        },
        {
          path: 'voter-info',
          name: '选民信息查询',
          component: VoterInfo
        },
        {
          path: 'qual-review',
          component: QualReviewLayout,
          children: [
            {
              path: '',
              name: '资格审查',
              component: QualReview
            },
            {
              path: 'history',
              name: '资格审查记录',
              component: QualReviewHistory
            }
          ]
        },
        {
          path: 'behalf-recommended',
          component: BehalfCommendedLayout,
          children: [
            {
              path: '',
              name: '代表推荐',
              component: BehalfCommended
            },
            {
              path: 'history',
              name: '代表推荐记录',
              component: BehalfCommendedHistory
            }
          ]
        },
        {
          path: 'region',
          name: '行政区管理',
          component: RegionManage
        },
        {
          path: 'basic',
          name: '基础设置',
          component: BasicManage
        },
        {
          path: 'file',
          name: '文件资料管理',
          component: FileManage
        },
        {
          path: 'operate',
          name: '操作日志',
          component: OperateLog
        },
        {
          path: 'district/',
          component: DistricLayout,
          children: [
            {
              path: 'manage',
              name: '选区管理',
              component: DistrictManage
            },
            {
              path: 'account',
              name: '帐号',
              component: AccountManage
            }
          ]
        },
        {
          path: 'committee/',
          component: CommitteeLayout,
          children: [
            {
              path: 'manage',
              name: '委员会管理',
              component: CommitteeManage
            },
            {
              path: 'account',
              name: '委员会帐号',
              component: CommitteeAccount
            }
          ]
        },
        {
          path: 'voter-group',
          name: '选民小组',
          component: VoterGroup
        },



      ]
    },

  ]
})

router.beforeEach(async ({path},from, next) => {
  console.log(path)
  const isLogin = hasSession() // true用户已登录， false用户未登录

  const authToken = getSession()
  const verifyArr = (authToken && authToken.verifyArr) || []
  //权限验证
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
