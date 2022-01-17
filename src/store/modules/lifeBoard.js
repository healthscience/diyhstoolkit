import Vue from 'vue'
import ToolkitUtility from '@/mixins/toolkitUtility.js'
import ContextUtility from '@/mixins/contextUtility.js'

const ToolUtility = new ToolkitUtility()
const ContextOut = new ContextUtility()

export default {
  state: {
    lifeboardHolder: {},
    lifeboardtListshow:
    {
      state: true,
      text: 'hide'
    },
    peerLifeboards: [],
    liveLB: '',
    viewLBlist: [],
    liveSocialGraph: [1, 2, 3],
    liveMapNetwork: ['a', 'b', 'c'],
    liveNetworkcollection: { active: false },
    liveFutureNetworkcollection: { active: false },
    storyLive: [{ name: 'Waterflow', id: '0001' }, { name: 'Rainfall', id: '0002' }, { name: 'Soil', id: '0003' }, { name: 'Plants', id: '0004' }, { name: 'Birds', id: '0005' }, { name: 'Snow', id: '0006' }, { name: 'Population', id: '0007' }],
    liveStory: {},
    liveStoryName: '',
    storyStages: [],
    stageCount: 0
  },
  getters: {
  },
  mutations: {
    SET_LIFEBOAD_HOLD: (state, inVerified) => {
      // Vue.set(state.lifeboardHolder, 'name', inVerified)
      console.log(state.lifeboardHolder)
      let lifeboardRC = {}
      lifeboardRC.name = inVerified
      lifeboardRC.story = []
      lifeboardRC.stages = []
      lifeboardRC.routines = []
      const prepareLifeboard = {}
      prepareLifeboard.type = 'library'
      prepareLifeboard.reftype = 'newlifeboard'
      prepareLifeboard.action = 'newlifeboard'
      prepareLifeboard.data = lifeboardRC
      const referenceContractReady = JSON.stringify(prepareLifeboard)
      Vue.prototype.$socket.send(referenceContractReady)
      // when refcontract uuid add to list
      // state.peerLifeboards.push(inVerified)
      // console.log(state.peerLifeboards)
    },
    SET_LIFEBOAD_ADD: (state, inVerified) => {
      console.log('add life board nxp and dvice decatioa??')
      console.log(inVerified)
      const addLifeboard = {}
      addLifeboard.type = 'library'
      addLifeboard.reftype = 'addlifeboard'
      addLifeboard.action = 'addlifeboard'
      addLifeboard.data = inVerified
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
    },
    SET_LIFEBOARD_MEMBERS: (state, inVerified) => {
      console.log('lifeboard bundles prpep an send')
      console.log(inVerified)
      // send message to PeerLink for safeFLOW
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'networkexperiment'
      message.data = inVerified
      console.log('OUTmesssage++++LIFEBOARD++++++')
      console.log(message)
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
    },
    SET_LIFEBOARD_ACTIVE: (state, inVerified) => {
      console.log('active lifeboard')
      console.log(inVerified)
      state.selectLBlist = inVerified
    },
    SET_LIVE_LB: (state, inVerified) => {
      state.liveLB = inVerified
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
    actionEmptystages: (context, update) => {
      context.commit('SET_EMPTY_STAGES', update)
    },
    actionLBState: async (context, update) => {
      console.log('action life board selected')
      console.log(update)
      // need to loop through nxp ref contracts and ask HOP to preprae visualisation data
      let matchLBtoNXPs = []
      for (let memb of context.rootState.joinedLifeboard[0].members) {
        if (memb.value.concept.lifeboard === update) {
          matchLBtoNXPs.push(memb)
        }
      }
      // match nxp refs to full contracts
      let matchContracts = []
      let nxpRefcontract = {}
      let nxpModules = []
      for (let lbnxp of matchLBtoNXPs) {
        //let matchExpRefContract = ToolUtility.matchExpModulesDetail(nxp.value.concept.shellID, context.rootState.networkPeerExpModules)
        for (let nxp of context.rootState.networkPeerExpModules) {
          if (nxp.exp.key === lbnxp.value.concept.shellID) {
            nxpRefcontract = nxp
            nxpModules = nxp.modules
          }
        }
        // matchContracts.push(matchExpRefContract)
        matchContracts = nxpModules
        // base NXP ref contract
        // for each member preapred Kbundle for HOP
        let computeRefContract = {}
        let visRefContMatch = false
        let computeRefContKey = ''
        for (let mod of matchContracts) {
          // update compute ref contract  set for one device
          if (mod.key === lbnxp.value.concept.moduleCNRL) {
            visRefContMatch = true
          }
          if (mod.value.type === 'compute') {
            computeRefContKey = mod.key
            computeRefContract = mod
          }
        }
        if (visRefContMatch === true) {
          let setDeviceComRF = ContextOut.prepareSettingsDevices(computeRefContract, lbnxp.value.concept.mData)
          // update compute contract in NXP ref contract modules list
          let updateNXPmodules = []
          for (let refc of matchContracts) {
            // match to compute ref contr module
            if (refc.key === computeRefContKey) {
              updateNXPmodules.push(setDeviceComRF)
            } else {
              updateNXPmodules.push(refc)
            }
          }
          nxpRefcontract.modules = updateNXPmodules
          context.commit('SET_LIFEBOARD_MEMBERS', nxpRefcontract)
        }
      }
    },
    actionLiveLBlist: (context, update) => {
      context.commit('SET_LIFEBOARD_ACTIVE', update)
    },
    actionLBlive: (context, update) => {
      context.commit('SET_LIFEBOARD_ACTIVE', update)
    }
  }
}
