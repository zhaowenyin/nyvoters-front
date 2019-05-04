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
  //               "createTime": "2019-05-03T15:43:49.571Z",
  //               "createUserId": 0,
  //               "createUserName": "string",
  //               "district": "string",
  //               "districtId": 1.1,
  //               "id": 1,
  //               "level": 0,
  //               "manager": "string",
  //               "name": "string",
  //               "parentId": 1,
  //               "path": "string",
  //               "phoneName": "string",
  //               "sort": 0,
  //               "updateTime": "2019-05-03T15:43:49.571Z",
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
  return api.post('/committee/list', payload)
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
  return api.post('/committee/add', payload)
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
  return api.post('/committee/edit', payload)
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
  return api.post('/committee/delete', payload)
}
export async function getTree (payload) {
  return api.post('/district/tree', payload)
}


