import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(123,payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "code": "string",
          "content": {
            "ageGraphs": [
              {
                "item": 0,
                "label": "20-20岁",
                "value": 100
              },
              {
                "item": 0,
                "label": "40-50岁",
                "value": 200
              },
              {
                "item": 0,
                "label": "50岁以上",
                "value": 400
              }
            ],
            "sexGraphs": [
              {
                "item": 0,
                "label": "男",
                "value": 20
              },
              {
                "item": 0,
                "label": "女",
                "value": 30
              }
            ],
            "candidateTypeGraphs": [

              {
                "label": "二代证",
                "value": 1210
              },
              {
                "label": "社保卡",
                "value": 5600
              },
              {
                "label": "其他",
                "value": 5600
              }

            ],
            "idTypeGraphs": [
              {
                "label": "string",
                "value": 0
              },
              {
                "label": "string",
                "value": 12
              }
            ],
            "peopleNum": 60,
            "regVotersNum": 23,
            "registerTypeGraphs": [
              {
                "label": "单位",
                "value": 1210
              },
              {
                "label": "学校",
                "value": 5600
              },
              {
                "label": "登记站",
                "value": 5600
              },
              {
                "label": "其他",
                "value": 5600
              }
            ],
            "reviewFailGraphs": [
              {
                "label": "string",
                "value": 0
              }
            ],
            "verifyFailGraphs": [
              {
                "label": "string",
                "value": 0
              }
            ],
            "votersCounts": [
              {
                "districtId": 0,
                "precinctName": "选区一",
                "peopleNum": 3000,
                "regRate": 0.5,
                "regVotersNum": 500,
                "votersNum": 1500
              },
              {
                "districtId": 0,
                "precinctName": "选区二",
                "peopleNum": 900,
                "regRate": 0.9,
                "regVotersNum": 100,
                "votersNum": 500
              }
            ],
            "votersNum": 66
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })

  // return api.get(`/index/count/${payload}`)
}
export async function bindPhone (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {

  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/bindPhoneNum', payload)
}

