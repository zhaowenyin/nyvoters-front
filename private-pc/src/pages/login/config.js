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
  '/qual-review',
  '/qual-review/history'

]

// 不需要登录验证的地址
export const noLoginArr = [
  ...noVerifyArr
]
