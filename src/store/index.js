import Vue from 'vue'
import Vuex from 'vuex'
import LiveMixinSAFEflow from '@/mixins/safeFlowAPI'
import modules from './modules'

const safeAPI = new LiveMixinSAFEflow()

Vue.use(Vuex)

// listeners
safeAPI.on('safeflowUpdate', (data) => {
  store.dispatch('actionDisplay', data)
})

const store = new Vuex.Store({
  state: {
    authorised: false,
    devices: [],
    liveNXP: '',
    liveNXPcontract: {},
    liveNXPbundle: {},
    nxpModulesLive: [],
    dashboardNXP: {},
    ECSupdateOUT: {},
    experimentList: {},
    NXPexperimentList: {},
    experimentStatus: {},
    NXPexperimentData: {},
    entityUUIDReturn: {},
    updateentityUUIDReturn: {},
    moduleGrid: {},
    toolbarStatus:
    {
      'default': {
        text: 'show',
        active: false
      }
    },
    toolbarVisStatus: {},
    opendataTools:
    {
      'default': {
        text: 'show',
        active: false
      }
    },
    nxpProgress: {},
    timeStartperiod: 0
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
      Vue.set(state.experimentStatus, inVerified.cnrl, inVerified)
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
      console.log('ECS acknowledge inpue been processed')
      console.log(inVerified)
      state.entityUUIDReturn = inVerified
      // Vue.set(state.entityUUIDReturn, , inVerified)
    },
    setUpdateentityReturn: (state, inVerified) => {
      console.log('ECS acknowledge inpue been processed')
      console.log(inVerified)
      state.updateentityUUIDReturn = inVerified
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
    setVisToolbarState: (state, inVerified) => {
      let setVistoolbar = {}
      let moduleKeys = Object.keys(inVerified.grid)
      for (let mod of moduleKeys) {
        for (let dti of inVerified.grid[mod]) {
          setVistoolbar[dti.i] = { text: 'open tools', active: false }
        }
        Vue.set(state.toolbarVisStatus, mod, setVistoolbar)
        setVistoolbar = {}
      }
    },
    setVistoolsUpdate: (state, inVerified) => {
      let setVisTools = state.toolbarVisStatus[inVerified.module]
      if (inVerified.state === false) {
        setVisTools[inVerified.dtid] = { text: 'hide tools', active: true }
        Vue.set(state.toolbarVisStatus, inVerified.module, setVisTools)
      } else {
        setVisTools[inVerified.dtid] = { text: 'open tools', active: false }
        Vue.set(state.toolbarVisStatus, inVerified.module, setVisTools)
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
    },
    setModulesLive: (state, inVerified) => {
      state.nxpModulesLive = inVerified
    },
    setTimeAsk: (state, inVerified) => {
      state.timeStartperiod = inVerified
    },
    setUpdatesOUT: (state, inVerified) => {
      state.ECSupdateOUT = inVerified
    },
    setClearGrid: (state, inVerified) => {
      state.moduleGrid = []
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
      context.commit('setUpdatesOUT', update)
      let entityReturn = await safeAPI.ECSinput(this.state.experimentStatus[update])
      context.commit('setentityReturn', entityReturn)
    },
    actionLocalGrid (context, update) {
      console.log('action test watch called')
    },
    actionoWatch (context, update) {
      console.log('action watch called')
      context.commit('setOutflowWatch', update)
    },
    actionVisToolbar (context, update) {
      context.commit('setVistoolbar', update)
    },
    actionVistoolsUpdate (context, update) {
      context.commit('setVistoolsUpdate', update)
    },
    actionVisOpenData (context, update) {
      context.commit('setOpendataBar', update)
    },
    async actionVisUpdate (context, update) {
      // send ref contract and update time?
      // entity container
      let entityUUID = this.state.entityUUIDReturn[update.shellCNRL].shellID
      let updateContract = {}
      // updateContract = update
      updateContract.entityUUID = entityUUID
      // the visulisation and compute module contract need updating for time which when how????
      let nxpModules = this.state.entityUUIDReturn[update.shellCNRL].modules
      let updateModules = []
      for (let mmod of nxpModules) {
        if (mmod.type === 'compute') {
          // update the Compute RefContract
          mmod.automation = false
          let newStartTime = []
          if (this.state.timeStartperiod === 0) {
            let freshStart = Date.now() + update.startperiodchange
            newStartTime.push(freshStart)
          } else {
            // time state available
            if (update.startperiod !== 0 && update.rangechange.length === 0) {
              newStartTime.push(update.startperiod)
            } else if (update.rangechange.length > 0) {
              newStartTime = update.rangechange
            } else {
              let updateSum = parseInt(this.state.timeStartperiod) + update.startperiodchange
              newStartTime.push(updateSum)
            }
          }
          context.commit('setTimeAsk', newStartTime)
          mmod.time.startperiod = newStartTime
          updateModules.push(mmod)
        } else if (mmod.cnrl === update.moduleCNRL) {
          mmod.singlemulti = update.singlemulti
          updateModules.push(mmod)
        }
      }
      // keep state of live modules
      context.commit('setModulesLive', updateModules)
      updateContract.cnrl = update.shellCNRL
      updateContract.modules = updateModules
      updateContract.entityUUID = entityUUID
      updateContract.input = update.input
      updateContract.modules = updateModules
      updateContract.input = 'refUpdate'
      context.commit('setUpdatesOUT', updateContract)
      let entityReturn = await safeAPI.ECSinput(updateContract)
      context.commit('setUpdateentityReturn', entityReturn)
    },
    actionDisplay (context, update) {
      let mod = []
      if (this.state.entityUUIDReturn === undefined) {
        mod = this.state.nxpModulesLive
      } else {
        // only update modules returned
        console.log('moduels 1')
        console.log(this.state.experimentStatus) // [this.state.liveNXP])
        console.log(this.state.nxpModulesLive)
        console.log(this.state.entityUUIDReturn[this.state.liveNXP].modules)
        console.log(this.state.updateentityUUIDReturn[this.state.liveNXP].modules)
        mod = this.state.entityUUIDReturn[this.state.liveNXP].modules
      }
      // remove existing vis component if in single mode (default)
      // context.commit('setClearGrid')
      // update or first time
      let displayReady = safeAPI.displayFilter(this.state.liveNXP, mod, this.state.timeStartperiod, update)
      console.log('DISPLAY READY BACK')
      console.log(displayReady)
      // prepare toolbar status object
      context.commit('setToolbarState', mod)
      context.commit('setVisToolbarState', displayReady)
      context.commit('setOpendataState', displayReady)
      context.commit('setProgressComplete', this.state.liveNXP)
      context.commit('setLiveDisplayNXPModules', displayReady)
      // extract out the time
      for (let mmod of mod) {
        if (mmod.type === 'compute') {
          let newStartTime = 0
          if (this.state.timeStartperiod === 0) {
            newStartTime = mmod.time.startperiod
            context.commit('setTimeAsk', newStartTime)
          }
        }
      }
    }
  },
  modules,
  strict: false // process.env.NODE_ENV !== 'production'
})

export default store
