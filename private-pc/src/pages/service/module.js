import {serviceBagEntity} from './config'
export default {
  namespaced: true,
  state: {
    stateList: [],
    serviceBagEntity: serviceBagEntity()
  },
  mutations: {
    updateStateList (state, payload) {
      state.stateList = payload.data
    }
  },
  actions: {
    async getStateList ({commit}) {
      commit({
        type: 'updateStateList',
        data: [
          {
            label: '停用',
            value: 1
          },
          {
            label: '启用',
            value: 2
          },
          {
            label: '过期',
            value: 3
          }
        ]
      })
    }
  }
}
