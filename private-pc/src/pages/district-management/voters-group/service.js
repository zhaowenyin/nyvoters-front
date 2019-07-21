import api from '../../../utils/api'

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
  //               "convener": "string",
  //               "convenerPhone": "string",
  //               "id": 0,
  //               "manager": "string",
  //               "managerPhone": "string",
  //               "name": "string",
  //               "precinctId": 0,
  //               "sort": 0,
  //               "type": 1
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
    if (!payload[i]){
      delete payload[i]
    }
  }
  return api.post('/group/list',payload)
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
  return api.post('/group/add', payload)
    .then(data => data)
    .catch(() => Promise.resolve({data: null}))
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
  return api.post('/group/edit', payload)
    .then(data => data)
    .catch(() => Promise.resolve({data: null}))
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
  return api.post(`/group/delete/`,payload)
}
export async function getTree (payload) {
  return api.post('/precinct/tree', payload)
}


