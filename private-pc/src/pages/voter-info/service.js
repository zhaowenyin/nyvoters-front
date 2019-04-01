// import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data:{
          "code": "string",
          "content": {
            "data": [
              {
                "auditStatus": 1,
                "auditTime": "2019-03-17T10:22:02.382Z",
                "auditer": "string",
                "candidateType": 0,
                "contactInformation": "string",
                "gender": 1,
                "householdRegistration": "string",
                "id": 99,
                "idNum": "string",
                "living": "string",
                "name": "string",
                "phoneNum": "string",
                "registrar": "string",
                "registrationTime": 1552489000,
                "registrationType": 1,
                "status": 9,
                nation: 1,
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 20
          },
          "message": "string",
          "status": "string"
        }

      })
    }, 500)
  })
  // return api.get('/voters/list', { params: payload })
}

// post请求
export async function setSubmit (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/voters/add', payload)
}
export async function modifySubmit (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/district/edit', payload)
  // .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}
