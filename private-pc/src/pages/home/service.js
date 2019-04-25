import api from '../../utils/api'

// get请求
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "candidateTypeGraphs": [

  //             {
  //               "label": "二代证",
  //               "value": 1210
  //             },
  //             {
  //               "label": "社保卡",
  //               "value": 5600
  //             },
  //             {
  //               "label": "其他",
  //               "value": 5600
  //             }

  //           ],
  //           "idTypeGraphs": [
  //             {
  //               "label": "string",
  //               "value": 0
  //             },
  //             {
  //               "label": "string",
  //               "value": 12
  //             }
  //           ],
  //           "peopleNum": 0,
  //           "regVotersNum": 0,
  //           "registerTypeGraphs": [
  //             {
  //               "label": "单位",
  //               "value": 1210
  //             },
  //             {
  //               "label": "学校",
  //               "value": 5600
  //             },
  //             {
  //               "label": "登记站",
  //               "value": 5600
  //             },
  //             {
  //               "label": "其他",
  //               "value": 5600
  //             }
  //           ],
  //           "reviewFailGraphs": [
  //             {
  //               "label": "string",
  //               "value": 0
  //             }
  //           ],
  //           "verifyFailGraphs": [
  //             {
  //               "label": "string",
  //               "value": 0
  //             }
  //           ],
  //           "votersCounts": [
  //             {
  //               "districtId": 0,
  //               "districtName": "选区一",
  //               "peopleNum": 3000,
  //               "regRate": 0.5,
  //               "regVotersNum": 500,
  //               "votersNum": 1500
  //             },
  //             {
  //               "districtId": 0,
  //               "districtName": "选区二",
  //               "peopleNum": 900,
  //               "regRate": 0.9,
  //               "regVotersNum": 100,
  //               "votersNum": 500
  //             }
  //           ],
  //           "votersNum": 0
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.get('/index/count', { params: payload })
}
export async function bindPhone (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {

        }
      })
    }, 500)
  })
  // return api.get('/bindPhoneNum, { params: payload })
}

