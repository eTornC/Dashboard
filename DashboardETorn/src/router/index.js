import Router from 'vue-router'

import Main from '@/components/Main'
import Stores from '@/components/stores/StoresComponent'
import ConfigComponent from '@/components/ConfigComponent.vue';
import Testing from '@/components/testing/RootTestingComponent'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/stores',
      name: 'stores',
      component: Stores
    },
    {
      path: '/test',
      name: 'test',
      component: Testing
    },
    {
      path: '/Config',
      name: 'config',
      component: ConfigComponent
    }
  ]
})
