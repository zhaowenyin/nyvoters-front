import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'

import home from './pages/home/module'
import voterRegister from './pages/voter-register/module'
import behalfCommended from './pages/behalf-recommended/home/module'
import behalfCommendedHistory from './pages/behalf-recommended/history/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
    home,
    voterRegister,
    behalfCommended,
    behalfCommendedHistory
  }
})
