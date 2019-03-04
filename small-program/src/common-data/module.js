import { getDimension } from './service'

export default {
  namespaced: true,
  state: {
    dimension: []
  },
  mutations: {
    updateDimension (state, payload) {
      const newArr = []
      for (let key in payload.data) {
        const children = payload.data[key].map(obj => {
          return {value: obj, label: obj}
        })
        newArr.push({
          value: key,
          label: key,
          children
        })
      }
      console.log(newArr)
      state.dimension = newArr
    }
  },
  actions: {
    async getDimension ({ commit, state }) {
      if (state.dimension.length > 0) return
      const { data } = await getDimension()
      commit({
        type: 'updateDimension',
        data
      })
    }
  }
}
