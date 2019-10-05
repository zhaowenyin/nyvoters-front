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
  //               "belongAreaId": 54122356874,
  //               "belongAreaName": "云阳镇第1选区",
  //               "birthDay": 605894400000,
  //               "gender": 1,
  //               "id": 0,
  //               "idNum": 510810199910251100,
  //               "phoneNum": 15898412568,
  //               "recommendType": 1,
  //               "recommendedPerson": "张三",
  //               "recommendedPersonId": 12345678,
  //               "status": "string",
  //               "type": 1
  //             }
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 0
  //         },
  //         "errorCode": "string",
  //         "errorMsg": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/qualification-review-record/list', payload )
}

export async function repealTabel (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/qualification-review-record/cancel', payload)
}

