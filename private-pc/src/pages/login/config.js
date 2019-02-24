// 不需要权限验证的地址
export const noVerifyArr = [
]

// 有权限验证的地址
export const verifyArr = [
  ...noVerifyArr,
  '/',
  '/gauge',
  '/gaugeManage',
  '/gauge2',
  '/gauge/script',
  '/gauge/script/result',
  '/gauge/show',
  '/service',
  '/serviceEdit',
  '/serviceEdit/service'
]

// 不需要登录验证的地址
export const noLoginArr = [
  ...noVerifyArr
]
