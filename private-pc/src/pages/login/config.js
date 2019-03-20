// 不需要权限验证的地址
export const noVerifyArr = [
]

// 有权限验证的地址
export const verifyArr = [
  ...noVerifyArr,
  '/',
  '/voter-register',
  '/voter-registers',
  '/voter-info',
  '/behalf-recommended',
  '/qual-review',
  '/qual-review/history',
  '/behalf-recommended/history',
  '/region',
  '/basic',
  '/file',
  '/operate',
  '/voter-registers-data',
  '/district/manage',
  '/district/account',
  '/committee/manage',
  '/committee/account',
  '/voter-group'

]

// 不需要登录验证的地址
export const noLoginArr = [
  ...noVerifyArr
]
