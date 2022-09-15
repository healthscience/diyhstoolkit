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
    socketClosed: false,
    jwttoken: '',
    connectContext: {},
    networkConnection: {
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
    liveHelpcontext: 'home',
    searchQuery: '',
    feedbackMessage: {},
    experimentListshow:
    {
      state: true,
      text: 'hide'
    },
    nxpState: 'private',
    spaceState: 'private',
    spaceStateShow: {
      state: false,
      text: 'hide'
    },
    spaceType: 'Experiments',
    viewLifeboards: false,
    viewNXP: true,
    viewTimeline: false,
    publickeys: [],
    warmNetwork: [],
    swarmStatus: false,
    replicatePubliclibrary:
    {
      data: { replicate: false }
    },
    datasourceCount: 0,
    devices: [],
    liveRefContIndex: {},
    livePeerRefContIndex: {},
    activeLBFilterlist: [],
    activeXNPFilterlist: [],
    activeDragList: {},
    activeZoomscale: false,
    activeScalevalue: 1,
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
    newNXPfeedback: '',
    newNXPfeedbackActive: false,
    isModalNewNetworkExperiment: false,
    joineNXPFeedback: '',
    joineNXPFeedbackActive: false,
    isModalJoinNetworkExperiment: false,
    setTimeFormat: 'timeseries',
    setTimerange: {},
    dashboardNXP: {},
    ECSupdateOUT: {},
    referenceContract: {},
    experimentList: {},
    NXPexperimentList: {},
    replicateNXPexperimentList: {},
    tempNetworkLibrary: {},
    joinedLifeboard: [],
    joinedNXPlist: [],
    experimentStatus: {},
    experimentPeerStatus: {},
    startPubRefContracts: [],
    startPeerRefContracts: [],
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
      Vue.set(state.networkConnection, 'active', true)
      if (state.connectStatus === false) {
        console.log('no peerlink')
      } else {
        // yes socket connection
        Vue.set(state.networkConnection, 'active', true)
        Vue.set(state.networkConnection, 'text', 'peer-settings')
        Vue.set(state.networkConnection, 'type', 'check-connection')
      }
    },
    SET_CONECTIONSOCK_STATUS: (state, inVerified) => {
      let updateState = false
      if (inVerified === false) {
        updateState = true
      } else {
        updateState = false
      }
      Vue.set(state.networkConnection, 'active', updateState)
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
    SET_NXPWATCH_MODULED: (state, inVerified) => {
      // from watcher
      Vue.set(state.nxpModulelist, inVerified, inVerified)
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
      state.liveHelpcontext = inVerified
      Vue.set(state.helpModal, 'active', activeHelp)
    },
    SET_QUERY_TEXT: (state, inVerified) => {
      state.searchQuery = inVerified
    },
    SET_LIFEBOARD_LIVELIST: (state, inVerified) => {
      state.activeLBFilterlist = inVerified
    },
    SET_NXP_LIVELIST: (state, inVerified) => {
      state.activeXNPFilterlist = inVerified
      let dragState = {}
      dragState.active = false
      for (let dashi of inVerified) {
        Vue.set(state.activeDragList, dashi.id, dragState)
      }
    },
    SET_ACTIVE_DASHI: (state, inVerified) => {
      // loopover and set active true and rest as false
      for (let acti of state.activeXNPFilterlist) {
        let dragState = {}
        if (acti.id === inVerified) {
          dragState.active = true
        } else {
          dragState.active = false
        }
        Vue.set(state.activeDragList, acti.id, dragState)
      }
    },
    SET_ACTIVE_ZOOM: (state, inVerified) => {
      state.activeZoomscale = inVerified
    },
    SET_ACTIVE_SCALE: (state, inVerified) => {
      state.activeScalevalue = inVerified
    },
    SET_WHEEL_SCALE: (state, inVerified) => {
      state.activeScalevalue = state.activeScalevalue + inVerified
    },
    setOutflowWatch: (state, inVerified) => {
      Vue.set(state.experimentStatus, inVerified.cnrl, inVerified)
    },
    SET_Dashboard_NXP: (state, inVerified) => {
      // console.log('set dash')
      // console.log(inVerified)
      // set live dashboard list
      state.liveDashList.push(inVerified)
      // move minimpa code
      let dStatus = state.experimentStatus[inVerified].active
      dStatus = !dStatus
      Vue.set(state.experimentStatus[inVerified], 'active', dStatus)
    },
    setLiveDisplayNXPModules: (state, inVerified) => {
      state.moduleGrid = inVerified.grid
      Vue.set(state.NXPexperimentData, state.liveNXP, inVerified.data)
    },
    setLiveDisplayNXPModulesItem: (state, inVerified) => {
      console.log('future in progress')
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
    /* setVisProgressStart: (state, inVerified) => {
      let setVisProg = {}
      let moduleKeys = Object.keys(inVerified.grid)
      for (let mod of moduleKeys) {
        for (let dti of inVerified.grid[mod]) {
          setVisProg[dti.i] = { text: 'Preparing visualisation', active: false }
        }
        Vue.set(state.visProgress, mod, setVisProg)
        setVisProg = {}
      }
    }, */
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
      console.log('remove nxpm from cashboard')
      let newDashList = this.state.liveDashList.filter(function (value, index, arr) {
        return value !== inVerified
      })
      state.liveDashList = newDashList
      // also remove from lists view
      let newPeerlist = state.joinedNXPlist.data.filter(function (value, index, arr) {
        return value.id !== inVerified
      })
      state.joinedNXPlist.data = newPeerlist
      // Vue.set(state.joinedNXPlist, 'data', newPeerlist)
      // send message to PeerLink to remove from peer library
      let message = {}
      message.type = 'library'
      message.reftype = 'removepeer'
      message.action = 'removepeer'
      message.data = inVerified
      message.jwt = this.state.jwttoken
      const libraryMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(libraryMessage)
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
    },
    SET_LIFE_VIEW (state, inVerified) {
      state.spaceType = inVerified
    },
    SET_SPACE_VIEW (state, inVerified) {
      state.spaceState = inVerified
    },
    SET_SPACE_SHOW (state, inVerified) {
      Vue.set(state.spaceStateShow, 'state', !state.spaceStateShow.state)
      let textSpace = ''
      if (state.spaceStateShow.state === true) {
        textSpace = 'hide'
      } else {
        textSpace = 'show'
      }
      Vue.set(state.spaceStateShow, 'text', textSpace)
    },
    SET_CLOSE_JOINMODAL (state, inVerified) {
      state.isModalJoinNetworkExperiment = false
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      // send a auth requrst to peerlink if not already  authorsed
      if (this.state.connectStatus === true && this.state.peerauthStatus !== true) {
        let message = {}
        message.type = 'safeflow'
        message.reftype = 'ignore'
        message.action = 'auth'
        message.network = null // update.network
        message.settings = null // update.settings
        const safeFlowMessage = JSON.stringify(message)
        Vue.prototype.$socket.send(safeFlowMessage)
      } else {
        // console.log('socket and authored already so nothing')
      }
    },
    actionCloseNetworkModal (context, update) {
      context.commit('SET_CONECTIONSOCK_STATUS', update)
    },
    async authAPIdata (context, update) {
      // send a auth requrst to peerlink
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'dataAPIauth'
      message.network = update.network
      message.settings = update.settings
      message.jwt = this.state.jwttoken
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
    },
    actionCheckConnect (context, update) {
      context.commit('SET_CONNECTION_STATUS', update)
    },
    async annonconnectNSnetwork (context, update) {
      // for cloud
    },
    actionShowhelp (context, update) {
      context.commit('SET_HELP_STATUS', update)
    },
    singleDateUpdate (context, update) {
      context.commit('SET_LIVE_DATE', update)
    },
    actionTextquery (context, update) {
      context.commit('SET_QUERY_TEXT', update)
    },
    actionLiveNXPlist (context, update) {
      context.commit('SET_NXP_LIVELIST', update)
    },
    actionActiveDashSelect (context, update) {
      context.commit('SET_ACTIVE_DASHI', update)
    },
    actionJOINViewexperiment (context, update) {
      // open the modal
      this.state.isModalJoinNetworkExperiment = true
      context.commit('SET_RESET_MODULEHOLDER', null)
      // set the packing array
      this.state.refcontractPackaging = []
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
      displayLibUtil.jwt = this.state.jwttoken
      const displayMessage = JSON.stringify(displayLibUtil)
      Vue.prototype.$socket.send(displayMessage)
    },
    actionLocalGrid (context, update) {
      console.log('action test watch called')
    },
    actionZoomscale (context, update) {
      context.commit('SET_ACTIVE_ZOOM', update)
    },
    actionScalevalue (context, update) {
      context.commit('SET_ACTIVE_SCALE', update)
      context.dispatch('actionZoomset', update, { root: true })
    },
    actionScalewheel (context, update) {
      context.commit('SET_WHEEL_SCALE', update)
    },
    actionoWatch (context, update) {
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
      // is the update an object if yes  saved bentospace
      // console.log(typeof update)
      // set the minimap in position store module
      if (typeof update !== 'object') {
        let positionStartInfo = {}
        positionStartInfo.nxp = update
        positionStartInfo.coord = {}
        positionStartInfo.type = 'new'
        context.dispatch('actionPostionCoord', positionStartInfo, { root: true })
      } else {
        update = update.nxp
      }
      // remove lists
      context.commit('SET_SPACE_SHOW', true)
      let futureTimeCheck = false
      context.commit('SET_LIVE_NXP', update)
      context.commit('SET_NXP_MODULED', update)
      context.commit('SET_Dashboard_NXP', update)
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
        message.jwt = this.state.jwttoken
        console.log('OUTmesssage+++++++++OUT+FIRST++++++')
        console.log(message)
        const safeFlowMessage = JSON.stringify(message)
        Vue.prototype.$socket.send(safeFlowMessage)
      } else {
        console.log('first is a future time')
      }
    },
    async actionVisUpdate (context, update) {
      // console.log('vistoolbar++++++UPdateAction')
      // console.log(update)
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
      message.jwt = this.state.jwttoken
      // console.log('NXPMessage+++++UPDATE++++OUT')
      // console.log(message)
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
      // need to start update message to keep peer informed
      context.commit('setVisProgressUpdate', progressContext)
    },
    actionFutureOLD (context, update) {
      // console.log('action future')
      // console.log(update)
      let chartData = this.state.NXPexperimentData[update.refs.shellCNRL][update.refs.moduleCNRL].data
      // pick out data Chart object and add to dataset
      // what basis for future data for next day?
      if (update.future === 'CALE') {
        let caleMessage = {}
        caleMessage.type = 'cale'
        caleMessage.reftype = 'future'
        caleMessage.data = update.refs
        caleMessage.jwt = this.state.jwttoken
      } else if (update.future === 'month') {
        let dataKeys = Object.keys(chartData)
        for (let dItem of dataKeys) {
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
      // context.commit('SET_DASHBOARD_CLOSE', update)
    },
    actionRemoveDashboard (context, update) {
      context.commit('SET_DASHBOARD_REMOVE', update)
    },
    actionFlowviews (context, update) {
      context.commit('SET_VIEWFLOW_START', update)
    },
    actionLifeview (context, update) {
      context.commit('SET_LIFE_VIEW', update)
    },
    actionSpaceList (context, update) {
      context.commit('SET_SPACE_VIEW', update)
    },
    actionSpaceListShow (context, update) {
      context.commit('SET_SPACE_SHOW', update)
    },
    actionCloseJoinexperiment (context, update) {
      context.commit('SET_CLOSE_JOINMODAL', update)
    },
    actionSetwatchnxpMod (context, update) {
      context.commit('SET_NXPWATCH_MODULED', update)
    }
  },
  strict: false // process.env.NODE_ENV !== 'production'
})

export default store
