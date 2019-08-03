import { getTree } from '../service'
import func from '../../../../utils/func'

export default {
  namespaced: true,
  state: {
    loading: false,
    treeList: [],
    belongAreaId: '',
    belongArea: ''
  },
  mutations: {
    clearState (state) {
      state.loading = false
      state.treeList = [],
      state.belongAreaId = ''
      state.belongArea = ''

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
      const belongAreaItem = func([payload.data.content])
      state.belongAreaId = belongAreaItem.id
      state.belongArea = belongAreaItem.name
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
