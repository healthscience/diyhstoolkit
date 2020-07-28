import Vue from 'vue'
import Vuex from 'vuex'
import LiveMixinSAFEflow from '@/mixins/safeFlowAPI'
import modules from './modules'
import CALE from 'cale-ai'
const moment = require('moment')

const safeAPI = new LiveMixinSAFEflow()
const CALElive = new CALE(safeAPI)
console.log('cale')
console.log(CALElive)

Vue.use(Vuex)

// listeners
safeAPI.on('safeflowUpdate', (data) => {
  store.dispatch('actionDisplay', data)
})

const store = new Vuex.Store({
  modules,
  state: {
    livesafeFLOW: safeAPI,
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
    joinedNXPlist: {},
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
    visProgress: {},
    timeStartperiod: 0,
    newNXshell: {},
    newNXPmakeRefs: [],
    refcontractQuestion: {},
    refcontractPackaging: {},
    refcontractCompute: {},
    refcontractVisualise: {},
    nxpMakeList:
    [
      { name: 'Question', id: 0, refcont: '0492e4bf43a6f930a169baab13d5ae4917f17544' }
    ],
    nxpModulesList:
    [
      { name: 'Device/source', id: 1, refcont: '3f8830cab791df89acd6b093d52ea397a0c90853' },
      { name: 'Mobile/Dapps', id: 2, refcont: '' },
      { name: 'Compute', id: 3, refcont: 'f9b584cf83bbbc45e2f5d869990b592efa2945b3' },
      { name: 'Visulisation', id: 4, refcont: 'd60569614d692317f2ffcb6b01e162179ae5a470' },
      { name: 'Education', id: 5, refcont: '' },
      { name: 'Error Mgt', id: 6, refcont: '' },
      { name: 'Control', id: 7, refcont: '' },
      { name: 'Lifestyle medicine', id: 8, refcont: '' },
      { name: 'Prescription', id: 9, refcont: '' },
      { name: 'Communication', id: 10, refcont: '' }
    ]
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
      // check if peerlink has been called if not get ref contracts
      /* let gridData = []
      let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
      for (let nxp of inVerified) { // state.joinedNXPlist.data) {
        // console.log(nxp.contract)
        gridData.push({ id: nxp.contract.prime.cnrl, name: nxp.contract.prime.text, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'View' })
      }
      let gridTest2 = {}
      gridTest2.columns = gridColumns
      gridTest2.data = gridData
      state.experimentList = gridTest2 */
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
      console.log('join list')
      console.log(inVerified)
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
    setLiveDisplayNXPModulesItem: (state, inVerified) => {
      console.log('update chart item per item')
      console.log(inVerified)
      // update title in options
      let chartUpdateOptions = state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item].chartOptions
      chartUpdateOptions.title.text = 'future'
      let dataItem = state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item].chartPackage
      for (let uit of inVerified.changes.label) {
        dataItem.labels.push(uit)
      }
      // update data i.e. y axis
      /* for (let dit of inVerified.changes.data) {
        dit = null
        dataItem.datasets[0].data.push(dit)
      } */
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
      console.log(state.NXPexperimentData[inVerified.refs.shellCNRL][inVerified.refs.moduleCNRL].data[inVerified.refs.item])
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
    setVistoolsTemp: (state, inVerified) => {
      let setVisTools = {}
      setVisTools[inVerified.mData] = { text: 'open tools', active: true }
      Vue.set(state.toolbarVisStatus, inVerified.moduleCNRL, setVisTools)
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
    setOpendataBarTemp: (state, inVerified) => {
      let setToolbar = {}
      setToolbar[inVerified.mData] = { text: 'open data', active: true }
      Vue.set(state.opendataTools, inVerified.moduleCNRL, setToolbar)
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
    setVisProgressStart: (state, inVerified) => {
      console.log('vis start newnewnew')
      console.log(inVerified)
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
    newNXPshell: (state, inVerified) => {
      Vue.set(state.newNXshell, 'tempshell', inVerified)
    },
    newNXPshellUpdate: (state, inVerified) => {
      let tempModcontract = inVerified
      console.log(tempModcontract)
      // Vue.set(state.newNXshell, '', tempModcontract)
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
      // for cloud
      // let nsNXPlive = await safeAPI.connectNSnetwork()
      // context.commit('setNetworkExperimentList', nsNXPlive)
      // context.commit('setProgressStart', nsNXPlive)
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
      console.log('inputinputinput')
      console.log(update)
      // display processing
      context.commit('setVisProgressUpdate', update)
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
              console.log('update starp0 but range above 1')
              newStartTime.push(update.startperiod)
            } else if (update.rangechange.length > 0) {
              console.log('chage range above zero')
              newStartTime = update.rangechange
              mmod.time.timeseg = update.startperiodchange
            } else if (update.startperiod === 0 && update.startperiodchange) {
              console.log('update starp0 but range above 1')
              console.log(this.state.timeStartperiod)
              let timeCon = new Date(this.state.timeStartperiod)
              console.log(timeCon)
              console.log(timeCon.getTime())
              let convertTime = timeCon.getTime()
              let updateT = parseInt(convertTime) + update.startperiodchange
              newStartTime.push(updateT)
              mmod.time.timeseg = update.startperiodchange
            } else {
              console.log('elas all otehr opieons')
              let updateSum = parseInt(this.state.timeStartperiod) + update.startperiodchange
              newStartTime.push(updateSum)
              mmod.time.timeseg = update.startperiodchange
            }
          }
          context.commit('setTimeAsk', newStartTime)
          mmod.time.startperiod = newStartTime
          mmod.time.timeseg = update.startperiodchange
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
        mod = this.state.entityUUIDReturn[this.state.liveNXP].modules
      }
      // remove existing vis component if in single mode (default)
      // context.commit('setClearGrid')
      // update or first time
      let displayReady = safeAPI.displayFilter(this.state.liveNXP, mod, this.state.timeStartperiod, update)
      // prepare toolbar status object
      context.commit('setToolbarState', mod)
      context.commit('setVisProgressStart', displayReady)
      context.commit('setVisToolbarState', displayReady)
      context.commit('setOpendataState', displayReady)
      context.commit('setVisProgressComplete', displayReady) // setVisProgressComplete
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
    },
    actionFuture (context, update) {
      console.log('future data')
      console.log(update)
      // console.log(this.state.NXPexperimentData[update.refs.shellCNRL][update.refs.moduleCNRL].data)
      let chartData = this.state.NXPexperimentData[update.refs.shellCNRL][update.refs.moduleCNRL].data
      // pick out data Chart object and add to dataset
      // what basis for future data for next day?
      if (update.future === 'CALE') {
        console.log('ask CALE')
        // CALElive.startFuture('24')
      } else if (update.future === 'month') {
        console.log('month normal')
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
    actionSetTempToolbarVis (context, update) {
      console.log('new TEMP NXP contract settings')
      // pass on to NXP composer
      // const prepareNXP = liveComposer.()
      // let newShelltempid = update // Math.floor(100000000 + Math.random() * 900000000)
      context.commit('newNXPshell', update.shellID)
      context.commit('setVistoolsTemp', update)
      context.commit('setOpendataBarTemp', update)
    }
  },
  strict: false // process.env.NODE_ENV !== 'production'
})

export default store
