import Vue from 'vue'

export default {
  state: {
    statusCALE:
    {
      text: 'off',
      active: false
    },
    helpchatAsk:
    {
      text: '',
      time: '',
      active: false
    },
    helpchatReply: '',
    helpchatHistory: [],
    caleaiReply:
    {
      text: '... .. ...',
      time: '',
      active: false
    },
    liveFutureCollection: { active: false }
  },
  getters: {
  },
  mutations: {
    SET_BBAI_STATE: (state, inVerified) => {
      // check current state and reverse
      if (state.statusCALE.active === false) {
        Vue.set(state.statusCALE, 'active', true)
        Vue.set(state.statusCALE, 'text', 'on')
      } else {
        Vue.set(state.statusCALE, 'active', false)
        Vue.set(state.statusCALE, 'text', 'off')
      }
    },
    SET_ASKCALE_HELP: (state, inVerified) => {
      // set context for help ie where orginiated
      state.liveHelpcontext = 'cale'
      Vue.set(state.helpModal, 'active', true)
    },
    SET_ASKBB_CHAT: (state, inVerified) => {
      // set context
      Vue.set(state.helpchatAsk, 'text', inVerified)
      let date = new Date()
      // get the time as a string
      let time = date.toLocaleTimeString()
      Vue.set(state.helpchatAsk, 'time', time)
    },
    SET_ASKBB_ENTRY: (state, inVerified) => {
      // need to check if access to AI or local?
      console.log(inVerified)
      if (inVerified.update === true) {
        Vue.set(state.helpchatAsk, 'active', true)
        let aiMessageout = {}
        aiMessageout.type = 'bbai'
        aiMessageout.reftype = 'ignore'
        aiMessageout.action = 'question'
        aiMessageout.data = state.helpchatAsk
        aiMessageout.jwt = inVerified.token
        const caleMessage = JSON.stringify(aiMessageout)
        Vue.prototype.$socket.send(caleMessage)
      } else {
        // local AI
        let date = new Date()
        // get the time as a string
        let time = date.toLocaleTimeString()
        Vue.set(state.caleaiReply, 'text', 'CALE is not connected')
        Vue.set(state.caleaiReply, 'time', time)
        Vue.set(state.caleaiReply, 'active', false)
      }
    },
    SET_FUTURE_DATA: (state, inVerified) => {
      console.log('GET future data CALE via BB ')
      let fstate = !state.liveFutureCollection.active
      Vue.set(state.liveFutureCollection, 'active', fstate)
      // data nxp context ref contracts
      let refBundle = {}
      refBundle.future = true
      refBundle.contracts = inVerified.update.contracts
      let aiMessageout = {}
      aiMessageout.type = 'caleai'
      aiMessageout.reftype = 'ignore'
      aiMessageout.action = 'future'
      aiMessageout.data = refBundle
      aiMessageout.jwt = inVerified.token
      // const caleMessage = JSON.stringify(aiMessageout)
      // Vue.prototype.$socket.send(caleMessage)
    }
  },
  actions: {
    actionBBAI: (context, update) => {
    // filter a list of Kentity bundles given the Experiment CNRL
      context.commit('SET_BBAI_STATE', update)
    },
    actionAskBB: (context, update) => {
      // context.commit('SET_ASKBB_HELP', update)
      context.rootState.liveHelpcontext = 'BB-AI'
      Vue.set(context.rootState.helpModal, 'active', true)
    },
    actionHelpAsk: (context, update) => {
      context.commit('SET_ASKBB_CHAT', update)
    },
    actionHelpaskentry: (context, update) => {
      let dataAI = {}
      dataAI.token = context.rootState.jwttoken
      dataAI.update = update
      context.commit('SET_ASKBB_ENTRY', dataAI)
    },
    actionFuture: (context, update) => {
      let dataAI = {}
      dataAI.token = context.rootState.jwttoken
      dataAI.update = update
      context.commit('SET_FUTURE_DATA', dataAI)
    }
  }
}
