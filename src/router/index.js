import Router from 'vue-router';

import Main from '@/components/Main';
import Stores from '@/components/stores/StoresComponent';
import ConfigComponent from '@/components/ConfigComponent.vue';
import Testing from '@/components/testing/RootTestingComponent';
import turnScreenManager from '@/components/managerTurnScreen/screenManager.vue'
import totemScreenManager from '@/components/managerTotemScreen/screenManager.vue'


import templateTest from '@/components/templateTest.vue';
import LayoutCreator from '@/components/LayoutCreator/main.vue';

import publicityManager from '@/components/publicityManager/main.vue';

export default new Router({
  //mode: 'history',
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
      path: '/config',
      name: 'config',
      component: ConfigComponent
    },
    {
      path: '/turnScreenManager',
      name: 'turnScreenManager',
      component: turnScreenManager
    },
    {
      path: '/totemScreenManager',
      name: 'totemScreenManager',
      component: totemScreenManager
    },
    {
      path: '/templateTest',
      name: 'templateTest',
      component: templateTest
    },
    {
      path: '/layoutCreator',
      name: 'layoutCreator',
      component: LayoutCreator
    },
    {
      path: '/publicityManager',
      name: 'publicityManager',
      component: publicityManager
    },
    /*{
      path: '/turns-screens-panet',
      name: 'turns-screen-panet',
      component: TurnsScreenPanet
    },
    {
      path: '/turns-screens-show',
      name: 'turns-screens-show',
      component: TurnsScreenShow
    }*/

  ]
})
