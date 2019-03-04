import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'

import task from './pages/task/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
    task
  }
})
