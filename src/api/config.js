'use strict'

export default {

//host: 'http://labs.iam.cat',
  host: 'http://localhost',

  port: 80,

  routes: {
    turnScreen: '/turnScreen',
    section:'/section',
    template:'/template',
    layouts:'/layouts',
    layout:'/layout',
    totem_screen:'/totem-screen',
    turns_screen:'/turns-screen',

    //apiPrefix:'/api.php/records',
    apiPrefix:'/~a15zehcheche/eTorn/api.php/records',
    
    //prefix: '/eTorn',
    //prefix: '/~a16josortmar/eTorn',
    //prefix: '/~a16josortmar/eTorn',
    
    prefix: '',
    stores: '/stores',
    store: '/store',
    config: '/config'
  },
}