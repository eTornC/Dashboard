import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Stores from '@/components/stores/StoresComponent'
import ConfigComponent from '@/components/ConfigComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/Config',
      name: 'config',
      component: ConfigComponent
    }
  ]
})
