
export default {
  namespaced: true,
  state: {
    commonDistrictId: ''
  },
  mutations: {
    saveDistrictId(state, payload) {
      state.commonDistrictId = payload
    }
  },
  actions: {

  }
}
