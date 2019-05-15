import api from '../../../utils/api'

// get请求
export async function getList (payload) {
  // console.log(1,payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "actualRegisteredVoters": 800000,
  //           "adultFemalePopulation": 300000,
  //           "adultMalePopulation": 200000,
  //           "adultPopulation": 1000000,
  //           "femalePopulation": 500000,
  //           "foreignVoters": 40000,
  //           "localVoters": 40000,
  //           "malePopulation": 500000,
  //           "registeredFemaleVoters": 40000,
  //           "registeredMaleVoters": 40000,
  //           "totalPopulation": 1000000,
  //           "unregisteredNumber": 40000,
  //           "unregisteredNumbers": [
  //             {
  //               "item": 0,
  //               "label": "string",
  //               "value": 0
  //             }
  //           ]
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.get(`/report/${payload}`)
}
