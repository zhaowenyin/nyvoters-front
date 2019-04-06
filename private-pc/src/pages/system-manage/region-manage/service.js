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
                "id": 0,
                "level": 0,
                "name": "string",
                "parentId": ['zhinan'],
                code: '12233',
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
  // return api.get('/repre-recommend/list', { params: payload })
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
  // return api.post('/district/add', payload)
  // .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}

export async function modifySubmit (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
        }
      })
    }, 500)
  })
  // return api.post('/district/edit', payload)
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
  // return api.post('/district/delete', payload)
}
export async function getTree () {
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
  // return api.get('/district/tree')
}

