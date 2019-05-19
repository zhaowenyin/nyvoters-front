import api from '../../utils/api'

// get请求
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data:{
  //         "code": "string",
  //         "content": {
  //           "data": [
  //             {
  //               "belongAreaId": 54122356874,
  //               "belongAreaName": "云阳镇第1选区",
  //               "birthDay": 605894400000,
  //               "gender": 1,
  //               "id": 1,
  //               "idNum": 510810199910251100,
  //               "phoneNum": 15898412568,
  //               "recommendType": 1,
  //               "recommendedPerson": "张三",
  //               "recommendedPersonId": 12345678,
  //               "status": "PRELIMINARY_CANDIDATE",
  //               "type": 1
  //             },
  //             {
  //               "belongAreaId": 54122356874,
  //               "belongAreaName": "云阳镇第2选区",
  //               "birthDay": 605894400000,
  //               "gender": 1,
  //               "id": 2,
  //               "idNum": 510810199910251100,
  //               "phoneNum": 15898412568,
  //               "recommendType": 1,
  //               "recommendedPerson": "张三",
  //               "recommendedPersonId": 12345678,
  //               "status": "PRELIMINARY_CANDIDATE",
  //               "type": 1
  //             }
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 20
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }

  //     })
  //   }, 500)
  // })
  return api.post('/common/list',  payload )
}

export async function repeal (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/preliminary-candidate/cancel', payload)
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
  return api.post('/preliminary-candidate/add', payload)
}


