import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Stores from '@/components/stores/StoresComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Stores',
      name: 'Stores',
      component: Stores
    }
  ]
})
