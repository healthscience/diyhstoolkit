import Vue from 'vue'

export default {
  state: {
    lifeboardHolder: {},
    lifeboardtListshow:
    {
      state: true,
      text: 'hide'
    },
    peerLifeboards:
    [
      { name: 'networkedself', refcontract: '88337722' },
      { name: 'bioregion', refcontract: '66337766' },
      { name: 'air-quality', refcontract: '44337444' },
      { name: 'river-dee', refcontract: '33337733' }
    ],
    liveSocialGraph: [1, 2, 3],
    liveMapNetwork: ['a', 'b', 'c'],
    liveNetworkcollection: { active: false },
    liveFutureNetworkcollection: { active: false },
    storyLive: [{ name: 'Waterflow', id: '0001' }, { name: 'Rainfall', id: '0002' }, { name: 'Soil', id: '0003' }, { name: 'Plants', id: '0004' }, { name: 'Birds', id: '0005' }, { name: 'Snow', id: '0006' }, { name: 'Population', id: '0007' }],
    liveStory: {},
    liveStoryName: '',
    storyStages: [],
    stageCount: 0,
  },
  getters: {
  },
  mutations: {
    SET_LIFEBOAD_HOLD: (state, inVerified) => {
      // Vue.set(state.lifeboardHolder, 'name', inVerified)
      // console.log(state.lifeboardHolder)
      state.peerLifeboards.push(inVerified)
      console.log(state.peerLifeboards)
      const prepareLifeboard = {}
      prepareLifeboard.type = 'library'
      prepareLifeboard.reftype = 'newlifeboard'
      prepareLifeboard.action = 'newlifeboard'
      prepareLifeboard.data = inVerified
      const referenceContractReady = JSON.stringify(prepareLifeboard)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    SET_LIFEBOAD_ADD: (state, inVerified) => {
      console.log('add to lifeboard')
      const addLifeboard = {}
      addLifeboard.type = 'library'
      addLifeboard.reftype = 'addlifeboard'
      addLifeboard.action = 'addlifeboard'
      addLifeboard.data = inVerified
      console.log(addLifeboard)
      const referenceContractReady = JSON.stringify(addLifeboard)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    SET_SOCAILGRAPH_GET: (state, inVerified) => {
      console.log('add to lifeboard')
      state.liveSocialGraph = [1, 2, 3]
      /* const addLifeboard = {}
      addLifeboard.type = 'socialgraph'
      addLifeboard.reftype = 'socialgraph'
      addLifeboard.action = 'socialgraph'
      addLifeboard.data = inVerified
      const referenceContractReady = JSON.stringify(addLifeboard)
      Vue.prototype.$socket.send(referenceContractReady) */
    },
    SET_MAP_GETNETWORK: (state, inVerified) => {
      console.log('GET geojson')
      state.liveMapNetwork = ['a', 'b', 'c']
      /* const addLifeboard = {}
      addLifeboard.type = 'map'
      addLifeboard.reftype = 'agg-network'
      addLifeboard.action = 'agg-netwokr'
      addLifeboard.data = inVerified
      const referenceContractReady = JSON.stringify(addLifeboard)
      Vue.prototype.$socket.send(referenceContractReady) */
    },
    SET_PAST_GRAPH: (state, inVerified) => {
      console.log('GET past network data')
      state.liveNetworkcollection.active = !state.liveNetworkcollection.active
    },
    SET_FUTURE_GRAPH: (state, inVerified) => {
      console.log('GET FUTURE social graph')
      state.liveFutureNetworkcollection.active = !state.liveFutureNetworkcollection.active
    },
    SET_LBLIST_SHOW: (state, inVerified) => {
      console.log(inVerified)
      let updateText = ''
      if (state.lifeboardtListshow.text === 'hide') {
        updateText = 'show'
      } else {
        updateText = 'hide'
      }
      let updateState = !state.lifeboardtListshow.state
      Vue.set(state.lifeboardtListshow, 'text', updateText)
      Vue.set(state.lifeboardtListshow, 'state', updateState)
    },
    SET_STORY_NAME: (state, inVerified) => {
      state.liveStoryName = inVerified
    },
    SET_STAGE_DATA: (state, inVerified) => {
      let stageData = state.experimentData[inVerified.refcontract]
      state.liveDataLocation = stageData.data
    },
    SET_SAVE_STORY: (state, inVerified) => {
      state.stageCount++
      Vue.set(this.state.storyRefContracts, 'name', inVerified)
      let storySummary = {}
      storySummary.name = state.liveStoryName
      storySummary.id = inVerified
      this.state.storyLive.push(storySummary)
    },
    SET_NEW_STAGE: (state, inVerified) => {
      state.storyStages.push(inVerified)
    },
    SET_EMPTY_STAGES: (state, inVerified) => {
      state.storyStages = []
    }
  },
  actions: {
    actionSaveLifeboard: (context, update) => {
    // filter a list of Kentity bundles given the Experiment CNRL
      context.commit('SET_LIFEBOAD_HOLD', update)
    },
    actionLifeboardAdd: (context, update) => {
      context.commit('SET_LIFEBOAD_ADD', update)
    },
    actionSocialgraph: (context, update) => {
      context.commit('SET_SOCAILGRAPH_GET', update)
    },
    actionMap: (context, update) => {
      context.commit('SET_MAP_GETNETWORK', update)
    },
    actionPastGraph: (context, update) => {
      context.commit('SET_PAST_GRAPH', update)
    },
    actionFutureGraph: (context, update) => {
      context.commit('SET_FUTURE_GRAPH', update)
    },
    actionLifeboardList: (context, update) => {
      context.commit('SET_LBLIST_SHOW', update)
    },
    actionStoryname: (context, update) => {
      context.commit('SET_STORY_NAME', update)
    },
    actionStageID: (context, update) => {
      context.commit('SET_STAGE_DATA', update)
    },
    actionNewstory: (context, update) => {
      context.commit('SET_SAVE_STORY', update)
    },
    actionNewstage: (context, update) => {
      context.commit('SET_NEW_STAGE', update)
    },
    actionEmptystages (context, update) {
      context.commit('SET_EMPTY_STAGES', update)
    }
  }
}
