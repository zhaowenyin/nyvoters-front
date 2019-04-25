import api from '../../utils/api'

// 登录
export async function login (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "powers": [
  //             0
  //           ],
  //           "token": "string",
  //           "userId": 0,
  //           "userName": "string"
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/login', payload)
}

// 退出
export async function logout () {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {}
  //     })
  //   }, 500)
  // })
  return api.post('/logout')
}
export async function getCode () {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "code": "string",
  //         "content": {
  //           "captcha": 'data:imagepng;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAiCAIAAABHmckwAAAC+ElEQVR42uXYP0jVURQHcHEKwbckFGJQLSoPXQwkGoKKqCH8swghhDSJgwktQbRWUBTh4NRguQvRkEI5CC1CLTbZEBRRSw3Coz+kBy4djuece+65v/fr9XpdDvLj9/u9hx+/597789e20yqj99uIcXXiVTsUHLTttNCwzYG9B7x54lxrg3nC/zrYY/6b4JmpC/8duPNNV4PNfNEqZu54ttT85p7Rp9ngJ1PLsuoxh64u3RwLGcwZYMpTTxYwlwX+8PGx02yBD09WZbaxzNG8WN0f+7WqZ26GkutWKWbK9oLZQHMMLJOPmVFLwTHzvY2TUHVGrZq94OTEZmuYYv50noGvtZ9mmxPL2ck+tLCtRu0Fjz2cNsy11zeMlrbMv8H0HJgNMGUz+UJlmJklWzWnwcxMwUafh7HHrIHl44cxmRkbzJJtzOoMMDUj2KaySRubwLlmORg7FnVxsCdY1NKcF4/Oq+Dlvi9QYT4XMyc7nEbtBQczo569/Muz/cTAgSqLXioc9cUjl9SoM8BIrU1/9oDlZJbnKQxClma88/ijwWLsUNktHbShsWEa22a1dcEcA0u8BAfzvtm37Gu7t+4n2VTuAtM2BjNdqP1gI2EnGM2U/f3WFefEzkiYTV22UEOtzI1DGbD568+dYPUSM8NPZEPChjn7SYvGq/6rBIUhB3aQSxuuZHRz9oP7D35lRdlgdrKzX+Ktry5BsectNsAsd116Bs1OMEXSMyFh7HCPueBbSwB7HrONB4/K1TUDTOcz1d550CH/BHTdSpob/ZoWdmM8BrMfjJ9CM25UbKG227s08N3B91lgJAU2Q+KxbGZpVnemmLnRYHWAOXS4HCqYmVVwzFxmS9djjrFjYLW3VTNjNxGYLmbSrN7sMbOomw4sozZCpmZ7zB4Yc4E3J+bU8y+7h7PMx979NIrdPHqqT0ZN2ezxI8ucThjMkp0LzhoBXGwNS5q9Lc3MpYD7h1ayzGsbFePbnOaMOWybXwz8+NPgpDk5Bmq3dwFcW5tmkxJX9wAAAABJRU5ErkJggg==',
  //           "captchaId": '4972411840256142901'
  //         },
  //         "message": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.get('/getcode')
}

