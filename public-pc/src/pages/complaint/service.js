// import api from '../../utils/api'

export async function complaitSubmit () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
  // return api.get(`/online-appeal/create`, {params: payload})
  //   .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
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
