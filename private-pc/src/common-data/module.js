import { getUserInfo,getNation,getTree } from './service'
import { isEmptyObj } from '../utils/validate'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    nationList: [],
    belongAreaId: '',
    belongArea: '',
    treeList: []
  },
  mutations: {
    updateUserInfo (state, payload) {
      state.userInfo = payload.data
    },
    updateNation (state, payload) {
      state.nationList = payload.data.content
    },
    saveDistrictId(state, payload) {
      state.belongAreaId = payload
    },
    saveDistrictName(state, payload) {
      state.belongArea = payload
    },
    updateTreeList (state, payload) {
      state.treeList = payload.data.content
    }
  },
  actions: {
    async getUserInfo ({ commit, state }) {
      if (!isEmptyObj(state.userInfo)) return
      const { data } = await getUserInfo()
      commit({
        type: 'updateUserInfo',
        data
      })
    },
    async searchnation ({ commit, state }) {
      if (!isEmptyObj(state.nationList)) return
      const { data } = await getNation()
      commit({
        type: 'updateNation',
        data
      })
    },
    async searchTree ({ commit, state }, payload) {
      if (!isEmptyObj(state.treeList)&&payload.type===0) return
      const { data } = await getTree()
      commit({
        type: 'updateTreeList',
        data
      })
    }
  }
}
