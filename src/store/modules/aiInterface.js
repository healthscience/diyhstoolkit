import Vue from 'vue'

export default {
  state: {
    statusCALE:
    {
      text: 'off',
      active: false
    }
  },
  getters: {
  },
  mutations: {
    SET_CALEAI_STATE: (state, inVerified) => {
      // check current state and reverse
      console.log('AIA ON OFF')
      console.log(state.statusCALE)
      if (state.statusCALE.active === false) {
        Vue.set(state.statusCALE, 'active', true)
        Vue.set(state.statusCALE, 'text', 'on')
      } else {
        Vue.set(state.statusCALE, 'active', false)
        Vue.set(state.statusCALE, 'text', 'off')
      }
    }
  },
  actions: {
    actionCALEAI: (context, update) => {
    // filter a list of Kentity bundles given the Experiment CNRL
      context.commit('SET_CALEAI_STATE', update)
    }
  }
}
