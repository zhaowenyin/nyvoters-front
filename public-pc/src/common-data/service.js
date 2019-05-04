import api from '../utils/api'

// 民族
export async function getNation (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": [
  //           {
  //             "desc": "汉",
  //             "intCode": 1,
  //             "stringCode": "string"
  //           }
  //         ],
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/enum-mapping/nation', payload)
}
