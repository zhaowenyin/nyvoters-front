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
                "code": "string",
                "id": 0,
                "manager": "string",
                "name": "string",
                "parentId": 0,
                "path": "string",
                "phoneName": "string",
                "precinct": "string",
                "precinctId": 0,
                "sort": 0
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
export async function getTree (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [{
          id: '1',
          name: '一级 1',
          access: false,
          children: [{
            id: '1_1',
            name: '二级 1-1',
            access: true,
            children: [{
              id: '1_1_1',
              name: '三级 1-1-1',
              access: true,
            }]
          }]
        }, {
          id: '2',
          name: '一级 2',
          children: []
        }]
      })
    }, 500)
  })
}
