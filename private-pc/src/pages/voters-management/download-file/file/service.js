import api from '../../../utils/api'
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
                name: '选举委员会关于选民名单公告（1）'
              },
              {
                id: 2,
                type: 2,
                status:'PRELIMINARY_CANDIDATE',
                name: '选举委员会关于选民名单公告（2)'
              },
              {
                id: 3,
                type: 3,
                status:'FORMAL_CANDIDATE',
                name: '选举委员会关于选民名单补正公告（1）'
              },
              {
                id: 4,
                type: 4,
                status:"FORMAL_CANDIDATE",
                name: '选举委员会关于选民名单补正公告（2）'
              },
              {
                id: 5,
                type: 5,
                status:"FORMAL_REPRESENTATIVE",
                name: '选举委员会关于选举日及选举登记时间的公告'
              },
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

export async function getTree (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": [{
  //           "access": true,
  //           "children": [
  //             {
  //               "code": "string",
  //               "id": 1.1,
  //               "level": 0,
  //               "name": "一区1的机会接电话和等价交换的机会华鼎奖华鼎",
  //               "parentId": 0,
  //               "path": "string",
  //               "pnum": 0,
  //               "sort": 0
  //             }
  //           ],
  //           "code": "string",
  //           "distinct": "string",
  //           "distinctId": 0,
  //           "id": 2,
  //           "name": "一区",
  //           "pnum": 0,
  //           "sort": 0,
  //           "type": 0
  //         },
  //         {
  //           "access": true,
  //           "children": [
  //             {
  //               "code": "string",
  //               "id": 2.1,
  //               "level": 0,
  //               "name": "二区1",
  //               "parentId": 0,
  //               "path": "string",
  //               "pnum": 0,
  //               "sort": 0
  //             }
  //           ],
  //           "code": "string",
  //           "distinct": "string",
  //           "distinctId": 0,
  //           "id": 3,
  //           "name": "二区",
  //           "pnum": 0,
  //           "sort": 0,
  //           "type": 0
  //         }],
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/committee/tree', payload)
}
export async function getTree (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": [{
  //           "access": true,
  //           "children": [
  //             {
  //               "code": "string",
  //               "id": 1.1,
  //               "level": 0,
  //               "name": "一区1的机会接电话和等价交换的机会华鼎奖华鼎",
  //               "parentId": 0,
  //               "path": "string",
  //               "pnum": 0,
  //               "sort": 0
  //             }
  //           ],
  //           "code": "string",
  //           "distinct": "string",
  //           "distinctId": 0,
  //           "id": 2,
  //           "name": "一区",
  //           "pnum": 0,
  //           "sort": 0,
  //           "type": 0
  //         },
  //         {
  //           "access": true,
  //           "children": [
  //             {
  //               "code": "string",
  //               "id": 2.1,
  //               "level": 0,
  //               "name": "二区1",
  //               "parentId": 0,
  //               "path": "string",
  //               "pnum": 0,
  //               "sort": 0
  //             }
  //           ],
  //           "code": "string",
  //           "distinct": "string",
  //           "distinctId": 0,
  //           "id": 3,
  //           "name": "二区",
  //           "pnum": 0,
  //           "sort": 0,
  //           "type": 0
  //         }],
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/committee/tree', payload)
}
