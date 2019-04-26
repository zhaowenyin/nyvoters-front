import api from '../../../utils/api'

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
  return api.post('/committee/tree', payload)
}
