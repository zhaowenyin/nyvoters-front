import { getTree } from './service'

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
      state.treeList = [payload.data.content]
      state.belongArea = payload.data.content.name
      state.belongAreaId = payload.data.content.id
      state.belongItem = payload.data.content
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
