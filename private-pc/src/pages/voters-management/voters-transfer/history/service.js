// import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "content": {
            "data": [
              {
                "auditStatus": 0,
                "auditTime": "2019-03-30T09:19:40.489Z",
                "auditer": "string",
                "candidateType": 0,
                "contactInformation": "string",
                "gender": 0,
                "householdRegistration": "string",
                "householdRegistrationDetail": "string",
                "id": 0,
                "idNum": "string",
                "living": "string",
                "livingDetail": "string",
                "name": "string",
                "nation": "string",
                "phoneNum": "string",
                "registrar": "string",
                "registrationTime": 1552489000,
                "registrationType": 0,
                "status": 0
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 20
          },
          "errorCode": "string",
          "errorMsg": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.get('/out/list', { params: payload })
}

export async function drawOut (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/group/delete', payload)
}



