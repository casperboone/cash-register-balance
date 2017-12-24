// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VueNumeric from 'vue-numeric'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vue2Filters)
Vue.use(VueNumeric)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {test: 123},
  router,
  template: '<App/>',
  components: { App }
})
