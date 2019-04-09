import { getNation } from './service'
import { isEmptyObj } from '../utils/validate'

export default {
  namespaced: true,
  state: {
    nationList: []
  },
  mutations: {
    updateNation (state, payload) {
      state.nationList = payload.data.content.map(i => {
        i.value = i.intCode
        i.label = i.desc
        return i
      })
    }
  },
  actions: {
    async searchnation ({ commit, state }) {
      if (!isEmptyObj(state.nationList)) return
      const { data } = await getNation()
      commit({
        type: 'updateNation',
        data
      })
    }
  }
}
