import { registerSubmit } from './service'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    formData: {},
    loading: false
  },
  mutations: {
    clearState(state) {
      state.formData  = {}
    },
    updateData () {


    },
    saveForm (state,payload) {
      state.formData = payload
    },
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
  },
  actions: {
    async submitForm ({ commit }, payload) {
      commit({
        type: 'showLoading'
      })
      const { data } = await registerSubmit(payload)
      commit({
        type: 'updateData',
        data
      })
      router.push({path:'/success',query: {type: 1}})
      commit({
        type: 'hideLoading'
      })

    }
  }
}