// import api from '../../../utils/api'
export async function getNews (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data:
        {
          "code": "string",
          "content": {
            "data": [
              {
                "createTime": "555689600000",
                "id": 1,
                "isRead": 0,
                "messageContent": "您有新的选民转移申请，请及时处理！",
                "messageParams": "string",
                "messageType": "选民转移申请处理",
                "readTime": "555689600000",
                "receiver": 0,
                "sender": 0
              },
              {
                "createTime": "555689600000",
                "id": 2,
                "isRead": 0,
                "messageContent": "您发起的【张一】转移申请已被【云阳镇第3选区】 处理",
                "messageParams": "string",
                "messageType": "选民转移申请处理结果通知",
                "readTime": "555689600000",
                "receiver": 0,
                "sender": 0
              },
              {
                "createTime": "555689600000",
                "id": 3,
                "isRead": 0,
                "messageContent": "您发起的【张一】转移申请已被【云阳镇第3选区】 处理",
                "messageParams": "string",
                "messageType": "选民申诉处理",
                "readTime": "555689600000",
                "receiver": 0,
                "sender": 0
              }
            ],
            "endRow": 0,
            "pageNum": 0,
            "pageSize": 0,
            "pages": 0,
            "startRow": 0,
            "total": 30
          },
          "message": "string",
          "status": "string"
        }
      })
    }, 500)
  })
  // return api.post('/message/list, payload)
}
