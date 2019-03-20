import Router from 'vue-router';

import Main from '@/components/Main';
import Stores from '@/components/stores/StoresComponent';
import ConfigComponent from '@/components/ConfigComponent.vue';
import Testing from '@/components/testing/RootTestingComponent';
import TurnsScreenComponent from '@/components/turnsScreens/TurnsScreenComponent.vue';
import screenManager from '@/components/managerTurnScreen/screenManager.vue'

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
      path: '/screenManager',
      name: 'screenManager',
      component: screenManager
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
