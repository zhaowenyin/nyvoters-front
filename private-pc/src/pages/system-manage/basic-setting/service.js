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
                "belongAreaId": 54122356874,
                "birthDay": "1995-01-01 00:00:00",
                "education": "本科",
                "gender": 1,
                "id": 0,
                "idNum": 510810199910251100,
                "jobTitle": "中级会计",
                "nation": "汉",
                "party": "中共党员",
                "phoneNum": 15898412568,
                "post": "职员",
                "recommendPersonVOList": [
                  {
                    "recommendPersonName": "张三",
                    "recommendPersonPhone": 15898741563,
                    "recommendPersonWorkUnit": "中共成都市委"
                  }
                ],
                "recommendReason": "哎哟，不错哟",
                "recommendType": 1,
                "recommendUnit": "成都市文化旅游局",
                "recommendedPerson": "张三",
                "status": "string",
                "type": 1,
                "workUnit": "成都市文化旅游局"
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 0
          },
          "errorCode": "string",
          "errorMsg": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.get('/api', { params: payload })
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
  // return api.post('/sys-config/save', payload)
}
