import Router from 'vue-router';

import Main from '@/components/Main';
import Stores from '@/components/stores/StoresComponent';
import ConfigComponent from '@/components/ConfigComponent.vue';
import Testing from '@/components/testing/RootTestingComponent';
import TurnsScreenComponent from '@/components/turnsScreens/TurnsScreenComponent.vue';
import turnScreenManager from '@/components/managerTurnScreen/screenManager.vue'
import totemScreenManager from '@/components/managerTotemScreen/screenManager.vue'

import TurnsScreenPanet from '@/components/managerTurnScreen/ScreenManagerPanet.vue';
import TurnsScreenShow from '@/components/turnsScreens/screenSelect.vue';
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
      path: '/turns-screens',
      name: 'turns-screen',
      component: TurnsScreenComponent
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
