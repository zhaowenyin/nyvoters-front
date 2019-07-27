import { getTree } from './service'

export default {
  namespaced: true,
  state: {
    loading: false,
    list: [],
    total: 0,
    searchParam: {
      pageSize: 10,
      pageNum: 1
    },
    multipleSelection: [],
    treeList: [],
    belongAreaId: '',
    belongArea: ''
  },
  mutations: {
    clearState (state) {
      state.loading = false
      state.list = []
      state.total = 0
      state.searchParam = {
        pageSize: 20,
        pageNum: 1
      }
      state.multipleSelection = []
    },
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
    saveSelection(state, payload) {
      state.multipleSelection = payload
    },
    updateTreeList(state, payload) {
      state.treeList = [payload.data.content]
      state.belongAreaId = payload.data.content.id
      state.belongArea = payload.data.content.name
    },
    saveDistrictId(state, payload) {
      state.belongAreaId = payload
    },
    saveDistrictName(state, payload) {
      state.belongArea = payload
    },
  },
  actions: {
    async searchDistrictTree ({commit }, payload) {
      const { data } = await getTree({type: payload.type,id:payload.id})
      commit({
        type: 'updateTreeList',
        data
      })
    },
  }
}
