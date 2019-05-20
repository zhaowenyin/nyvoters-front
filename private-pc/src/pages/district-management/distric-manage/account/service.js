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
  //               "account": "string",
  //               "accountRole": 0,
  //               "accountType": 0,
  //               "committeeId": 0,
  //               "contactInformation": "string",
  //               "createTime": "2019-04-10T13:56:12.776Z",
  //               "createUserId": 0,
  //               "createUserName": "string",
  //               "id": 0,
  //               "name": "string",
  //               "password": "string",
  //               "phoneNum": '18788888888',
  //               "precinctId": 0,
  //               "sort": 0,
  //               "status": 0,
  //               "telephone": "string",
  //               "updateTime": "2019-04-10T13:56:12.776Z",
  //               "updateUserId": 0,
  //               "updateUserName": "string"
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
  return api.post('/user/list', payload)
}

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
  return api.post('/user/precinct/add', payload)
    .then(data => data)
    .catch(() => Promise.resolve({data: null}))
}

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
  return api.post('/user/precinct/edit', payload)
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
  return api.get(`/user/delete/${payload}`, payload)
}
export async function resetPassword (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/resetPassword', payload)
}

export async function getTree (payload) {

  return api.post('/precinct/tree', payload)
}
