import api from '../../../../utils/api'

// get请求
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "content": {
  //           "data": [
  //             {
  //               "code": "string",
  //               "distinct": "string",
  //               "distinctId": 0,
  //               "id": 0,
  //               "name": "string",
  //               "pnum": 0,
  //               "sort": 0,
  //               "type": true
  //             }
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 20
  //         },
  //         "errorCode": "string",
  //         "errorMsg": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  for(let i in payload) {
    if(payload[i] === '') {
      delete payload[i]
    }
  }
  return api.post('/precinct/list', payload )
}

export async function setSubmit (payload) {
  // console.log(1,payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/precinct/add', payload)
}

export async function modifySubmit (payload) {
  // console.log(2,payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/precinct/edit', payload)
}

export async function deletetTabel (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.delete(`/precinct/delete/${payload.id}`)
}
export async function getTree (payload) {
  return api.get(`/district/select/${payload.id}`)
}
export async function getTreeList (payload) {
  return api.get(`/district/selectPrecinct/${payload.id}`)
}
export async function getNextSort (payload) {
  return api.get(`/precinct/${payload.id}/nextSort`)
}




