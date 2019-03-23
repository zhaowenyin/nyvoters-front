// import api from '../../utils/api'

// 登录
export async function login (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": {
            "powers": [
              0
            ],
            "token": "string",
            "userId": 0,
            "userName": "string"
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/login', payload)
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
  // return api.post('/logout')
}
export async function getCode () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": {
            "captcha": "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            "captchaId": 1
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.get('/getcode')
}

