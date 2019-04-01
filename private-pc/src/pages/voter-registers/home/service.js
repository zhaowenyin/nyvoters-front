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
                "details": [
                  {
                    id: ''
                  },
                  {
                    "failNum": 0,
                    "id": 0,
                    "importTime": 9999,
                    "num": 0,
                    "operater": "string",
                    "processSate": 0,
                    "registrationType": 0,
                    "successNum": 0,
                    "type": 0
                  },
                  {
                    "failNum": 0,
                    "id": 1,
                    "importTime": 9999,
                    "num": 0,
                    "operater": "string",
                    "processSate": 0,
                    "registrationType": 0,
                    "successNum": 0,
                    "type": 0
                  }
                ],
                "failNum": 0,
                "num": 0,
                "processSate": 0,
                "successNum": 0
              },
              {
                "details": [
                  {
                    id: ''
                  },
                  {
                    "failNum": 0,
                    "id": 1,
                    "importTime": 9999,
                    "num": 0,
                    "operater": "string",
                    "processSate": 0,
                    "registrationType": 0,
                    "successNum": 0,
                    "type": 0
                  }
                ],
                "failNum": 0,
                "num": 0,
                "processSate": 0,
                "successNum": 0
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 0
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.get('/repre-recommend/list', { params: payload })
}

// 代表推荐登记修改
export async function getProcessSate(payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": {
            "failNum": 10,
            "id": 0,
            "importTime": "2019-03-31T13:20:36.880Z",
            "num": 0,
            "operater": "string",
            "processSate": 2,
            "registrationType": 0,
            "successNum": 200,
            "type": 0
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/repre-recommend/register', payload)
  // .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}

