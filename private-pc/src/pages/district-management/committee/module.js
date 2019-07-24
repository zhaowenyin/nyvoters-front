import { getTree } from './service'
import func from '../../../utils/func'

export default {
  namespaced: true,
  state: {
    belongAreaId: '',
    belongArea: '',
    treeList: [],
    belongItem: {}
  },
  mutations: {
    saveDistrictId(state, payload) {
      state.belongAreaId = payload
    },
    saveDistrictName(state, payload) {
      state.belongArea = payload
    },
    saveDistrictItem(state,payload) {
      state.belongItem = payload
    },
    updateTreeList(state, payload) {
      state.belongItem = func([payload.data.content])
      state.belongArea = state.belongItem.name
      state.belongAreaId = state.belongItem.id
      state.treeList = [payload.data.content]
    }
  },
  actions: {
    async searchTree ({ commit }, payload) {
      const { data } = await getTree({type: payload.type,id:''})
      commit({
        type: 'updateTreeList',
        data
      })
    },
  }
}
