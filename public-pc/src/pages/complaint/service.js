// import api from '../../utils/api'

export async function searchSubmit () {
  return {
    data: {

    }
  }
  // return api.get(`/online-appeal/create`, {params: payload})
  //   .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
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
