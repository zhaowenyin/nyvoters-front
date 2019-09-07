import api from '../../../utils/api'
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         "content": {
  //           "data": [
  //             {
  //               id: 1,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 1,
  //               status:'PRELIMINARY_CANDIDATE',
  //               fileName: '选举委员会关于选民名单公告（1）',
  //               isFillData: 1,
  //             },
  //             {
  //               id: 2,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 2,
  //               status:'PRELIMINARY_CANDIDATE',
  //               fileName: '选举委员会关于选民名单公告（2)',
  //               isFillData: 1,
  //             },
  //             {
  //               id: 3,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 3,
  //               status:'FORMAL_CANDIDATE',
  //               fileName: '选举委员会关于选民名单补正公告（1）',
  //               isFillData: 1,
  //             },
  //             {
  //               id: 4,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 4,
  //               status:"FORMAL_CANDIDATE",
  //               fileName: '选举委员会关于选民名单补正公告（2）',
  //               isFillData: 1,
  //             },
  //             {
  //               id: 5,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 5,
  //               status:"FORMAL_REPRESENTATIVE",
  //               fileName: '选举委员会关于选举日及选举登记时间的公告',
  //               isFillData: 1,
  //             },
  //             {
  //               id: 6,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 6,
  //               status:"FORMAL_REPRESENTATIVE",
  //               fileName: '选民证（1)',
  //               isFillData: 1,
  //             },
  //             {
  //               id: 7,
  //               module: 1,
  //               fileSuffix: "docx",
  //               type: 7,
  //               status:"FORMAL_REPRESENTATIVE",
  //               fileName: '选民证（2)',
  //               isFillData: 1,
  //             },
  //           ],
  //           "endRow": 0,
  //           "pageNum": 0,
  //           "pageSize": 0,
  //           "pages": 0,
  //           "startRow": 0,
  //           "total": 20
  //         },
  //         "errorCode": "string",
  //         "errorMsg": "string",
  //         "status": "string"
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/doc/list', payload )
}
export async function getInfo (payload) {
  console.log(11,payload)
  // return new Promise((resolve) => {
  // setTimeout(() => {
  //   resolve({
  //     data: {
  // "addVoters": [
  //   "string",
  //   "小明",
  //   "小黄"
  // ],
  // "cutOutVoters": [
  //   "string",
  //   "小明",
  //   "小黄"
  // ],
  // "date": 1561132800000,
  // "dieVoters": [
  //   "string",
  //   "小明",
  //   "小黄"
  // ],
  // "disempowerVoters": [
  //   "string",
  //   "小明",
  //   "小黄"
  // ],
  // "districtName": "南阳县",
  // "precinctName": "选区",
  // "regNum": 0,
  // "regionDistrictName": "string",
  // "voterNum": 0
  //
  //         "date": 1561132800000,
  //         "districtName": "南阳县",
  //         "regEndDate": 1561132800000,
  //         "regStartDate": 1561132800000,
  //         "voterDate": 1561132800000,
  //         precinctName: '选区',
  //         list: [1,2,3]

  //       }
  //     })
  //   }, 500)
  // })
  if(+payload.type === 5) {
    return api.get('/voter/files/preview/voterDate', {params:{belongAreaId: payload.belongAreaId}})
  } else if(+payload.type === 3 || +payload.type === 4) {
    return api.get('/voter/files/preview/voterCorrectionNotice', {params:{belongAreaId: payload.belongAreaId}})
  } else if(+payload.type === 6 || +payload.type === 7) {
    return api.get('/voter/files/preview/voterCertificate', {params:{belongAreaId: payload.belongAreaId,radio:  payload.radio || 1}})
  } else if(+payload.type === 1) {
    return api.get('/voter/files/preview/voterList', {params:{belongAreaId: payload.belongAreaId}})
  }

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
  if(+payload.type === 1) {
    return api.post('/committee/tree', {...payload.val,maxLevel:2})
  } else {
    return api.post('/precinct/tree', {...payload.val})
  }
}
export async function getOther (payload) {
  console.log(payload)
  return api.get('/doc/preview', {params:payload})
}
