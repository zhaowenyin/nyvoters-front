// 不需要权限验证的地址
export const noVerifyArr = [
]

// 有权限验证的地址
export const verifyArr = [
  ...noVerifyArr,
  '/'

]

// 不需要登录验证的地址
export const noLoginArr = [
  ...noVerifyArr
]
