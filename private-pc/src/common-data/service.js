import api from '../utils/api'

// 获取用户信息
export async function getUserInfo () {
  return {
    data: {
      name: 'admin'
    }
  }
  // return api.get('/api/v3/pcweb/users/me')
}
// 民族
export async function getNation () {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": [
  //           {
  //             "desc": "汉",
  //             "intCode": 1,
  //             "stringCode": "string"
  //           }
  //         ],
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/enum-mapping/nation')
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
export async function getNews (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data:
  //       {
  //         "code": "string",
  //         "content": {
  //           "data": [
  //             {
  //               "createTime": "555689600000",
  //               "id": 1,
  //               "isRead": 0,
  //               "messageContent": "您有新的选民转移申请，请及时处理！",
  //               "messageParams": "string",
  //               "messageType": "选民转移申请处理",
  //               "readTime": "555689600000",
  //               "receiver": 0,
  //               "sender": 0
  //             },
  //             {
  //               "createTime": "555689600000",
  //               "id": 2,
  //               "isRead": 0,
  //               "messageContent": "您发起的【张一】转移申请已被【云阳镇第3选区】 处理",
  //               "messageParams": "string",
  //               "messageType": "选民转移申请处理结果通知",
  //               "readTime": "555689600000",
  //               "receiver": 0,
  //               "sender": 0
  //             },
  //             {
  //               "createTime": "555689600000",
  //               "id": 3,
  //               "isRead": 0,
  //               "messageContent": "您发起的【张一】转移申请已被【云阳镇第3选区】 处理",
  //               "messageParams": "string",
  //               "messageType": "选民申诉处理",
  //               "readTime": "555689600000",
  //               "receiver": 0,
  //               "sender": 0
  //             }
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 0
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/message/list', payload)
}
export async function setRead (payload) {
  return api.post('/message/read', payload)
}

