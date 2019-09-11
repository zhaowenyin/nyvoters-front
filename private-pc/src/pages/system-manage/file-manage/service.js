import api from '../../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "data": [
  //             {
  //               "fileName": "文件名称",
  //               "id": 12345678,
  //               "module": 1,
  //               "type": 1,
  //               "uploadTime": 1552489000,
  //             }
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 20
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }

  //     })
  //   }, 500)
  // })
  return api.post('/doc/list', payload)
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
  return api.post('/doc/delete/', payload)
}
// 修改
export async function modifySubmit (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/doc/modify/', payload)
}
// 修改
export async function setSubmit (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/doc/upload/', payload)
}
export async function modifyFile (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  let paramStr = ''
  for (const k in payload) {
    if (payload[k] !== undefined &&
      payload[k] !== null &&
      payload[k] !== '') {
      paramStr += `&${k}=${encodeURI(payload[k])}`
    }
  }
  return api.post(`/doc/modify/?${paramStr}`)
}

