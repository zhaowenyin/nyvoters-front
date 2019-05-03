import api from '../../../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "content": {
            "data": [
              {
                "code": "string",
                "createTime": "2019-05-03T15:43:49.571Z",
                "createUserId": 0,
                "createUserName": "string",
                "district": "string",
                "districtId": 1.1,
                "id": 1,
                "level": 0,
                "manager": "string",
                "name": "string",
                "parentId": 1,
                "path": "string",
                "phoneName": "string",
                "sort": 0,
                "updateTime": "2019-05-03T15:43:49.571Z",
                "updateUserId": 0,
                "updateUserName": "string"
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 20
          },
          "errorCode": "string",
          "errorMsg": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/committee/list', payload)
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
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": [{
            "access": true,
            "children": [
              {
                "code": "string",
                "id": 1.1,
                "level": 0,
                "name": "一区1的机会接电话和等价交换的机会华鼎奖华鼎",
                "parentId": 0,
                "path": "string",
                "pnum": 0,
                "sort": 0
              }
            ],
            "code": "string",
            "distinct": "string",
            "distinctId": 0,
            "id": 2,
            "name": "一区",
            "pnum": 0,
            "sort": 0,
            "type": 0
          },
          {
            "access": true,
            "children": [
              {
                "code": "string",
                "id": 2.1,
                "level": 0,
                "name": "二区1",
                "parentId": 0,
                "path": "string",
                "pnum": 0,
                "sort": 0
              }
            ],
            "code": "string",
            "distinct": "string",
            "distinctId": 0,
            "id": 3,
            "name": "二区",
            "pnum": 0,
            "sort": 0,
            "type": 0
          }],
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/precinct/tree', payload)
}


