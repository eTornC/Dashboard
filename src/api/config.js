'use strict'

export default {

host: 'http://labs.iam.cat',
 //host: 'http://localhost',

  port: 80,

  routes: {
    turnScreen: '/turnScreen',
    section:'/section',
    template:'/template',
    layouts:'/LAYOUTS',

    //apiPrefix:'/api.php/records',
    apiPrefix:'/~a15zehcheche/eTorn/api.php/records',
    
    //prefix: '/eTorn',
    //prefix: '/~a16josortmar/eTorn',
    prefix: '/~a16josortmar/eTorn',


    stores: '/stores',
    store: '/store',

    config: '/config'
  },
}