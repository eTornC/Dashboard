'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'

// COMPONENTS

import RowComponent from './components/turnsScreens/RowComponent.vue';
import ColComponent from './components/turnsScreens/ColComponent.vue';
import ContentComponent from './components/turnsScreens/ContentComponent.vue';

Vue.component('row-component', RowComponent);
Vue.component('col-component', ColComponent);
Vue.component('content-component', ContentComponent);

// END COMPONENTS

import VueMaterial from 'vue-material'
import VueSweetAlert from 'vue-sweetalert2'
import store from './components/LayoutCreator/store'

Vue.use(VueMaterial)
Vue.use(VueSweetAlert)
Vue.use(VueRouter)


Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App
    //'col-component': ColComponent,
    //'row-component': RowComponent
  },
  template: '<App/>'
})


