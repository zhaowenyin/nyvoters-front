import { getUserInfo,getNation,getTree,getNews } from './service'
import { isEmptyObj } from '../utils/validate'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    nationList: [],
    belongAreaId: '',
    belongArea: '',
    treeList: [],
    news: []
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
    updateTreeList(state, payload) {
      state.treeList = [payload.data.content]
      state.belongAreaId = payload.data.content.id
      state.belongArea = payload.data.content.name
    },
    updateNews(state, payload) {
      const list =  payload.data.content.data
      state.news = list
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
      state.belongAreaId = ''
      state.belongArea = ''
      const { data } = await getTree({type: payload.type,id:payload.id})
      commit({
        type: 'updateTreeList',
        data
      })

    },
    async getNews ({ commit },payload) {
      const { data } = await getNews(payload)
      commit({
        type: 'updateNews',
        data
      })
    },
  }
}
