import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import Vue2Filters from 'vue2-filters'
import VueNumeric from 'vue-numeric'
import VuePaginate from 'vue-paginate'
import moment from 'moment'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Vue2Filters)
Vue.use(VueNumeric)
Vue.use(VuePaginate)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

moment.updateLocale('nl', {
  relativeTime: {
    future: 'over %s',
    past: '%s geleden',
    s: 'een paar seconden',
    ss: '%d seconden',
    m: 'een minuut',
    mm: '%d minuten',
    h: 'een uur',
    hh: '%d uur',
    d: 'een dag',
    dd: '%d dagen',
    M: 'een maand',
    MM: '%d maanden',
    y: 'een jaar',
    yy: '%d jaren'
  }
})

window.moment = moment
