// import api from '../utils/api'

// 获取维度筛选项
export async function getDimension () {
  // return api.get('/options')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
}
