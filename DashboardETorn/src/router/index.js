import Router from 'vue-router'

import Main from '@/components/Main'
import Stores from '@/components/stores/StoresComponent'
<<<<<<< HEAD
import Testing from '@/components/testing/RootTestingComponent'
=======
import ConfigComponent from '@/components/ConfigComponent'

Vue.use(Router)
>>>>>>> f8485d044cd7b085772d452e50d3750b14fccc61

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
<<<<<<< HEAD
      path: '/test',
      name: 'test',
      component: Testing
=======
      path: '/Config',
      name: 'config',
      component: ConfigComponent
>>>>>>> f8485d044cd7b085772d452e50d3750b14fccc61
    }
  ]
})
