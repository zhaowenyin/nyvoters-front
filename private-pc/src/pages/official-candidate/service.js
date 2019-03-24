// import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data:{
          "code": "string",
          "content": {
            "data": [
              {
                "belongAreaId": 54122356874,
                "belongAreaName": "云阳镇第1选区",
                "birthDay": 605894400000,
                "gender": 1,
                "id": 0,
                "idNum": 510810199910251100,
                "phoneNum": 15898412568,
                "recommendType": 1,
                "recommendedPerson": "张三",
                "recommendedPersonId": 12345678,
                "status": "string",
                "type": 1
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 20
          },
          "message": "string",
          "status": "string"
        }

      })
    }, 500)
  })
  // return api.get('/common/list', { params: payload })
}

export async function repeal (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/formal-candidate/cancel', payload)
}
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
  // return api.post('/formal-candidate/add', payload)
}
export async function getCandidate (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          content: [{
            name: '李佳怡',
            precinctId: '1',
            precinct: '云阳镇第1选区'
          },
          {
            name: '李佳怡',
            precinctId: '2',
            precinct: '云阳镇第1选区'
          },
          {
            name: '李佳怡',
            precinctId: '3',
            precinct: '云阳镇第1选区'
          },
          {
            name: '李佳怡',
            precinctId: '4',
            precinct: '云阳镇第1选区'
          },
          {
            name: '李佳怡',
            precinctId: '5',
            precinct: '云阳镇第1选区'
          },
          {
            name: '李佳怡',
            precinctId: '6',
            precinct: '云阳镇第1选区'
          },
          {
            name: '李佳怡',
            precinctId: '7',
            precinct: '云阳镇第1选区'
          }]

        }
      })
    }, 500)
  })
  // return api.post('/', payload)
}


