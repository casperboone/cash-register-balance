import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/BarSessionHome').default
    },
    {
      path: '/overview',
      name: 'overview',
      component: require('@/components/BarSessionOverview').default
    },
    {
      path: '/barsession',
      name: 'BarSession',
      component: require('@/components/BarSession').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
