// import api from '../../utils/api'

// 登录
export async function login () {
  return {
    data: {
      token: '33333333'
    }
  }
  // return api.post('/api/v3/doctorapp/doctors/session_1548656229745', payload)
}

// 退出
export async function logout () {
  return {
    data: null
  }
  // return api.delete('/api/v3/pcweb/users/session')
}
// 下载
export async function taskDownload (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
  // return api.post(`/api/v3/pcweb/gauges/answers/${payload.id}/reports`,{citizen_name: payload.citizen_name,operate_name:payload.operate_name,doctor_name:payload.doctor_name})
}
