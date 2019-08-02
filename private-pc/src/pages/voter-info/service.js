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
  //               "auditStatus": 1,
  //               "auditTime": "2019-03-17T10:22:02.382Z",
  //               "auditer": "string",
  //               "candidateType": 0,
  //               "contactInformation": "string",
  //               "gender": 1,
  //               "householdRegistration": "string",
  //               "id": 99,
  //               "idNum": "string",
  //               "living": "string",
  //               "name": "string",
  //               "phoneNum": "string",
  //               "registrar": "string",
  //               "registrationTime": 1552489000,
  //               "registrationType": 1,
  //               "status": 9,
  //               nation: 1,
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
  return api.post('/register/list', payload )
}

