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
      let gridData = []
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      for (let nxp of inVerified) {
        console.log(nxp.contract)
        gridData.push({ id: nxp.contract.prime.cnrl, name: nxp.contract.prime.text, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'View' })
      }
      let gridTest2 = {}
      gridTest2.columns = gridColumns
      gridTest2.data = gridData
      state.experimentList = gridTest2
    },
    setExperimentStatus: (state, inVerified) => {
      for (let exl of inVerified) {
        let experBundle = {}
        experBundle.cnrl = exl.contract.prime.cnrl
        experBundle.status = false
        experBundle.contract = exl.contract
        experBundle.modules = exl.contract.modules
        let objectPropC = exl.contract.prime.cnrl
        Vue.set(state.experimentStatus, objectPropC, experBundle)
      }
    },
    setNetworkExperimentList: (state, inVerified) => {
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      let gridData = []
      for (let nxp of inVerified) {
        gridData.push({ id: nxp.prime.cnrl, name: nxp.prime.text, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'Join' })
      }
      let gridAnnon = {}
      gridAnnon.columns = gridColumns
      gridAnnon.data = gridData
      state.NXPexperimentList = gridAnnon
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
      let NXPstart = await safeAPI.connectPeerNSnetwork(update.network, update.settings)
      console.log('peer star returned')
      console.log(NXPstart)
      context.commit('setAuthorisation', true)
      context.commit('setExperimentList', NXPstart)
      context.commit('setExperimentStatus', NXPstart)
      // ask for devices (api source etc) for NXP list
      // let deviceList = await safeAPI.deviceGetter(NXPstart)
      // context.commit('setDevice', deviceList)
    },
    async annonconnectNSnetwork (context, update) {
      console.log('annon connect')
      let nsNXPlive = await safeAPI.connectNSnetwork()
      context.commit('setNetworkExperimentList', nsNXPlive)
    },
    async actionDashboardState (context, update) {
      let inputContract = this.state.experimentStatus[update]
      let entityReturn = await safeAPI.ECSinput(inputContract)
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
