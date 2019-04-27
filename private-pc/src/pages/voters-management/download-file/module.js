import { getTree } from './service'

export default {
  namespaced: true,
  state: {
    belongAreaId: '',
    belongArea: '',
    treeList: [],
  },
  mutations: {
    saveDistrictId(state, payload) {
      state.belongAreaId = payload
    },
    saveDistrictName(state, payload) {
      state.belongArea = payload
    },
    updateTreeList(state, payload) {
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
