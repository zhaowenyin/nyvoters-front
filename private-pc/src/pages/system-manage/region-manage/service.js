import api from '../../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "content": {
  //           "data": [
  //             {
  //               "id": 0,
  //               "level": 0,
  //               "name": "string",
  //               "parentId": '1',
  //               code: '12233',
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
  return api.post('/district/list',  payload)
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
  return api.post('/district/add', payload)
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
  return api.post('/district/edit', payload)
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
  return api.get(`/district/delete/${payload.id}`)
}
export async function getTree (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": [{
  //           "access": true,
  //           "children": [
  //             {
  //               "code": "string",
  //               "id": 1.1,
  //               "level": 0,
  //               "name": "一区1的机会接电话和等价交换的机会华鼎奖华鼎",
  //               "parentId": 0,
  //               "path": "string",
  //               "pnum": 0,
  //               "sort": 0
  //             }
  //           ],
  //           "code": "string",
  //           "distinct": "string",
  //           "distinctId": 0,
  //           "id": 2,
  //           "name": "一区",
  //           "pnum": 0,
  //           "sort": 0,
  //           "type": 0
  //         },
  //         {
  //           "access": true,
  //           "children": [
  //             {
  //               "code": "string",
  //               "id": 2.1,
  //               "level": 0,
  //               "name": "二区1",
  //               "parentId": 0,
  //               "path": "string",
  //               "pnum": 0,
  //               "sort": 0
  //             }
  //           ],
  //           "code": "string",
  //           "distinct": "string",
  //           "distinctId": 0,
  //           "id": 3,
  //           "name": "二区",
  //           "pnum": 0,
  //           "sort": 0,
  //           "type": 0
  //         }],
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/precinct/tree', payload)
}
