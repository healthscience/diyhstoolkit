import Vue from 'vue'

export default {
  state: {
    soloState:
    {
      active: false,
      board: ''
    }
  },
  getters: {
  },
  mutations: {
    SET_SOLO_STATE: (state, inVerified) => {
      // set active or not
      let status = state.soloState.active
      if (status === true) {
        status = false
      } else {
        status = true
      }
      Vue.set(state.soloState, 'active', status)
      Vue.set(state.soloState, 'board', inVerified)
    }
  },
  actions: {
    actionSolospace: (context, update) => {
    // filter a list of Kentity bundles given the Experiment CNRL
      context.commit('SET_SOLO_STATE', update)
    }
  }
}
