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
  //               "createTime": new Date,
  //               "createUserId": 0,
  //               "createUserName": "string",
  //               "docId": 0,
  //               "fileName": "string",
  //               "id": 0,
  //               "precinctId": 0,
  //               "precinctName": "string",
  //               "status": 0,
  //               "updateTime": new Date,
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
  for(let i in payload) {
    if(payload[i] === '') {
      delete payload[i]
    }
  }
  return api.post('/police/list',  payload )
}

export async function getcontrast (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/police/compare', payload)
}
