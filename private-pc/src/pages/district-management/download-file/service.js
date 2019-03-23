// import api from '../../../utils/api'
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "content": {
            "data": [
              {
                id: 1,
                name: '县人大代表名额分配的决定'
              },
              {
                id: 2,
                name: '乡（镇）人大代表名额分配的决定'
              },
              {
                id: 3,
                name: '县级人大代表名额分配的通知'
              },
              {
                id: 4,
                name: '乡（镇）选区划分及代表名额分配的通知'
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
  // return api.get('/disempower/list', { params: payload })
}
