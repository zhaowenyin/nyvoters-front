import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'
import register from './pages/register/module'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
    register
  }
})
