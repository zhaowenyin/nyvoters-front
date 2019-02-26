import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'

// import home from './pages/home/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
    // home
  }
})
