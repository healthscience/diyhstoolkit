import Vue from 'vue'
import Vuex from 'vuex'
import LiveMixinSAFEflow from '@/mixins/safeFlowAPI'
import modules from './modules'

const safeAPI = new LiveMixinSAFEflow()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorised: false,
    devices: [],
    liveNXP: '',
    liveNXPcontract: {},
    liveNXPbundle: {},
    dashboardNXP: {},
    experimentList: {},
    NXPexperimentList: {},
    experimentStatus: {},
    NXPexperimentData: {}
  },
  mutations: {
    setAuthorisation: (state, inVerified) => {
      state.authorised = true
    },
    setExperimentList: (state, inVerified) => {
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      let gridData = [
        { id: 'cnrl-848388553323', name: 'Exercise', description: 'plan actitivies', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'View' }
      ]
      let gridTest2 = {}
      gridTest2.columns = gridColumns
      gridTest2.data = gridData
      for (let exl of inVerified) {
        let experBundle = {}
        experBundle.cnrl = exl.prime.cnrl
        experBundle.status = false
        experBundle.contract = exl
        experBundle.modules = exl.modules
        let objectPropC = exl.prime.cnrl
        Vue.set(state.experimentStatus, objectPropC, experBundle)
      }
      state.experimentList = gridTest2
    },
    setNetworkExperimentList: (state, inVerified) => {
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      let gridData = [
        { id: 1, name: 'Exercise', description: 'plan actitivies', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'join' },
        { id: 2, name: 'Environment', description: 'air quality', time: 9000, dapps: 'luftdaten.info', device: 'Yes', action: 'join' },
        { id: 3, name: 'Sleep', description: 'How to maximise sleep quality', time: 7000, dapps: 'Gadgetbridge', device: 'Yes', action: 'join' },
        { id: 4, name: 'Food', description: 'Intermitting fasting optimisation', time: 8000, dapps: 'DripX', device: 'Yes', action: 'join' }
      ]
      let gridTest = {}
      gridTest.columns = gridColumns
      gridTest.data = gridData
      state.NXPexperimentList = gridTest
    },
    setDashboardNXP: (state, inVerified) => {
      let dStatus = state.experimentStatus[inVerified].active
      dStatus = !dStatus
      Vue.set(state.experimentStatus[inVerified], 'active', dStatus)
    },
    setLiveNXPModules: (state, inVerified) => {
      Vue.set(state.NXPexperimentData, inVerified.cnrl, inVerified)
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      let NXPstart = await safeAPI.connectNSnetwork(update.network, update.settings)
      context.commit('setAuthorisation', true)
      context.commit('setExperimentList', NXPstart)
      // ask for devices (api source etc) for NXP list
      // let deviceList = await safeAPI.deviceGetter(NXPstart)
      // context.commit('setDevice', deviceList)
    },
    annonconnectNSnetwork (context, update) {
      console.log('annon connect')
      context.commit('setNetworkExperimentList')
    },
    async actionDashboardState (context, update) {
      let inputBundle = this.state.experimentStatus[update]
      let entityReturn = await safeAPI.ECSinput(inputBundle)
      console.log('entity complete')
      console.log(entityReturn)
      if (entityReturn[update].status !== 'failed') {
        // go ahead and get data and display modules and set listeniners for changes in entity
        context.commit('setDashboardNXP', update)
        // what data does the PLX (peer learning experience) require?
        let dataFlow = await safeAPI.displayFilter(update, entityReturn)
        let Dholder = {}
        Dholder.cnrl = update
        Dholder.modules = dataFlow
        context.commit('setLiveNXPModules', Dholder)
      }
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
