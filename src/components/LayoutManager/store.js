import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  jsonLayout: 0,
  jsonLayoutSting:Object,
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  jsonLayoutToObject (state) {
    state.jsonLayout = JSON.parse(state.jsonLayoutSting);
  },

  setJsonLayout: (state, jsonString) => {
    state.jsonLayout = jsonString;

  },
 
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  jsonLayoutToObject: ({ commit }) => commit('jsonLayoutToObject'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  },
  setJsonLayout: ({commit, state}, jsonString) => {
    commit('setJsonLayout', jsonString)
    return state.jsonLayout
  },
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})