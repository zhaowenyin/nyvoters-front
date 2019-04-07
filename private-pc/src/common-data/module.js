import { getUserInfo,getNation } from './service'
import { isEmptyObj } from '../utils/validate'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    nationList: [],
    commonDistrictId: ''
  },
  mutations: {
    updateUserInfo (state, payload) {
      state.userInfo = payload.data
    },
    updateNation (state, payload) {
      state.nationList = payload.data.content
    },
    saveDistrictId(state, payload) {
      state.commonDistrictId = payload
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
  }
}
