import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import VueCurrencyFilter from 'vue-currency-filter'
import Vuelidate from 'vuelidate'
import VueMoment from 'vue-moment'
import moment from 'moment'

import { remote } from 'electron'

import HelpNote from './components/HelpNote'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMoment)

Vue.use(VueCurrencyFilter, {
  symbol: '€',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

Vue.component('help-note', HelpNote)

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
    s: 'een moment',
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

document.addEventListener('keydown', e => {
  if (e.which === 121 || e.which === 123) {
    remote.getCurrentWindow().toggleDevTools()
  } else if (e.which === 116) {
    location.reload()
  }
})
