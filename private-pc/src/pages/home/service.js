import api from '../../utils/api'

// get请求
export async function getList (payload) {
  // console.log(123,payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "ageGraphs": [{
  //             value: 300,
  //             label: '35岁以下'
  //           },{
  //             value: 200,
  //             label: '36-55岁'
  //           },{
  //             value: 100,
  //             label: '56岁以上'
  //           }],
  //           "sexGraphs": [
  //             {
  //               "item": 0,
  //               "label": "男",
  //               "value": 200
  //             },
  //             {
  //               "item": 0,
  //               "label": "女",
  //               "value": 300
  //             }
  //           ],
  //           "candidateTypeGraphs": [{
  //             value: 300,
  //             label: '户籍地'
  //           },{
  //             value: 300,
  //             label: '现居地'
  //           },{
  //             value: 100,
  //             label: '单位'
  //           },{
  //             value: 100,
  //             label: '学校'
  //           },{
  //             value: 100,
  //             label: '其他'
  //           }],
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
  //           "peopleNum": 200,
  //           "regVotersNum": 150,
  //           "registerTypeGraphs": [{
  //             label: 300,
  //             name: '户籍地'
  //           },{
  //             label: 300,
  //             name: '现居地'
  //           },{
  //             label: 100,
  //             name: '单位'
  //           },{
  //             label: 100,
  //             name: '学校'
  //           },{
  //             label: 100,
  //             name: '其他'
  //           }],
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
  //               "precinctId": 1,
  //               "precinctName": "郑州",
  //               code: '410100000000',
  //               "peopleNum": 3000,
  //               "regRate": 0.5,
  //               "regVotersNum": 500,
  //               "votersNum": 1500
  //             },
  //             {
  //               "precinctId": 2,
  //               "precinctName": "开封",
  //               code: '410200000000',
  //               "peopleNum": 900,
  //               "regRate": 0.9,
  //               "regVotersNum": 100,
  //               "votersNum": 500
  //             },
  //             {
  //               "precinctId": 3,
  //               "precinctName": "洛阳",
  //               code: '410300000000',
  //               "peopleNum": 3000,
  //               "regRate": 0.5,
  //               "regVotersNum": 500,
  //               "votersNum": 1500
  //             },
  //             {
  //               "precinctId": 4,
  //               "precinctName": "平顶山",
  //               code: '410400000000',
  //               "peopleNum": 900,
  //               "regRate": 0.9,
  //               "regVotersNum": 100,
  //               "votersNum": 500
  //             }
  //           ],
  //           "votersNum": 66
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  if(payload.from&&payload.from==='login' || payload.accountRole>3 || payload.level>2) {
    return api.get(`/index/count/${payload.code}`)
  } else {
    return api.get(`/index/count/code/${payload.code}`)
  }

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

