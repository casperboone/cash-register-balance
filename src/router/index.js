import Vue from 'vue'
import Router from 'vue-router'
import BarSessionForm from '@/components/BarSessionForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BarSessionForm',
      component: BarSessionForm
    }
  ]
})
