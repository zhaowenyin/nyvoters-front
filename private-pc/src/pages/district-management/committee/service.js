import api from '../../../utils/api'

export async function getTree (payload) {
  return api.post('/committee/tree', payload)
}

