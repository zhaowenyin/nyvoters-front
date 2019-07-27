import api from '../../../utils/api'
export async function getTree (payload) {
  return api.post('/district/tree', payload)
}
export async function getOther (payload) {
  console.log(payload)
  console.log(1,payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data:
          '前端模拟数据'

      })
    }, 500)
  })
  // return api.get('/doc/preview', {params:payload})
}
