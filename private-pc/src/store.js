import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'

import gauge from './pages/gauge/module'
import service from './pages/service/module'

// 新的页面

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
    gauge,
    service
  }
})
