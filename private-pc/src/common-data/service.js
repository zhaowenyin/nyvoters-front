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
export async function getNation (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": [
            {
              "desc": "汉",
              "intCode": 1,
              "stringCode": "string"
            }
          ],
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/enum-mapping/nation, payload)
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
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          news: [
            {
              a: '选民转移申请处理',
              b: 555689600000,
              c: '您有新的选民转移申请，请及时处理！',
              id: '1',
              type: 1
            },
            {
              a: '选民转移申请处理结果通知',
              b: 555689600000,
              c: '您发起的【张一】转移申请已被【云阳镇第3选区】 处理',
              id: '2',
              type: 2
            },
            {
              a: '选民申诉处理',
              b: 555689600000,
              c: '您有新的选民申诉待处理',
              id: '3',
              type: 3
            }
          ]
        }
      })
    }, 500)
  })
  // return api.post('/enum-mapping/nation, payload)
}
