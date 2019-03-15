// import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": {
            "data": [
              {
                "details": "string",
                "module": "string",
                "opTime": 1549382400000,
                "operate": "string",
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
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.get('/log/list', { params: payload })
}


