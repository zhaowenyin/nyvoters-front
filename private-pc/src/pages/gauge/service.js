import api from '../../utils/api'

// 创建量表模板
export async function createGaugeTemplate (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/api/v3/pcweb/gauges', payload)
}

// 获取标签列表
export async function getTagList () {
  return api.get('/api/v3/pcweb/gauges/questions/labels')
}

// 删除量表模板
export async function delGaugeTemplate (payload) {
  return api.delete(`/api/v3/pcweb/gauges/${payload.id}`)
}

// 编辑量表模板
export async function editGaugeTemplate (payload) {
  return api.put(`/api/v3/pcweb/gauges/${payload.id}`, payload.params)
}

// 根据量表ID获取量表内容
export async function getGaugeContentById (payload) {
  return api.get(`/api/v3/pcweb/gauges/${payload.id}`)
}

// 获取量表列表
export async function getGaugeList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         data: [{
  //           id: 1,
  //           create_time: 1549866819065,
  //           update_time: 1549866829078,
  //           name: '我叫量表名称'
  //         }],
  //         total_elements: 1
  //       }
  //     })
  // })
  return api.get('/api/v3/pcweb/gauges', {params: payload})
}

// 获取脚本列表
export async function getScript (payload) {
  return api.get('/api/v3/pcweb/gauges/scripts', {params: payload})
}

// 分页查询题库
export async function getQuestions (payload) {
  return api.get('/api/v3/pcweb/gauges/questions/library', {params: payload})
}

// 从题库删除题目
export async function deleteQuestion (payload) {
  return api.delete(`/api/v3/pcweb/gauges/questions/library/${payload.id}`)
}

// 保存至题库
export async function saveQuestion (payload) {
  return api.post('/api/v3/pcweb/gauges/questions/library', payload)
}

// 保存标签
export async function saveLabel (payload) {
  return api.post('/api/v3/pcweb/gauges/questions/labels', payload)
}

// 查询药品目录
export async function getMedicine () {
  return api.get('/api/v3/pcweb/gauges/questions/medicine/menu')
}

// 获取默认值列表
export async function getDefaultValue () {
  return api.get('/api/v3/pcweb/gauges/options/defaultvalues')
}

// 上传图片
export async function uploadImage (payload) {
  return api.post('/api/v3/doctorapp/sys/images', payload)
}

