import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/css/element/index.css'

import './reset.css'

import App from './App'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
