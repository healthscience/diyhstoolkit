import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import ToolkitUtility from '@/mixins/toolkitUtility.js'
import ContextUtility from '@/mixins/contextUtility.js'
import VisToolsUtility from '@/mixins/visualUtility.js'
const moment = require('moment')
const ToolUtility = new ToolkitUtility()
const ContextOut = new ContextUtility()
const VisualUtility = new VisToolsUtility()

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  state: {
    authorised: false,
    connectStatus: false,
    peerauthStatus: false,
    connectContext: {},
    networkConnetion: {
      active: false,
      type: 'self-verify',
      text: 'Connect'
    },
    helpModal:
    {
      type: 'help',
      active: false,
      feedback: '',
      refcontract: ''
    },
    feedbackMessage: {},
    publickeys: [],
    warmNetwork: [],
    swarmStatus: false,
    datasourceCount: 0,
    devices: [],
    liveRefContIndex: {},
    livePeerRefContIndex: {},
    liveNXP: '',
    nxpModulelist: {},
    liveNXPcontract: {},
    liveNXPbundle: {},
    devicesLive: {},
    nxpModulesLive: [],
    liveDashList: [],
    combineSpaceList: [],
    joinNXPlive: {},
    lengthMholder: 0,
    lengthMholderj: 0,
    joinNXPselected:
    {
      compute: {}
    },
    visCount: {},
    flowviews: false,
    opendataUpdate: false,
    newSetupHolder:
    {
      devices: null,
      data: null,
      compute: null,
      visualise: null,
      category: null,
      timeperiod: null,
      xaxis: null,
      yaxis: [],
      resolution: null,
      setTimeFormat: null
    },
    visModuleHolder: {},
    setTimeFormat: 'timeseries',
    setTimerange: {},
    dashboardNXP: {},
    ECSupdateOUT: {},
    referenceContract: {},
    experimentList: {},
    NXPexperimentList: {},
    joinedNXPlist: [],
    experimentStatus: {},
    experimentPeerStatus: {},
    NXPexperimentData: {},
    entityUUIDReturn: {},
    entityUUIDsummary: {},
    updateentityUUIDReturn: {},
    moduleGrid: {},
    liveDate: 0,
    toolbarStatus:
    {
      'default': {
        text: 'show',
        active: false,
        learn: false
      }
    },
    toolbarVisStatus: {},
    opendataTools:
    {
      'default': {
        text: 'show',
        active: false,
        learn: false
      }
    },
    ecsMessageLive: '',
    nxpProgress: {},
    visProgress: {},
    timeStartperiod: 0,
    newNXshell: {},
    moduleHolder: [],
    newNXPmakeRefs: [],
    moduleGenesisList: [],
    moduleListEnd: false,
    moduleJoinedListEnd: false,
    networkExpModules: [],
    networkPeerExpModules: [],
    refcontractQuestion:
    {
      question: {
        text: '',
        forum: ''
      }
    },
    refcontractPackaging: [],
    refcontractCompute: [],
    refcontractVisualise: [],
    nxpMakeList: [],
    nxpModulesList: [],
    moduleNXP:
    {
      question: { 'prime': { 'module': 'question', 'type': 'nxp-question' } },
      data: { 'prime': { 'module': 'data', 'type': 'nxp-device' } },
      device: { 'prime': { 'module': 'data', 'type': 'nxp-device' } },
      mobile: { 'prime': { 'module': 'mobile', 'type': 'nxp-dapp' } },
      compute: { 'prime': { 'module': 'compute', 'type': 'nxp-compute' } },
      visualise: { 'prime': { 'module': 'visualise', 'type': 'nxp-visualise' } },
      education: { 'prime': { 'module': 'education', 'type': 'nxp-education' } },
      error: { 'prime': { 'module': 'error', 'type': 'nxp-errormgt' } },
      control: { 'prime': { 'module': 'control', 'type': 'nxp-control' } },
      presecription: { 'prime': { 'module': 'prescription', 'type': 'nxp-prescription' } },
      lifestyle: { 'prime': { 'module': 'lifestyle', 'type': 'nxp-lifestylemedicine' } },
      communication: { 'prime': { 'module': 'communication', 'type': 'nxp-communication' } },
      clone: { 'prime': { 'module': 'clone', 'type': 'nxp-clone' } },
      idea: { 'prime': { 'module': 'idea', 'type': 'nxp-idea' } }
    }
  },
  getters: {
    liveGrid: state => state.moduleGrid,
    watchFlow: state => function (state) { return state.experimentStatus },
    deviceList: state => state.devicesLive
  },
  mutations: {
    setAuthorisation: (state, inVerified) => {
      state.authorised = true
    },
    SET_CONNECTION_STATUS: (state, inVerified) => {
      state.connectStatus = !state.connectStatus
      console.log('peerlink connect status')
      console.log(state.networkConnection)
      if (state.networkConnection === undefined) {
        console.log('no peerlink')
      } else {
        console.log('live peerlnk')
        state.networkConnetion.active = true
        state.networkConnetion.text = 'edit-connection'
        state.networkConnetion.type = 'self-verify'
      }
    },
    SET_DISCONNECT_NETWORK (state, inVerified) {
      let safeFlowMessage = {}
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'disconnect'
      safeFlowMessage = JSON.stringify(message)
      // clear peer data
      this.state.joinedNXPlist = []
      // close modal
      state.networkConnetion.active = !state.networkConnetion.active
      state.connectStatus = !state.connectStatus
      state.networkConnetion.active = false
      state.networkConnetion.text = 'connect'
      state.networkConnetion.type = 'self-verify'
      Vue.prototype.$socket.send(safeFlowMessage)
    },
    SET_CONNECT_CONTEXT: (state, inVerifed) => {
      state.connectContext = inVerifed
    },
    SET_LIVE_NXP: (state, inVerified) => {
      state.liveNXP = inVerified
    },
    SEL_LIVE_MODULES: (state, inVerified) => {
      /*
      console.log(state.networkPeerExpModules)
      let nxpLiveModules = []
      for (let nxpMod of state.networkPeerExpModules) {
        if (nxpMod.exp.key === inVerified) {
          nxpLiveModules = nxpMod.modules
        }
      }
      let buildDataPerNXPmodules = {}
      buildDataPerNXPmodules.data = []
      buildDataPerNXPmodules.data[inVerified] = nxpLiveModules
      console.log(buildDataPerNXPmodules)
      state.entityUUIDsummary = buildDataPerNXPmodules */
    },
    SET_NXP_MODULED: (state, inVerified) => {
      // match to NXP contract to get array of modules
      // set the order of the modules
      let modulesPerNXP = []
      for (let lnxp of state.networkPeerExpModules) {
        if (lnxp.exp.key === inVerified) {
          modulesPerNXP = VisualUtility.orderModules(lnxp.modules, 'private')
        }
      }
      let modulesRefKey = []
      for (let modk of modulesPerNXP) {
        modulesRefKey.push(modk.key)
      }
      Vue.set(state.nxpModulelist, inVerified, modulesRefKey)
    },
    SET_DATASOURCECOUNT: (state, inVerified) => {
      state.datasourceCount = inVerified
    },
    SET_FEEDBACK_MESSAGE: (state, inVerified) => {
      Vue.set(state.helpModal, 'type', inVerified.type)
      Vue.set(state.helpModal, 'active', inVerified.active)
      Vue.set(state.helpModal, 'feedback', inVerified.feedback)
      Vue.set(state.helpModal, 'refcontract', inVerified.refcontract)
      Vue.set(state.helpModal, 'data', inVerified.data)
    },
    SET_HELP_STATUS: (state, inVerified) => {
      let activeHelp = !state.helpModal.active
      // Vue.set(state.helpModal, 'type', inVerified)
      Vue.set(state.helpModal, 'active', activeHelp)
    },
    setOutflowWatch: (state, inVerified) => {
      Vue.set(state.experimentStatus, inVerified.cnrl, inVerified)
    },
    setNetworkExperimentList: (state, inVerified) => {
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      let gridData = []
      for (let nxp of inVerified) {
        gridData.push({ id: nxp.prime.cnrl, name: nxp.prime.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview / Join' })
      }
      let gridAnnon = {}
      gridAnnon.columns = gridColumns
      gridAnnon.data = gridData
      state.NXPexperimentList = gridAnnon
    },
    setDashboardNXP: (state, inVerified) => {
      // set live dashboard list
      state.liveDashList.push(inVerified)
      let dStatus = state.experimentStatus[inVerified].active
      dStatus = !dStatus
      Vue.set(state.experimentStatus[inVerified], 'active', dStatus)
    },
    setLiveDisplayNXPModules: (state, inVerified) => {
      state.moduleGrid = inVerified.grid
      Vue.set(state.NXPexperimentData, state.liveNXP, inVerified.data)
    },
    setLiveDisplayNXPModulesItem: (state, inVerified) => {
      // update title in options
      let chartUpdateOptions = state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item].chartOptions
      chartUpdateOptions.title.text = 'future'
      let dataItem = state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item].chartPackage
      for (let uit of inVerified.changes.label) {
        dataItem.labels.push(uit)
      }
      let preparFuturedata = []
      // future
      for (let fit of dataItem.datasets[0].data) {
        fit = null
        preparFuturedata.push(fit)
      }
      for (let ffit of inVerified.changes.data) {
        preparFuturedata.push(ffit)
      }
      let dataFuture = { label: 'future',
        data: preparFuturedata,
        borderColor: 'rgb(25, 52, 226)',
        type: 'line',
        fillColor: 'rgb(25, 52, 226)'
      }
      dataItem.datasets.push(dataFuture)
      Vue.set(state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item], 'chartPackage', dataItem)
      Vue.set(state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item], 'chartOptions', chartUpdateOptions)
    },
    SET_ENTITY_RETURN: (state, inVerified) => {
      state.entityUUIDReturn = inVerified
      // Vue.set(state.entityUUIDReturn, , inVerified)
    },
    setUpdateentityReturn: (state, inVerified) => {
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
          setVistoolbar[dti.i] = { text: 'open tools', active: false, learn: true }
        }
        Vue.set(state.toolbarVisStatus, mod, setVistoolbar)
        setVistoolbar = {}
      }
    },
    setVistoolsUpdate: (state, inVerified) => {
      let setVisTools = state.toolbarVisStatus[inVerified.module]
      if (inVerified.state === false) {
        setVisTools[inVerified.dtid] = { text: 'hide tools', active: true, learn: true }
        Vue.set(state.toolbarVisStatus, inVerified.module, setVisTools)
      } else {
        setVisTools[inVerified.dtid] = { text: 'open tools', active: false, learn: true }
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
      // check if time range is set?
      if (state.setTimerange === undefined) {
        state.setTimerange[inVerified.dtid] = []
      }
    },
    setNXPprogressUpdate: (state, inVerified) => {
      let setProgress = { text: 'Experiment in progress', active: true }
      Vue.set(state.nxpProgress, inVerified, setProgress)
    },
    setProgressComplete: (state, inVerified) => {
      let setProgress = { text: 'Experiment in progress', active: false }
      Vue.set(state.nxpProgress, inVerified, setProgress)
    },
    setVisProgressStart: (state, inVerified) => {
      let setVisProg = {}
      let moduleKeys = Object.keys(inVerified.grid)
      for (let mod of moduleKeys) {
        for (let dti of inVerified.grid[mod]) {
          setVisProg[dti.i] = { text: 'Preparing visualisation', active: false }
        }
        Vue.set(state.visProgress, mod, setVisProg)
        setVisProg = {}
      }
    },
    setVisProgressUpdate: (state, inVerified) => {
      let setProgress = {}
      setProgress = { text: 'Updating visualisation', active: true }
      Vue.set(state.visProgress[inVerified.module], inVerified.device, setProgress)
    },
    setVisProgressComplete: (state, inVerified) => {
      let setProgress = {}
      setProgress = { text: 'Updating visualisation', active: false }
      Vue.set(state.visProgress[inVerified.module], inVerified.device, setProgress)
    },
    setModulesLive: (state, inVerified) => {
      state.nxpModulesLive = inVerified
    },
    setTimeAsk: (state, inVerified) => {
      state.timeStartperiod = inVerified
    },
    SET_TIME_RANGE: (state, inVerified) => {
      Vue.set(state.setTimerange, inVerified.device, inVerified.timerange)
    },
    SET_CLEAR_TIMERANGE: (state, inVerified) => {
      Vue.set(state.setTimerange, inVerified.device, [])
    },
    setUpdatesOUT: (state, inVerified) => {
      state.ECSupdateOUT = inVerified
    },
    setClearGrid: (state, inVerified) => {
      state.moduleGrid = []
    },
    newNXPshellUpdate: (state, inVerified) => {
      // let tempModcontract = inVerified
      // Vue.set(state.newNXshell, '', tempModcontract)
    },
    SET_JOINPACKAGING_REFCONTRACT (state, inVerified) {
      // feedback on option for UI
      this.state.refcontractPackaging.push(inVerified)
    },
    SET_JOINCOMPUTE_REFCONTRACT (state, inVerified) {
      this.state.refcontractCompute = []
      this.state.refcontractCompute.push(inVerified)
    },
    SET_LIVE_DATE (state, inVerified) {
      state.liveDate = inVerified
    },
    SET_RESET_MODULEHOLDER (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'devices', [])
      Vue.set(this.state.newSetupHolder, 'compute', '')
      Vue.set(this.state.newSetupHolder, 'visualise', '')
      Vue.set(this.state.newSetupHolder, 'xaxis', '')
      Vue.set(this.state.newSetupHolder, 'yaxis', [])
      Vue.set(this.state.newSetupHolder, 'category', '')
      Vue.set(this.state.newSetupHolder, 'timeperiod', '')
      Vue.set(this.state.newSetupHolder, 'resolution', '')
      Vue.set(this.state.newSetupHolder, 'setTimeFormat', '')
    },
    SET_DASHBOARD_CLOSE (state, inVerified) {
      // remove dashboard item
      let updateNXPlist = state.liveDashList.filter(item => item !== inVerified)
      state.liveDashList = updateNXPlist
      delete state.nxpModulelist[inVerified]
    },
    SET_DASHBOARD_REMOVE (state, inVerified) {
      // remove NXP from peer list
      console.log('remove NXP')
      console.log(inVerified)
      // state.liveDashList = state.liveDashList.filter(item => item !== inVerified)
    },
    SET_VIEWFLOW_START (state, inVerified) {
      state.flowviews = true
    },
    SET_ADD_VISSPACE (state, inVerified) {
      // need unquie identifer for grid
      let random = Math.random()
      let deviceUUID = random.toString()
      let modG = inVerified.mData + deviceUUID.slice(2, 8)
      let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': modG, static: false }
      this.state.moduleGrid[inVerified.moduleCNRL].push(newGriditem)
      // set setting holder
      let visSettings =
      {
        devices: null,
        data: null,
        compute: null,
        visualise: null,
        category: [],
        timeperiod: null,
        xaxis: null,
        yaxis: [],
        resolution: null,
        setTimeFormat: null
      }
      Vue.set(this.state.visModuleHolder, modG, visSettings)
      // set toolbars
      let setVisTools = {}
      setVisTools = { text: 'open tools', active: true }
      Vue.set(this.state.toolbarVisStatus[inVerified.moduleCNRL], modG, setVisTools)
      // set the open data toolbar
      let setOPenDataToolbar = {}
      setOPenDataToolbar = { text: 'open data', active: false }
      Vue.set(this.state.opendataTools[inVerified.moduleCNRL], modG, setOPenDataToolbar)
      // set the data for the visualisation
      let repeatDataBundle = this.state.NXPexperimentData[inVerified.nxpCNRL][inVerified.moduleCNRL].data[inVerified.mData]
      Vue.set(this.state.NXPexperimentData[inVerified.nxpCNRL][inVerified.moduleCNRL].data, modG, repeatDataBundle)
      let contextPlacer = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': modG, 'data': repeatDataBundle }
      Vue.set(this.state.NXPexperimentData[inVerified.nxpCNRL][inVerified.moduleCNRL], 'prime', contextPlacer.prime)
      // set a placer for any subsequent updates
      let setProgress = {}
      setProgress = { text: 'Updating visualisation', active: false }
      Vue.set(this.state.visProgress[inVerified.moduleCNRL], modG, setProgress)
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      // send a auth requrst to peerlink
      console.log('secure socket active?')
      console.log(this.state.peerauthStatus)
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'auth'
      message.network = null // update.network
      message.settings = null // update.settings
      message.cloudtoken = update
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
    },
    async authDatastore (context, update) {
      // send a auth requrst to peerlink
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'datastoreauth'
      message.network = update.network
      message.settings = update.settings
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
    },
    actionDisconnect (context, update) {
      context.commit('SET_DISCONNECT_NETWORK', update)
    },
    actionLiveConnect (context, update) {
      context.commit('SET_CONNECTION_STATUS', update)
    },
    actionSelfVerify (context, update) {
      context.commit('SET_CONNECT_CONTEXT', update)
    },
    async annonconnectNSnetwork (context, update) {
      // for cloud
      // let nsNXPlive = await safeAPI.connectNSnetwork()
      // context.commit('setNetworkExperimentList', nsNXPlive)
      // context.commit('setProgressStart', nsNXPlive)
    },
    actionShowhelp (context, update) {
      context.commit('SET_HELP_STATUS', update)
    },
    singleDateUpdate (context, update) {
      context.commit('SET_LIVE_DATE', update)
    },
    actionJOINViewexperiment (context, update) {
      context.commit('SET_RESET_MODULEHOLDER', null)
      let joinNXP = {}
      for (const ep of this.state.networkExpModules) {
        if (ep.exp.key === update.shellID) {
          joinNXP = ep
        }
      }
      // set the data ref contract for this genesis NXP
      // pick out the data contract
      let dataContract = {}
      let computeContract = {}
      for (let mod of joinNXP.modules) {
        if (mod.value.info.option !== undefined && mod.value.info.option.value.refcontract === 'packaging') {
          dataContract = mod.value.info.option
        } else if (mod.value.info.option !== undefined && mod.value.info.option.value.refcontract === 'compute') {
          computeContract = mod.value.info.option
        }
      }
      context.commit('SET_JOINPACKAGING_REFCONTRACT', dataContract)
      context.commit('SET_JOINCOMPUTE_REFCONTRACT', computeContract)
      // need to check date is set and other settings
      // if time not set set prompt peer to select or deafult today date TODO
      // set preview experiment live
      Vue.set(this.state.joinNXPlive, 'experiment', joinNXP)
      // set open visual toolbar true
      let setVisTools = { text: 'open tools', active: true }
      Vue.set(this.state.toolbarVisStatus, update.moduleCNRL, {})
      Vue.set(this.state.toolbarVisStatus[update.moduleCNRL], update.mData, setVisTools)
      // set the chart open data as true
      let setOPenDataToolbar = { text: 'open data', active: true, learn: false }
      Vue.set(this.state.opendataTools, update.moduleCNRL, {})
      Vue.set(this.state.opendataTools[update.moduleCNRL], update.mData, setOPenDataToolbar)
      // break out the module via sending message to network library utility
      let displayLibUtil = {}
      displayLibUtil.type = 'library'
      displayLibUtil.reftype = 'ignore'
      displayLibUtil.action = 'extractexperimentmodules'
      displayLibUtil.data = joinNXP
      const displayMessage = JSON.stringify(displayLibUtil)
      Vue.prototype.$socket.send(displayMessage)
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
    actionSetTimerange (context, update) {
      context.commit('SET_TIME_RANGE', update)
    },
    actionClearTimerange (context, update) {
      context.commit('SET_CLEAR_TIMERANGE', update)
    },
    actionActiveNXP (context, update) {
      context.commit('SET_LIVE_NXP', update)
      // also need to set modules associated with this NXP ref contract
      // context.commit('SEL_LIVE_MODULES', update)
    },
    actionDisplayLearn (context, update) {
      this.state.ecsMessageLive = ''
      let mod = []
      if (this.state.entityUUIDReturn === undefined) {
        mod = this.state.nxpModulesLive
      } else {
        // only update modules returned
        mod = this.state.entityUUIDReturn[this.state.liveNXP].modules
      }
      console.log(mod)
      // update existing ecs bundle send to peerLink
      /* let ECSbundle = {}
      ECSbundle.exp = update.nxpCNRL
      ECSbundle.update = updateContract
      // send message to PeerLink for safeFLOW
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'updatenetworkexperiment'
      message.data = ECSbundle
      console.log('updateOUT###################')
      console.log(message)
      const safeFlowMessage = JSON.stringify(message) */
      // Vue.prototype.$socket.send(safeFlowMessage)
    },
    async actionDashboardState (context, update) {
      // console.log('clicked VIEW NXP------------')
      // console.log(update)
      let futureTimeCheck = false
      context.commit('SET_LIVE_NXP', update)
      context.commit('SET_NXP_MODULED', update)
      context.commit('setDashboardNXP', update)
      context.commit('setNXPprogressUpdate', update)
      // clear the time range for new NXP view
      let timeContext = {}
      timeContext.device = update.mData
      timeContext.timerange = []
      context.commit('SET_CLEAR_TIMERANGE', timeContext)
      // build the safeFLOW-ECS input bundle
      let matchExp = {}
      for (let nxp of this.state.networkPeerExpModules) {
        if (nxp.exp.key === update) {
          matchExp = nxp
        }
      }
      // prepare ECS inputs- lookup peer selected module options
      let peerOptions = []
      for (let pmod of matchExp.modules) {
        // for each type of module look up ref contract
        if (pmod.value.type === 'question') {
          peerOptions.push(pmod)
        } else if (pmod.value.type === 'data') {
          let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.data, this.state.liveRefContIndex.packaging)
          pmod.value.info.data = peerDataRC
          peerOptions.push(pmod)
        } else if (pmod.value.type === 'compute') {
          // get the latest refcontract nB. link compute ie one to many, sort many list and this used in presentation
          let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.compute, this.state.liveRefContIndex.compute)
          pmod.value.info.compute = peerDataRC
          let newestContract = ToolUtility.refcontractLookupCompute(pmod, this.state.livePeerRefContIndex.module)
          // set key to master ref contract key
          newestContract.key = pmod.key
          // check if data is not in the future
          let timeModule = newestContract.value.info.controls.date
          futureTimeCheck = ToolUtility.timeCheck(timeModule)
          if (futureTimeCheck === true) {
            // flag to peer to ask if they want future or if yes what data to use ie CALE/ other
            let feedbackMessage = {}
            feedbackMessage.type = 'future'
            feedbackMessage.active = true
            feedbackMessage.feedback = 'The time period is in the future. Need data picker or select CALE etc'
            feedbackMessage.refcontract = update
            feedbackMessage.data = moment.utc(timeModule).format('dddd, MMMM Do YYYY')
            context.commit('SET_FEEDBACK_MESSAGE', feedbackMessage)
          } else {
            // set default time for toolkit
            context.commit('setTimeAsk', timeModule)
            let setTimerangeLocal = []
            setTimerangeLocal.push(timeModule)
            peerOptions.push(newestContract)
          }
        } else if (pmod.value.type === 'visualise') {
          pmod.value.info.settings.single = true
          let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.visualise, this.state.liveRefContIndex.visualise)
          if (pmod.value.info.settings.yaxis.length > 1) {
            pmod.value.info.settings.multidata = true
          } else {
            pmod.value.info.settings.multidata = false
          }
          pmod.value.info.visualise = peerDataRC
          peerOptions.push(pmod)
        }
      }
      if (futureTimeCheck === false) {
        let ECSbundle = {}
        ECSbundle.exp = matchExp.exp
        ECSbundle.modules = peerOptions
        // send message to PeerLink for safeFLOW
        let message = {}
        message.type = 'safeflow'
        message.reftype = 'ignore'
        message.action = 'networkexperiment'
        message.data = ECSbundle
        console.log('OUTmesssage+++++++++OUT+FIRST++++++')
        console.log(message)
        const safeFlowMessage = JSON.stringify(message)
        Vue.prototype.$socket.send(safeFlowMessage)
      } else {
        console.log('first is a future time')
      }
    },
    async actionVisUpdate (context, update) {
      console.log('vistoolbar++++++UPdateAction')
      console.log(update)
      this.state.ecsMessageLive = ''
      // perform checks for missing input data to form ECS-out bundle
      // TODO
      // need to start update message to keep peer informed
      let progressContext = {}
      let firstTimeCheck = false
      // entity container
      let entityUUID = this.state.entityUUIDsummary[update.nxpCNRL].data[update.nxpCNRL].shellID // this.state.entityUUIDReturn
      // prepare info. to update library ref contracts
      let updateContract = {}
      // the visulisation and compute module contract need updating
      // is this a future time input?
      if (update.mData === 'future') {
        context.commit('SET_HELP_STATUS', update)
        context.commit('setTimeAsk', update.startperiod)
      }
      // is the context set from opendata tools or time nav tools?
      let opendataStatus = this.state.opendataTools[update.moduleCNRL][update.mData].active
      let contextState = 'timeupdate'
      if (opendataStatus === true) {
        contextState = 'opendataUpdate'
        // close the opendata toolbar
        let setOPenDataToolbar = { text: 'open data', active: false, learn: false }
        Vue.set(this.state.opendataTools[update.moduleCNRL], update.mData, setOPenDataToolbar)
      }
      // if no summary then first time use, extract modules from source
      let nxpRefcontract = {}
      let nxpModules = []
      if (Object.keys(this.state.entityUUIDsummary[update.nxpCNRL]).length === 0) {
        firstTimeCheck = true
        for (let nxp of this.state.networkPeerExpModules) {
          if (nxp.exp.key === update.nxpCNRL) {
            nxpRefcontract = nxp
            nxpModules = nxp.modules
          }
        }
      } else {
        nxpModules = this.state.entityUUIDsummary[update.nxpCNRL].data[update.nxpCNRL].modules
      }
      let updateModules = []
      let newStartTime = []
      for (let mmod of nxpModules) {
        if (mmod.value.type === 'compute') {
          // get the latest refcontract and update per Peer select ie. time, change of compute contract???
          // update the Compute RefContract
          mmod.value.automation = false
          newStartTime = ToolUtility.prepareTime(this.state.timeStartperiod, update)
          context.commit('setTimeAsk', newStartTime[0])
          // what type of context update?
          let updateSettings = {}
          if (contextState === 'timeupdate') {
            updateSettings = ContextOut.prepareSettingsTime(mmod, newStartTime, update, null)
          } else if (contextState === 'opendataUpdate') {
            updateSettings = ContextOut.prepareSettings(mmod, newStartTime, update, this.state.visModuleHolder[update.mData])
          }
          // what device has seen selected
          updateSettings = ContextOut.prepareSettingsDevices(updateSettings, update.mData)
          updateModules.push(updateSettings)
          // update the devices asked for
          progressContext.device = update.mData
        } else if (mmod.value.type === 'visualise') {
          // set the module ref for progress update
          progressContext.module = mmod.key
          // both range and single set?
          let updateSettings = {}
          if (contextState === 'timeupdate') {
            let futureTimeCheck = ToolUtility.timeCheck(newStartTime)
            if (futureTimeCheck === true) {
              context.commit('SET_HELP_STATUS', update)
            }
            updateSettings = ContextOut.prepareSettingsVisTime(mmod, newStartTime, update, null)
          } else if (contextState === 'opendataUpdate') {
            updateSettings = ContextOut.prepareVisSettings(mmod, newStartTime, update, this.state.visModuleHolder[update.mData])
          }
          updateModules.push(updateSettings)
        } else if (mmod.value.type === 'data') {
          updateModules.push(mmod)
        } else if (mmod.value.type === 'question') {
          if (firstTimeCheck === true) {
            updateModules.push(mmod)
          }
        }
      }
      // is update or edit of first time?
      if (firstTimeCheck === false) {
        updateContract.input = 'refUpdate'
      } else {
        updateContract.input = ''
      }
      // keep state of live modules
      updateContract.key = update.nxpCNRL
      updateContract.modules = updateModules
      updateContract.entityUUID = entityUUID
      context.commit('setUpdatesOUT', updateContract)
      // update existing ecs bundle send to peerLink
      let ECSbundle = {}
      // send message to PeerLink for safeFLOW
      let message = {}
      if (firstTimeCheck === false) {
        message.action = 'updatenetworkexperiment'
        ECSbundle.exp = update.nxpCNRL
        ECSbundle.update = updateContract
        message.data = ECSbundle
      } else {
        message.action = 'networkexperiment'
        ECSbundle.exp = nxpRefcontract.exp
        ECSbundle.modules = updateContract.modules
        message.data = ECSbundle
      }
      message.type = 'safeflow'
      message.reftype = 'ignore'
      console.log('NXPMessage+++++UPDATE++++OUT')
      console.log(message)
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
      // need to start update message to keep peer informed
      context.commit('setVisProgressUpdate', progressContext)
    },
    actionFuture (context, update) {
      let chartData = this.state.NXPexperimentData[update.refs.shellCNRL][update.refs.moduleCNRL].data
      // pick out data Chart object and add to dataset
      // what basis for future data for next day?
      if (update.future === 'CALE') {
        // CALElive.startFuture('24')
      } else if (update.future === 'month') {
        let dataKeys = Object.keys(chartData)
        for (let dItem of dataKeys) {
          // console.log('chart item')
          // console.log(chartData[dItem].chartPackage)
          let futureHR = [147, 177, 170, 130, 90, 80, 79, 77, 76, 90, 80, 79, 77, 76, 90, 80, 79, 77, 76]
          let prepareFutuerTime = [1593644400000, 1593817200000, 1593990000000, 1593991000000, 1593992000000, 1593993000000, 1593994000000, 1593995000000, 1593996000000, 1593997000000, 1593998000000, 1593999000000, 159400000000, 159410000000, 159420000000, 159430000000, 159440000000, 159450000000, 159460000000]
          let futureLabel = []
          for (let ft of prepareFutuerTime) {
            let timeFormat = moment(ft).toDate()
            let tsimp = moment(timeFormat).format('llll')
            futureLabel.push(tsimp)
          }
          // let futureLabel = ['Sat, May 23, 2020 10:59 AM', 'Sat, May 23, 2020 11:59 AM', 'Sat, May 23, 2020 12:59 AM']
          let changeData = {}
          changeData.data = futureHR
          changeData.label = futureLabel
          // now set the data for display
          let updateData = {}
          updateData.refs = update.refs
          updateData.refs.item = dItem
          updateData.changes = changeData
          this.commit('setLiveDisplayNXPModulesItem', updateData)
        }
      } else if (update.future === 'self') {
        console.log('self')
      }
    },
    actionVisSpaceAdd (context, update) {
      context.commit('SET_ADD_VISSPACE', update)
    },
    actionDatasourceCount (context, update) {
      context.commit('SET_DATASOURCECOUNT', update)
    },
    actionCloseDashboard (context, update) {
      context.commit('SET_DASHBOARD_CLOSE', update)
    },
    actionRemoveDashboard (context, update) {
      context.commit('SET_DASHBOARD_REMOVE', update)
    },
    actionFlowviews (context, update) {
      context.commit('SET_VIEWFLOW_START', update)
    }
  },
  strict: false // process.env.NODE_ENV !== 'production'
})

export default store
