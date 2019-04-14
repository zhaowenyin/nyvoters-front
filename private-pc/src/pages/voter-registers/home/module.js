import { getList } from './service'

export default {
  namespaced: true,
  state: {
    loading: false,
    list: [],
    total: 0,
    searchParam: {
      size: 10,
      page: 1
    },
    multipleSelection: []
  },
  mutations: {
    clearState (state) {
      state.loading = false
      state.list = []
      state.total = 0
      state.searchParam = {
        size: 10,
        page: 1
      }
      state.multipleSelection = []
    },
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
    updateList (state, payload) {
      const { data = [], total = 0 } = payload.data
      state.list = data.map(i => {
        i.lastFailNum = i.details[i.details.length-1].failNum>0
        i.lastId = i.details[i.details.length-1].id
        i.lastProcessSate = i.details[i.details.length-1].processSate
        return i
      })
      state.total = total
    },
    updataSearchParam (state, payload) {
      state.searchParam = { ...state.searchParam, ...payload.payload }
    },
    saveSelection(state, payload) {
      state.multipleSelection = payload
    },
  },
  actions: {
    async getListData ({ commit, state }, payload) {
      commit({
        type: 'showLoading'
      })
      const { data } = await getList({ ...state.searchParam, ...payload })
      commit({
        type: 'updataSearchParam',
        payload
      })
      commit({
        type: 'updateList',
        data: data.content
      })
      commit({
        type: 'hideLoading'
      })
    }
  }
}
