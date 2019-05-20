'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'

// COMPONENTS

import RowComponent from './components/demoLayoutBuild/RowComponent.vue';
import ColComponent from './components/demoLayoutBuild/ColComponent.vue';
import RowComponentSelect from './components/LayoutBuild/RowComponent.vue';
import ColComponentSelect from './components/LayoutBuild/ColComponent.vue';

Vue.component('row-component', RowComponent);
Vue.component('col-component', ColComponent);
Vue.component('row-component-select', RowComponentSelect);
Vue.component('col-component-select', ColComponentSelect);

// END COMPONENTS

import VueMaterial from 'vue-material'
import VueSweetAlert from 'vue-sweetalert2'
//import store from './components/LayoutCreator/store'

Vue.use(VueMaterial)
Vue.use(VueSweetAlert)
Vue.use(VueRouter)
Vue.use(Vuex)

import store from './components/LayoutManager/store'

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


