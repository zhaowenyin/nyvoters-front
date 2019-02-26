// import api from '../../utils/api'

// 登录
export async function login (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          token: '8064e14b-f8cc-464f-bd29-52a68b869e8f',
        }
      })
    }, 500)
  })
  // return api.post('/api/v3/pcweb/users/session', payload)
}

// 退出
export async function logout () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
  // return api.delete('/api/v3/pcweb/users/session')
}
