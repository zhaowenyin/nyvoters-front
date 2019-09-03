import api from '../../../utils/api'

// get请求
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "data": [
  //             {
  //               "auditStatus": 0,
  //               "auditTime": "2019-04-05T10:14:15.886Z",
  //               "auditer": "string",
  //               "candidateType": 0,
  //               "contactInformation": "string",
  //               "gender": 1,
  //               "householdRegistration": "string",
  //               "householdRegistrationDetail": "string",
  //               "id": 0,
  //               "idNum": "string",
  //               "living": "string",
  //               "livingDetail": "string",
  //               "name": "string",
  //               "nation": "string",
  //               "phoneNum": "string",
  //               "registrar": "string",
  //               "registrationTime": "2019-04-05T10:14:15.892Z",
  //               "registrationType": 0,
  //               "status": 0
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
  for(let i in payload) {
    if(payload[i] === '') {
      delete payload[i]
    }
  }
  return api.post('/import/data/list', payload )
}


