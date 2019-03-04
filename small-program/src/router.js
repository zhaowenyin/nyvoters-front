import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'



Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },

  ]
})

export default router
