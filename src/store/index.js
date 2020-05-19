import Vue from 'vue'
import Vuex from 'vuex'
import LiveMixinSAFEflow from '@/mixins/safeFlowAPI'
import modules from './modules'

const safeAPI = new LiveMixinSAFEflow()

Vue.use(Vuex)

// listeners
safeAPI.on('safeflowUpdate', (data) => {
  // console.log('safeflowUpate--0099999')
  // console.log(data)
  // const listenStore = store
  store.dispatch('actionDisplay', data)
})

const store = new Vuex.Store({
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
    NXPexperimentData: {},
    entityUUIDReturn: {},
    moduleGrid: {},
    toolbarStatus:
    {
      'default': {
        text: 'show',
        active: false
      }
    },
    opendataTools:
    {
      'default': {
        text: 'show',
        active: false
      }
    },
    nxpProgress: {}
  },
  getters: {
    // liveSafeFlow: state => state.safeFlow
    liveGrid: state => state.moduleGrid,
    watchFlow: state => function (state) { return state.experimentStatus }
  },
  mutations: {
    setAuthorisation: (state, inVerified) => {
      state.authorised = true
    },
    setLiveNXP: (state, inVerified) => {
      state.liveNXP = inVerified
    },
    setExperimentList: (state, inVerified) => {
      let gridData = []
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      for (let nxp of inVerified) {
        // console.log(nxp.contract)
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
    setOutflowWatch: (state, inVerified) => {
      console.log('##################commit watchflow')
      console.log(inVerified)
      Vue.set(state.experimentStatus, inVerified.cnrl, inVerified)
      console.log(state.experimentStatus)
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
    setLiveDisplayNXPModules: (state, inVerified) => {
      state.moduleGrid = inVerified.grid
      Vue.set(state.NXPexperimentData, state.liveNXP, inVerified.data)
    },
    setentityReturn: (state, inVerified) => {
      state.entityUUIDReturn = inVerified
      // Vue.set(state.entityUUIDReturn, , inVerified)
    },
    setUpdateGrid: (state, inVerified) => {
      state.moduleGrid = inVerified
    },
    setToolbarState: (state, inVerified) => {
      for (let mod of inVerified) {
        let setToolbar = { text: 'show', active: false }
        Vue.set(state.toolbarStatus, mod.cnrl, setToolbar)
      }
    },
    setVistoolbar: (state, inVerified) => {
      let setToolbar = {}
      if (inVerified.state === false) {
        setToolbar = { text: 'hide', active: true }
        Vue.set(state.toolbarStatus, inVerified.module, setToolbar)
      } else {
        setToolbar = { text: 'show', active: false }
        Vue.set(state.toolbarStatus, inVerified.module, setToolbar)
      }
    },
    setOpendataState: (state, inVerified) => {
      let setOpendata = {}
      let moduleKeys = Object.keys(inVerified.grid)
      for (let mod of moduleKeys) {
        for (let dti of inVerified.grid[mod]) {
          setOpendata[dti.i] = { text: 'open data', active: false }
        }
        Vue.set(state.opendataTools, mod, setOpendata)
        setOpendata = {}
      }
    },
    setOpendataBar: (state, inVerified) => {
      let setToolbar = state.opendataTools[inVerified.module]
      if (inVerified.state === false) {
        setToolbar[inVerified.dtid] = { text: 'hide data', active: true }
        Vue.set(state.opendataTools, inVerified.module, setToolbar)
      } else {
        setToolbar[inVerified.dtid] = { text: 'open data', active: false }
        Vue.set(state.opendataTools, inVerified.module, setToolbar)
      }
    },
    setProgressStart: (state, inVerified) => {
      for (let nxp of inVerified) {
        let setProgress = { text: 'Experiment in progress', active: false }
        Vue.set(state.nxpProgress, nxp.cnrl, setProgress)
      }
    },
    setProgressUpdate: (state, inVerified) => {
      let setProgress = { text: 'Experiment in progress', active: true }
      Vue.set(state.nxpProgress, inVerified, setProgress)
    },
    setProgressComplete: (state, inVerified) => {
      let setProgress = { text: 'Experiment in progress', active: false }
      Vue.set(state.nxpProgress, inVerified, setProgress)
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      let NXPstart = await safeAPI.connectPeerNSnetwork(update.network, update.settings)
      context.commit('setAuthorisation', true)
      context.commit('setExperimentList', NXPstart)
      context.commit('setExperimentStatus', NXPstart)
      context.commit('setProgressStart', NXPstart)
    },
    async annonconnectNSnetwork (context, update) {
      console.log('annon connect')
      let nsNXPlive = await safeAPI.connectNSnetwork()
      context.commit('setNetworkExperimentList', nsNXPlive)
      context.commit('setProgressStart', nsNXPlive)
    },
    async actionDashboardState (context, update) {
      context.commit('setLiveNXP', update)
      context.commit('setDashboardNXP', update)
      context.commit('setProgressUpdate', update)
      let entityReturn = await safeAPI.ECSinput(this.state.experimentStatus[update])
      console.log('ECS return---------')
      console.log(entityReturn)
      context.commit('setentityReturn', entityReturn)
    },
    actionDisplay (context, update) {
      let mod = this.state.entityUUIDReturn[this.state.liveNXP].modules
      let displayReady = safeAPI.displayFilter(this.state.liveNXP, mod, update)
      // prepare toolbar status object
      context.commit('setToolbarState', mod)
      context.commit('setOpendataState', displayReady)
      context.commit('setProgressComplete', this.state.liveNXP)
      context.commit('setLiveDisplayNXPModules', displayReady)
    },
    actionLocalGrid (context, update) {
      console.log('action test watch called')
      console.log(update)
    },
    actionoWatch (context, update) {
      console.log('action watch called')
      console.log(update)
      context.commit('setOutflowWatch', update)
    },
    actionVisToolbar (context, update) {
      context.commit('setVistoolbar', update)
    },
    actionVisOpenData (context, update) {
      context.commit('setOpendataBar', update)
    },
    async actionVisUpdate (context, update) {
      // send ref contract and update time?
      console.log('vis update')
      console.log(update)
      console.log(this.state.entityUUIDReturn)
      // entity container
      let entityUUID = this.state.entityUUIDReturn[update.shellCNRL].shellID
      let updateContract = {}
      updateContract = update
      updateContract.entityUUID = entityUUID
      // the visulisation and compute module contract need updating for time which when how????
      let nxpModules = this.state.entityUUIDReturn[update.shellCNRL].modules
      let updateModules = []
      for (let mmod of nxpModules) {
        if (mmod.cnrl === update.moduleCNRL) {
          console.log('match mod')
          console.log(mmod)
          updateModules.push(mmod)
        }
      }
      console.log('update modules')
      console.log(updateModules)
      updateContract.modules = updateModules
      updateContract.input = 'refUpdate'
      let entityReturn = await safeAPI.ECSinput(updateContract)
      context.commit('setentityReturn', entityReturn)
    }
  },
  modules,
  strict: false // process.env.NODE_ENV !== 'production'
})

export default store
