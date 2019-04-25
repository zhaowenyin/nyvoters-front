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
                name: '县人大代表名额分配的决定'
              },
              {
                id: 2,
                name: '乡（镇）人大代表名额分配的决定'
              },
              {
                id: 3,
                name: '县级人大代表名额分配的通知'
              },
              {
                id: 4,
                name: '乡（镇）选区划分及代表名额分配的通知'
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
export async function getInfo () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          a: '南阳',
          b: '第一',
          c: '阳阳',
          list: [
            { name: '花湖',
              gender: 30,
              age: 25,
              nation: '汉',
              job: '普通科员',
              recommendedPerson: '飞飞'

            },
            { name: '花湖',
              gender: 30,
              age: 25,
              nation: '汉',
              job: '普通科员',
              recommendedPerson: '飞飞'

            },
            { name: '花湖',
              gender: 30,
              age: 25,
              nation: '汉',
              job: '普通科员',
              recommendedPerson: '飞飞'

            }
          ]
        }
      })
    }, 500)
  })
  // return api.post('/logout')
}

