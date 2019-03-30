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
const DistricLayout = () => import('@/pages/district-management/distric-manage')
const DistrictManage = () => import('@/pages/district-management/distric-manage/home')
const AccountManage = () => import('@/pages/district-management/distric-manage/account')
const CommitteeLayout = () => import('@/pages/district-management/committee')
const CommitteeManage = () => import('@/pages/district-management/committee/home')
const CommitteeAccount = () => import('@/pages/district-management/committee/account')
const VoterGroup = () => import('@/pages/district-management/voters-group')
const CutPower = () => import('@/pages/district-management/cutpower-manage')
const DownFile = () => import('@/pages/district-management/download-file')
// 代表事务管理
const InitialCandidate = () => import('@/pages/initial-candidate')
const OfficialCandidate = () => import('@/pages/official-candidate')
const OfficialBehalf = () => import('@/pages/official-behalf')
const BehalfFile = () => import('@/pages/behalf-file-manage')
// 报表中心
const ReportAnalysis = () => import('./pages/report-center/report-analysis')
const ReportFile = () => import('./pages/report-center/report-file')
// 选民管理
const VotersQualification = () =>import('./pages/voters-management/voters-qualification')
const VotersTransfer = ()=>import('./pages/voters-management/voters-transfer')
const VotersTransferHome = ()=>import('./pages/voters-management/voters-transfer/home')
const VotersTransferHistory = ()=>import('./pages/voters-management/voters-transfer/history')
const VotersInput = ()=>import('./pages/voters-management/voters-input')
const VotersDraw = ()=>import('./pages/voters-management/voters-drawOut')
const VotersApeal = ()=>import('./pages/voters-management/voters-appeal')
const VotersDown = ()=>import('./pages/voters-management/download-file')



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
        {
          path: 'cut-power',
          name: '剥权人管理',
          component: CutPower
        },
        {
          path: 'down-file',
          name: '文件资料',
          component: DownFile
        },
        {
          path: 'initial-candidate',
          name: '初步候选人',
          component: InitialCandidate
        },
        {
          path: 'official-candidate',
          name: '正式候选人',
          component: OfficialCandidate
        },
        {
          path: 'official-behalf',
          name: '正式代表',
          component: OfficialBehalf
        },
        {
          path: 'behalf-file',
          name: '资料管理',
          component: BehalfFile
        },
        {
          path: 'report-analysis',
          name: '统计分析',
          component: ReportAnalysis
        },
        {
          path: 'report-file',
          name: '报表文件',
          component: ReportFile
        },
        {
          path: 'voters-qualification',
          name: '选民资格审查',
          component: VotersQualification
        },
        {
          path: 'voters-transfer',
          name: '选民转移管理',
          component: VotersTransfer,
          children: [
            {
              path: '',
              name: '待审核',
              component: VotersTransferHome
            },
            {
              path: 'history',
              name: '转移记录',
              component: VotersTransferHistory
            }
          ]

        },
        {
          path: 'voters-input',
          name: '选民划入管理',
          component: VotersInput
        },
        {
          path: 'voters-draw',
          name: '选民划出管理',
          component: VotersDraw
        },
        {
          path: 'voters-apeal',
          name: '选民申诉管理',
          component: VotersApeal
        },
        {
          path: 'voters-down',
          name: '选民文件资料',
          component: VotersDown
        }
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
