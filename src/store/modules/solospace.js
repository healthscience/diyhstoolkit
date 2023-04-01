import Vue from 'vue'

export default {
  state: {
    soloState:
    {
      active: false,
      board: ''
    },
    storyState:
    {
      active: false,
      story: ''
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
    },
    SET_ACTIVE_SMODULE: (state, inVerified) => {
      console.log('set active solo module')
    },
    SET_STORY_STATE: (state, inVerified) => {
      console.log('story status')
      console.log(inVerified)
      // set active or not
      let status = state.storyState.active
      if (status === true) {
        status = false
      } else {
        status = true
      }
      Vue.set(state.storyState, 'active', status)
      Vue.set(state.storyState, 'story', inVerified)
      console.log(state.storyState)
    }
  },
  actions: {
    actionSolospace: (context, update) => {
    // filter a list of Kentity bundles given the Experiment CNRL
      context.commit('SET_SOLO_STATE', update)
    },
    actionSoloactiveNXP (context, update) {
      context.commit('SET_ACTIVE_SMODULE', update)
    },
    actionStoryspace: (context, update) => {
      context.commit('SET_STORY_STATE', update)
    }
  }
}
