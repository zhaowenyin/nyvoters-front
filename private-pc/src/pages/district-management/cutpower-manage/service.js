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
  //               "contactInformation": "string",
  //               "endTime":  1552489000,
  //               "gender": true,
  //               "householdRegistration": "string",
  //               "id": 0,
  //               "idNum": "string",
  //               "living": "string",
  //               "name": "string",
  //               "nation": "string",
  //               "phoneNum": "string",
  //               "startTime":  1552489000

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
  return api.post('/disempower/list', payload )
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
  return api.post('/disempower/add', payload)
    .then(data => data)
    .catch(() => Promise.resolve({data: null}))
}



