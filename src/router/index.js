import Vue from 'vue'
import Router from 'vue-router'
import BarSessionsOverview from '@/pages/BarSessionsOverview'
import BarSession from '@/pages/BarSession'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BarSessionsOverview',
      component: BarSessionsOverview
    },
    {
      path: '/barsession',
      name: 'BarSession',
      component: BarSession
    }
  ]
})
