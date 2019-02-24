import { getUserInfo } from './service'
import { isEmptyObj } from '../utils/validate'

export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    updateUserInfo (state, payload) {
      state.userInfo = payload.data
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
    }
  }
}
