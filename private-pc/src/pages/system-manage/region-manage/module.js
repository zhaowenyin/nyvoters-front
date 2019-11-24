import { getList,getTree } from './service'
import func from '../../../utils/func'

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
    belongArea: '',
    level: '',
    belongAreaItem: {}
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
      state.belongAreaId = ''
      state.belongArea = ''
      state.level = ''
      state.belongAreaItem = {}
    },
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
    updateList (state, payload) {
      const { data = [], total = 0 } = payload.data
      state.list = data
      state.total = total
    },
    updataSearchParam (state, payload) {
      state.searchParam = { ...state.searchParam, ...payload.payload }
    },
    saveSelection(state, payload) {
      state.multipleSelection = payload
    },
    updateTreeList(state, payload) {
      state.belongAreaItem = func([payload.data.content])
      state.belongAreaId = state.belongAreaItem.id
      state.belongArea = state.belongAreaItem.name
      state.level = state.belongAreaItem.level
      state.treeList = [payload.data.content]
    },
    saveDistrictId(state, payload) {
      state.belongAreaId = payload
    },
    saveDistrictName(state, payload) {
      state.belongArea = payload
    },
    saveLevel(state, payload) {
      state.level = payload
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
    },
    async searchDistrictTree ({commit }, payload) {
      const { data } = await getTree({type: payload.type,id:payload.id})
      commit({
        type: 'updateTreeList',
        data
      })
    },
  }
}
