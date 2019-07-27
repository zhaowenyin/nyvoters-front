import api from '../../../utils/api'
export async function getTree (payload) {
  return api.post('/district/tree', payload)
}
export async function getOther (payload) {
  console.log(payload)
  return api.get('/doc/preview', {params:payload})
}
