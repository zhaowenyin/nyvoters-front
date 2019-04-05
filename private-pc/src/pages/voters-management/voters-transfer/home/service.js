// import api from '../../utils/api'

// get请求
export async function getList (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          "content": {
            "data": [
              {
                "applyTime": "2019-04-05T10:51:40.813Z",
                "fromPrecinctId": 0,
                "gender": 0,
                "id": 0,
                "idNum": "string",
                "name": "string",
                "phoneNum": "string",
                "status": 0,
                "toPrecinctId": 0,
                "transferReason": "string",
                "type": 0
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
  // return api.get('/committee/list', { params: payload })
}

export async function setSubmit (payload) {
  console.log(1,payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/committee/add', payload)
  // .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}

export async function modifySubmit (payload) {
  console.log(2,payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/committee/edit', payload)
  // .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}

export async function deletetTabel (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/committee/delete', payload)
}

