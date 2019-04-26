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
                type: 1,
                status:'PRELIMINARY_CANDIDATE',
                name: '选举委员会关于初步代表候选人名单公告(1)'
              },
              {
                id: 2,
                type: 2,
                status:'PRELIMINARY_CANDIDATE',
                name: '选举委员会关于初步代表候选人名单公告(2)'
              },
              {
                id: 3,
                type: 3,
                status:'FORMAL_CANDIDATE',
                name: '选举委员会关于正式代表候选人名单公告(1)'
              },
              {
                id: 4,
                type: 4,
                status:"FORMAL_CANDIDATE",
                name: '选举委员会关于正式代表候选人名单公告(2)'
              },
              {
                id: 5,
                type: 5,
                status:"FORMAL_REPRESENTATIVE",
                name: '选举委员会关于代表当选公告'
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
export async function getInfo (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": {
            "belongAreaId": 54122356874,
            "belongAreaName": "云阳镇第1选区",
            "countyName": "南召县",
            "day": 15,
            "list": [
              {
                "age": "30",
                "education": 1,
                "gender": 1,
                "idNum": 510810199910251100,
                "nation": "HAN",
                "party": 1,
                "post": "文职",
                "recommendPersonList": [
                  "string"
                ],
                "recommendedPerson": "张三",
                "status": "string",
                "workUnit": "成都市文化旅游局"
              },
              {
                "age": "20",
                "education": 1,
                "gender": 1,
                "idNum": 510810199910251100,
                "nation": "HAN",
                "party": 1,
                "post": "文职",
                "recommendPersonList": [
                  "string"
                ],
                "recommendedPerson": "张三",
                "status": "string",
                "workUnit": "成都市文化旅游局"
              },
              {
                "age": "100",
                "education": 1,
                "gender": 1,
                "idNum": 510810199910251100,
                "nation": "HAN",
                "party": 1,
                "post": "文职",
                "recommendPersonList": [
                  "string"
                ],
                "recommendedPerson": "张三",
                "status": "string",
                "workUnit": "成都市文化旅游局"
              }
            ],
            "month": 4,
            "sessionNum": "六",
            "year": 2019
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/repre-affairs/word/list', payload)
}

