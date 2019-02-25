import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'


// 新的页面

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData
  }
})
