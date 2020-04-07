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
    experimentStatus: {}
  },
  mutations: {
    setAuthorisation: (state, inVerified) => {
      console.log('authorisation')
      state.authorised = true
    },
    setExperimentList: (state, inVerified) => {
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'join']
      let gridData = [
        { id: 1, name: 'Exercise', description: 'plan actitivies', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', join: 'View' }
      ]
      let gridData2 = [
        { id: 1, name: 'Exercise', description: 'plan actitivies', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', join: 'JOIN' },
        { id: 2, name: 'Environment', description: 'air quality', time: 9000, dapps: 'luftdaten.info', device: 'Yes', join: 'JOIN' },
        { id: 3, name: 'Sleep', description: 'How to maximise sleep quality', time: 7000, dapps: 'Gadgetbridge', device: 'Yes', join: 'JOIN' },
        { id: 4, name: 'Food', description: 'Intermitting fasting optimisation', time: 8000, dapps: 'DripX', device: 'Yes', join: 'JOIN' }
      ]
      let gridTest = {}
      gridTest.columns = gridColumns
      gridTest.data = gridData
      let gridTest2 = {}
      gridTest2.columns = gridColumns
      gridTest2.data = gridData2
      state.experimentList = gridTest
      state.NXPexperimentList = gridTest2
      for (let exl of inVerified) {
        let experBundle = {}
        experBundle.cnrl = exl.prime.cnrl
        experBundle.status = false
        experBundle.contract = exl
        experBundle.modules = exl.modules
        let objectPropC = exl.prime.cnrl
        Vue.set(state.experimentStatus, objectPropC, experBundle)
      }
      console.log('complete nxp grid setup')
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
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
