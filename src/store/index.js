import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import ToolkitUtility from '@/mixins/toolkitUtility.js'
import ContextUtility from '@/mixins/contextUtility.js'
const moment = require('moment')
const ToolUtility = new ToolkitUtility()
const ContextOut = new ContextUtility()

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  state: {
    authorised: false,
    connectStatus: false,
    helpModal:
    {
      type: 'help',
      active: false,
      feedback: '',
      refcontract: ''
    },
    publickeys: [],
    warmNetwork: [],
    swarmStatus: false,
    datasourceCount: 0,
    devices: [],
    liveRefContIndex: {},
    livePeerRefContIndex: {},
    liveNXP: '',
    liveNXPcontract: {},
    liveNXPbundle: {},
    devicesLive: [],
    nxpModulesLive: [],
    liveDashList: [],
    joinNXPlive: {},
    lengthMholder: 0,
    lengthMholderj: 0,
    joinNXPselected:
    {
      compute: {}
    },
    visCount: {},
    visModuleHolder:
    {
      devices: null,
      data: null,
      compute: null,
      visualise: null,
      category: null,
      timeperiod: null,
      xaxis: null,
      yaxis: [],
      resolution: null
    },
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
    refcontractQuestion: {},
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
    watchFlow: state => function (state) { return state.experimentStatus }
  },
  mutations: {
    setAuthorisation: (state, inVerified) => {
      state.authorised = true
    },
    SET_CONNECTION_STATUS: (state, inVerified) => {
      state.connectStatus = true
    },
    setLiveNXP: (state, inVerified) => {
      state.liveNXP = inVerified
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
    },
    setNXPprogressUpdate: (state, inVerified) => {
      // console.log('set progress message')
      // console.log(inVerified)
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
      setProgress[inVerified.mData] = { text: 'Preparing visualisation', active: true }
      Vue.set(state.visProgress, inVerified.moduleCNRL, setProgress)
    },
    setVisProgressComplete: (state, inVerified) => {
      let setProgress = {}
      setProgress[inVerified.mData] = { text: 'Preparing visualisation', active: false }
      Vue.set(state.visProgress, inVerified.moduleCNRL, setProgress)
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
    },
    newNXPshellUpdate: (state, inVerified) => {
      let tempModcontract = inVerified
      console.log(tempModcontract)
      // Vue.set(state.newNXshell, '', tempModcontract)
    },
    SET_LIVE_DATE (state, inVerified) {
      state.liveDate = inVerified
    },
    SET_RESET_MODULEHOLDER (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'devices', [])
      Vue.set(this.state.visModuleHolder, 'compute', '')
      Vue.set(this.state.visModuleHolder, 'visualise', '')
      Vue.set(this.state.visModuleHolder, 'xaxis', '')
      this.state.visModuleHolder.yaxis = []
      Vue.set(this.state.visModuleHolder, 'category', '')
      Vue.set(this.state.visModuleHolder, 'timeperiod', '')
      Vue.set(this.state.visModuleHolder, 'resolution', '')
    },
    SET_DASHBOARD_REMOVE (state, inVerified) {
      // remove dashboard item
      state.liveDashList = state.liveDashList.filter(item => item !== inVerified)
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      // send a auth requrst to peerlink
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'auth'
      message.network = update.network
      message.settings = update.settings
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
    },
    actionLiveConnect (context, update) {
      context.commit('SET_CONNECTION_STATUS', update)
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
      // reset state.visModuleHolder
      context.commit('SET_RESET_MODULEHOLDER', null)
      let joinNXP = {}
      for (const ep of this.state.networkExpModules) {
        if (ep.exp.key === update) {
          joinNXP = ep
        }
      }
      // need to check date is set and other settings
      // if time not set set prompt peer to select or deafult today date TODO
      // set preview experiment live
      Vue.set(this.state.joinNXPlive, 'experiment', joinNXP)
      // set the chart open data as true
      let openDatatoolbar = { text: 'open data', active: true, learn: false }
      Vue.set(this.state.opendataTools, 'default', openDatatoolbar)
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
      context.commit('setLiveNXP', update)
      context.commit('setDashboardNXP', update)
      context.commit('setNXPprogressUpdate', update)
      // pass the safeFLOW-ECS input bundle
      let matchExp = {}
      for (let nxp of this.state.networkPeerExpModules) {
        if (nxp.exp.key === update) {
          matchExp = nxp
        }
      }
      // console.log('match NXP contract selected#############')
      // console.log(matchExp)
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
          // get the latest refcontract all automatic as first time setup of entity
          let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.compute, this.state.liveRefContIndex.compute)
          pmod.value.info.compute = peerDataRC
          let newestContract = ToolUtility.refcontractLookupCompute(pmod, this.state.livePeerRefContIndex.module)
          // console.log('newest contract')
          // console.log(newestContract)
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
            // console.log('default time set')
            // console.log(this.state.timeStartperiod)
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
        console.log('OUTmesssage++++++++++++++++')
        console.log(message)
        const safeFlowMessage = JSON.stringify(message)
        Vue.prototype.$socket.send(safeFlowMessage)
      } else {
      }
    },
    async actionVisUpdate (context, update) {
      console.log('vistoolbar UPdateAction')
      console.log(update)
      this.state.ecsMessageLive = ''
      let firstTimeCheck = false
      // entity container
      let entityUUID = this.state.entityUUIDReturn
      // prepare info. to update library ref contracts
      let updateContract = {}
      // the visulisation and compute module contract need updating
      // is this a future time input?
      if (update.mData === 'future') {
        context.commit('SET_HELP_STATUS', update)
        context.commit('setTimeAsk', update.startperiod)
      }
      // is the context set from opendata tools or time nav tools?
      let contextState = 'timeupdate'
      if (update.opendata === 'updated') {
        contextState = 'toolbarupdate'
      }
      // if no summary then first time use, extract modules from source
      let nxpRefcontract = {}
      let nxpModules = []
      if (Object.keys(this.state.entityUUIDsummary).length === 0) {
        firstTimeCheck = true
        for (let nxp of this.state.networkPeerExpModules) {
          if (nxp.exp.key === update.nxpCNRL) {
            nxpRefcontract = nxp
            nxpModules = nxp.modules
          }
        }
      } else {
        nxpModules = this.state.entityUUIDsummary.data[update.nxpCNRL].modules
      }
      let updateModules = []
      let newStartTime = []
      for (let mmod of nxpModules) {
        if (mmod.value.type === 'compute') {
          // get the latest refcontract and update per Peer select ie. time, change of compute contract???
          // update the Compute RefContract
          mmod.value.automation = false
          newStartTime = ToolUtility.prepareTime(this.state.timeStartperiod, update)
          console.log('new start time')
          console.log(newStartTime)
          context.commit('setTimeAsk', newStartTime[0])
          // what type of context update?
          let updateSettings = {}
          if (contextState === 'timeupdate') {
            updateSettings = ContextOut.prepareSettingsTime(mmod, newStartTime, update, null)
          } else if (contextState === 'toolbarupdate') {
            updateSettings = ContextOut.prepareSettings(mmod, newStartTime, update, this.state.visModuleHolder)
          }
          updateModules.push(updateSettings)
        } else if (mmod.value.type === 'visualise') {
          // both range and single set?
          let updateSettings = {}
          if (contextState === 'timeupdate') {
            let futureTimeCheck = ToolUtility.timeCheck(newStartTime)
            if (futureTimeCheck === true) {
              context.commit('SET_HELP_STATUS', update)
            }
            updateSettings = ContextOut.prepareSettingsVisTime(mmod, newStartTime, update, null)
          } else if (contextState === 'toolbarupdate') {
            updateSettings = ContextOut.prepareVisSettings(mmod, newStartTime, update, this.state.visModuleHolder)
          }
          updateModules.push(updateSettings)
        } else if (mmod.value.type === 'data') {
          if (firstTimeCheck === true) {
            updateModules.push(mmod)
          }
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
      console.log('updateNXPMessageOUT')
      console.log(message)
      const safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
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
    actionDatasourceCount (context, update) {
      context.commit('SET_DATASOURCECOUNT', update)
    },
    actionCloseDashboard (context, update) {
      context.commit('SET_DASHBOARD_REMOVE', update)
    }
  },
  strict: false // process.env.NODE_ENV !== 'production'
})

export default store
