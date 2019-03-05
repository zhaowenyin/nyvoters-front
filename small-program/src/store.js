import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
  }
})
