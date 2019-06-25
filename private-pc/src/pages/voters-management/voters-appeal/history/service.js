import api from '../../../../utils/api'

// 选民资格审查API
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "content": {
  //           "data": [
  //             {
  //               "appealDocumentId": 0,
  //               "auditer": "string",
  //               "id": 0,
  //               "idNum": "string",
  //               "phoneNum": "string",
  //               "remark": "string",
  //               "status": 0,
  //               "userName": "string",
  //               applyTime: 0,
  //               auditTime: 111111
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
  return api.post('/appeal/history',  payload )
}

export async function getDetail (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "appealDocumentId": 0,
  //           "auditer": "string",
  //           "id": 0,
  //           "idNum": "string",
  //           "phoneNum": "string",
  //           "remark": "string",
  //           "status": 0,
  //           "userName": "string",
  //           appealTime: 2222

  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.get(`/appeal/${payload.id}`)
}


