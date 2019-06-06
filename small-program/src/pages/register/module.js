import { registerSubmit,getCode } from './service'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    formData: {},
    loading: false,
    captchaImg: '',
  },
  mutations: {
    clearState(state) {
      state.formData  = {}
      state.loading = false
      state.captchaImg = ''
      state.captchaId = ''
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
    updateCode (state, payload) {
      const data = payload.data
      state.captchaImg = 'data:imagepng;base64,'+ data.content.captcha
      state.captchaId = data.content.captchaId
    }
  },
  actions: {
    async submitForm ({ commit, dispatch }, payload) {
      commit({
        type: 'showLoading'
      })
      try {
        const { data } = await registerSubmit(payload)
        commit({
          type: 'updateData',
          data
        })
        setTimeout(() => {
          router.push({path:'/success',query: {type: 1,info: data.content.info}})
        }, 500)
      } catch (err) {
        console.log(err)
        dispatch('searchCode')
      } finally {
        commit({
          type: 'hideLoading'
        })
      }

    },
    async searchCode ({ commit }) {
      const {data} = await getCode()
      commit({
        type: 'updateCode',
        data
      })
    },
  }
}
