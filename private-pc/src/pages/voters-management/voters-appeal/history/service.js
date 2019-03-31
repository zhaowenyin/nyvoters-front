// import api from '../../utils/api'

// 选民资格审查API
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "content": {
            "data": [
              {
                "appealDocumentId": 0,
                "auditer": "string",
                "id": 0,
                "idNum": "string",
                "phoneNum": "string",
                "remark": "string",
                "status": 0,
                "userName": "string"

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
  // return api.get('/transfer/list', { params: payload })
}

export async function throughTabel (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/transfer/audit', payload)
}


