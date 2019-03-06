// import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          total: 100,
          list: [
            {
              id: 1,
              name: '张三',
              card: '510922199608254411',
              gender: '男',
              tel: '15590001222',
              address_type: '居住地',
              time: 1551621599434,
              type: '登记成功'
            },
            {
              id: 2,
              name: '李四',
              card: '510922199608254411',
              gender: '男',
              tel: '15590001222',
              address_type: '居住地',
              time: 1551621599434,
              type: '登记成功'
            }
          ]
        }
      })
    }, 500)
  })
  // return api.get('/api', { params: payload })
}

// post请求
export async function post (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/api', payload)
}
