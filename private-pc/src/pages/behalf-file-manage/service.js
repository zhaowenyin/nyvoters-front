import api from '../../utils/api'
export async function getList (payload) {
  console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "data": [
  //             {
  //               "fileName": "文件名称",
  //               "id": 12345678,
  //               "module": 1,
  //               "type": 1,
  //               "uploadTime": 1552489000,
  //             }
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 20
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }

  //     })
  //   }, 500)
  // })
  return api.post('/doc/list', payload )
}
export async function getInfo (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "belongAreaId": 54122356874,
  //           "belongAreaName": "云阳镇第1选区",
  //           "countyName": "南召县",
  //           "day": 15,
  //           "list": [
  //             {
  //               "age": "30",
  //               "education": 1,
  //               "gender": 1,
  //               "idNum": 510810199910251100,
  //               "nation": "HAN",
  //               "party": 1,
  //               "post": "文职",
  //               "recommendPersonList": [
  //                 "string"
  //               ],
  //               "recommendedPerson": "张三",
  //               "status": "string",
  //               "workUnit": "成都市文化旅游局"
  //             },
  //             {
  //               "age": "20",
  //               "education": 1,
  //               "gender": 1,
  //               "idNum": 510810199910251100,
  //               "nation": "HAN",
  //               "party": 1,
  //               "post": "文职",
  //               "recommendPersonList": [
  //                 "string"
  //               ],
  //               "recommendedPerson": "张三",
  //               "status": "string",
  //               "workUnit": "成都市文化旅游局"
  //             },
  //             {
  //               "age": "100",
  //               "education": 1,
  //               "gender": 1,
  //               "idNum": 510810199910251100,
  //               "nation": "HAN",
  //               "party": 1,
  //               "post": "文职",
  //               "recommendPersonList": [
  //                 "string"
  //               ],
  //               "recommendedPerson": "张三",
  //               "status": "string",
  //               "workUnit": "成都市文化旅游局"
  //             }
  //           ],
  //           "month": 4,
  //           "sessionNum": "六",
  //           "year": 2019
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/repre-affairs/word/list', payload)
}
export async function getAnnouncement (payload) {
  return api.post('/repre-affairs/word1/get', payload)
}
export async function getOther (payload) {
  console.log(payload)
  return api.get('/doc/preview', {params:payload})
}


