'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'

import VueMaterial from 'vue-material'
import VueSweetAlert from 'vue-sweetalert2'

Vue.use(VueMaterial)
Vue.use(VueSweetAlert)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
