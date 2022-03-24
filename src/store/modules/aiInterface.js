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
    SET_CALEAI_STATE: (state, inVerified) => {
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
    SET_ASKCALE_CHAT: (state, inVerified) => {
      // set context
      Vue.set(state.helpchatAsk, 'text', inVerified)
      let date = new Date()
      // get the time as a string
      let time = date.toLocaleTimeString()
      Vue.set(state.helpchatAsk, 'time', time)
    },
    SET_ASKCALE_ENTRY: (state, inVerified) => {
      // need to check if access to AI or local?
      if (inVerified.token.length !== 0) {
        Vue.set(state.helpchatAsk, 'active', true)
        let aiMessageout = {}
        aiMessageout.type = 'caleai'
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
      console.log('GET future data CALE')
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
    actionCALEAI: (context, update) => {
    // filter a list of Kentity bundles given the Experiment CNRL
      context.commit('SET_CALEAI_STATE', update)
    },
    actionAskCALE: (context, update) => {
      // context.commit('SET_ASKCALE_HELP', update)
      context.rootState.liveHelpcontext = 'cale'
      Vue.set(context.rootState.helpModal, 'active', true)
    },
    actionHelpAsk: (context, update) => {
      context.commit('SET_ASKCALE_CHAT', update)
    },
    actionHelpaskentry: (context, update) => {
      let dataAI = {}
      dataAI.token = context.rootState.jwttoken
      dataAI.update = update
      context.commit('SET_ASKCALE_ENTRY', dataAI)
    },
    actionFuture: (context, update) => {
      let dataAI = {}
      dataAI.token = context.rootState.jwttoken
      dataAI.update = update
      context.commit('SET_FUTURE_DATA', dataAI)
    }
  }
}
