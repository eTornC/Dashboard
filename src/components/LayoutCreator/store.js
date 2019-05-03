import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  jsonLayout: { "position":1,"height": "100", "cols": [{ "position":2,"height": "100", "width": 12, "rows": [{ "position":3,"height": "100", "cols": [{"position":3, "height": "100", "width": 6, "id": 1 }, { "position":5,"height": "100", "width": 6, "id": 1 }] }] }] },
  position: 1  
}

const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
  setPositonSelect(state,position){
    console.log(position);
    state.position = position;
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  setPositonSelect: ({commit, state}, position) => {
    commit('setPositonSelect', position)
    return state.position
  },
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})