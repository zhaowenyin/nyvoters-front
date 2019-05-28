import { getUserInfo,getNation,getTree,getNews } from './service'
import { isEmptyObj } from '../utils/validate'
import func from '../utils/func'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    nationList: [],
    belongAreaId: '',
    belongArea: '',
    treeList: [],
    news: [],
    saveItem: {},
    belongAreaItem: {},
    type: null
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
    saveDistrictItem(state, payload) {
      state.belongAreaItem = payload
    },
    updateTreeList(state, payload) {
      state.treeList = [payload.payload.data.content]
      state.belongAreaId = '1003'
      state.saveItem = payload.payload.data.content
      state.belongAreaItem = func([payload.payload.data.content], '1003')
      state.belongArea = state.belongAreaItem.name

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
      if(!isEmptyObj(state.treeList)&&state.type===payload.type) {
        state.belongAreaId = '1003'
        state.belongArea = state.saveItem.name
        state.belongAreaItem = JSON.parse(JSON.stringify(state.saveItem))
      }
      if (!isEmptyObj(state.treeList)&&( state.type===payload.type)) return
      state.type = payload.type
      const { data } = await getTree({type: payload.type,id:payload.id})
      commit({
        type: 'updateTreeList',
        payload: {
          data,
          type: payload.type
        }
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
