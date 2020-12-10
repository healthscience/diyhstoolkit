import Vue from 'vue'
import ToolkitUtility from '@/mixins/toolkitUtility.js'
import moment from 'moment'
const ToolUtility = new ToolkitUtility()

export default {
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  getters: {
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      this.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      const backJSON = JSON.parse(message.data)
      console.log(backJSON)
      if (backJSON.stored === true) {
        // success in saving reference contract
        // what type of save?
        if (backJSON.type === 'module') {
          this.state.moduleGenesisList.push(backJSON)
          // keep track of how many modules
          this.state.lengthMholder--
          if (this.state.lengthMholder === 0) {
            this.state.moduleListEnd = true
          }
          this.state.lengthMholderj--
          if (this.state.lengthMholderj === 1) {
            this.state.moduleJoinedListEnd = true
          }
          if (this.state.moduleJoinedListEnd === true) {
            // pass to Network Library Composer to make New Network Experiment Reference Contract ie. extract genesis module contract keys
            const prepareNXPrefcont = {}
            prepareNXPrefcont.type = 'library'
            prepareNXPrefcont.reftype = 'joinexperiment'
            prepareNXPrefcont.action = 'joinexperiment'
            prepareNXPrefcont.data = this.state.moduleGenesisList
            const referenceContractReady = JSON.stringify(prepareNXPrefcont)
            Vue.prototype.$socket.send(referenceContractReady)
          }
        } else if (backJSON.type === 'experiment') {
          // what is the state of the experiment Genesis or Joined?
          if (backJSON.contract.concept.state === 'joined') {
            // set the state of the experiment for the dashboard
            // set the exeriment status object i.e. add to list
            // context.commit('SET_EXP_JOINLIST', joinNXP)
            // SET_EXP_JOINLIST (state, inVerified) {
            // set state for experiment just joined
            let experBundle = {}
            experBundle.cnrl = backJSON.key
            experBundle.status = false
            experBundle.active = false
            experBundle.contract = backJSON.contract
            experBundle.modules = backJSON.expanded
            let objectPropC = backJSON.key
            Vue.set(this.state.experimentStatus, objectPropC, experBundle)
            // }
            // set local state exp expaneded
            let newFormed = {}
            newFormed.key = backJSON.key
            newFormed.value = backJSON.contract
            let addExpMod = {}
            addExpMod.exp = newFormed
            addExpMod.modules = backJSON.expanded
            this.state.networkPeerExpModules.push(addExpMod)
            // standard from key value
            let standardExp = {}
            standardExp.exp = backJSON
            standardExp.modules = backJSON.expanded
            // need to add to joined list of experiments
            let newExpJoinedDataItem = ToolUtility.prepareExperimentSummarySingle(standardExp)
            this.state.joinedNXPlist.data.push(newExpJoinedDataItem)
          } else {
            // genesis contract
            let newFormed = {}
            newFormed.key = backJSON.key
            newFormed.value = backJSON.contract
            let standardExp = {}
            standardExp.exp = newFormed
            standardExp.modules = backJSON.expanded
            // add to local modules ref contract list
            this.state.networkExpModules.push(standardExp)
            let newExpGenesisDataItem = ToolUtility.prepareExperimentSummarySingleGenesis(standardExp)
            this.state.NXPexperimentList.data.push(newExpGenesisDataItem)
            // need to set toolbar settings TODO
          }
        }
      } else if (backJSON.type === 'publickey') {
        this.state.publickeys.push(backJSON.pubkey)
      } else if (backJSON.type === 'new-peer') {
        this.state.warmNetwork.push(backJSON.data.value)
      } else if (backJSON.type === 'warm-peers') {
        this.state.warmNetwork = []
        for (let wp of backJSON.data) {
          this.state.warmNetwork.push(wp.value)
        }
      } else if (backJSON.type === 'modulesTemp') {
        this.state.nxpModulesList = backJSON.data
        if (this.state.moduleListEnd === true) {
          // pass to Network Library Composer to make New Network Experiment Reference Contract ie. extract genesis module contract keys
          const prepareNXPrefcont = {}
          prepareNXPrefcont.type = 'library'
          prepareNXPrefcont.reftype = 'genesisexperiment'
          prepareNXPrefcont.action = 'genesisexperiment'
          prepareNXPrefcont.data = this.state.moduleGenesisList
          const referenceContractReady = JSON.stringify(prepareNXPrefcont)
          Vue.prototype.$socket.send(referenceContractReady)
        }
      } else if (backJSON.type === 'extractexperimentmodules') {
        Vue.set(this.state.joinNXPlive, 'data', backJSON.data)
        Vue.set(this.state.joinNXPlive, 'compute', backJSON.compute)
        Vue.set(this.state.joinNXPlive, 'visualise', backJSON.visualise)
        // set dataModule
        // set vis tools
        let tempNew = {}
        tempNew.shellID = '1234567'
        tempNew.moduleCNRL = 'cnrl-001234543458'
        tempNew.mData = '98889'
        Vue.set(this.state.newNXshell, 'tempshell', tempNew.shellID)
        let setVisTools = {}
        setVisTools[tempNew.mData] = { text: 'open tools', active: true }
        Vue.set(this.state.toolbarVisStatus, tempNew.moduleCNRL, setVisTools)
        let setToolbar = {}
        setToolbar[tempNew.mData] = { text: 'open data', active: true }
        Vue.set(this.state.opendataTools, tempNew.moduleCNRL, setToolbar)
        /* this.$store.dispatch('actionSetDataRefContract', dataMod)
        this.$store.dispatch('actionSetTempToolbarVis', tempNew)
        this.$store.dispatch('actionSetVisualiseRefContract', visMod) */
      } else if (backJSON.safeflow === true) {
        // safeFLOW inflow
        if (backJSON.type === 'auth') {
          // get starting experiments
          const refContractp = {}
          refContractp.type = 'library'
          refContractp.reftype = 'publiclibrary'
          refContractp.action = 'GET'
          const refCJSONp = JSON.stringify(refContractp)
          Vue.prototype.$socket.send(refCJSONp)
          // network library updates?
          const refContract = {}
          refContract.type = 'library'
          refContract.reftype = 'privatelibrary'
          refContract.action = 'GET'
          const refCJSON = JSON.stringify(refContract)
          Vue.prototype.$socket.send(refCJSON)
        }
      } else if (backJSON.type === 'ecssummary') {
        // context.commit('SET_ENTITY_RETURN', entityReturn)
        // Vue.set(this.state.entityUUIDReturn, mo.key, setToolbar)
        this.state.entityUUIDReturn = backJSON.data[this.state.liveNXP].shellID
        this.state.entityUUIDsummary = backJSON
      } else if (backJSON.type === 'newEntity') {
        // format data for DashBoard
        console.log(backJSON)
        let mod = []
        if (this.state.entityUUIDReturn === undefined) {
          mod = this.state.nxpModulesLive
        } else {
          // only update modules returned
          mod = this.state.entityUUIDsummary.data[this.state.liveNXP].modules
        }
        // remove existing vis component if in single mode (default)
        // context.commit('setClearGrid')
        // update or first time
        let displayReady = ToolUtility.displayModules(mod, backJSON)
        // set the devices live for this experiment
        this.state.devicesLive = backJSON.devices
        // context.commit('setLiveDisplayNXPModules', displayReady)
        // set the GRID layout and module data
        this.state.moduleGrid = displayReady.grid
        // prepare toolbar status object
        // set toolbar display area per module
        // context.commit('setToolbarState', mod)
        for (let mo of mod) {
          let setToolbar = { text: 'show', active: false }
          Vue.set(this.state.toolbarStatus, mo.key, setToolbar)
        }
        // display progress message while waiting data
        // context.commit('setVisProgressStart', displayReady)
        let setVisProg = {}
        let moduleKeys = Object.keys(displayReady.grid)
        for (let mod of moduleKeys) {
          for (let dti of displayReady.grid[mod]) {
            setVisProg[dti.i] = { text: 'Preparing visualisation', active: false }
          }
          Vue.set(this.state.visProgress, mod, setVisProg)
          setVisProg = {}
        }
        // context.commit('setVisToolbarState', displayReady)
        let setVistoolbar = {}
        let moduleKeys1 = Object.keys(displayReady.grid)
        for (let mod of moduleKeys1) {
          for (let dti of displayReady.grid[mod]) {
            setVistoolbar[dti.i] = { text: 'open tools', active: true }
          }
          Vue.set(this.state.toolbarVisStatus, mod, setVistoolbar)
          setVistoolbar = {}
        }
        // open data toolbar display
        // context.commit('setOpendataState', displayReady)
        let setOpendata = {}
        let moduleKeys2 = Object.keys(displayReady.grid)
        for (let mod of moduleKeys2) {
          for (let dti of displayReady.grid[mod]) {
            setOpendata[dti.i] = { text: 'open data', active: false }
          }
          Vue.set(this.state.opendataTools, mod, setOpendata)
          setOpendata = {}
        }
        // active display of progress message
        // context.commit('setVisProgressComplete', displayReady)
        let setProgress2 = {}
        setProgress2[displayReady.mData] = { text: 'Preparing visualisation', active: false }
        Vue.set(this.state.visProgress, displayReady.moduleCNRL, setProgress2)
        // context.commit('setProgressComplete', this.state.liveNXP)
        let setProgress3 = { text: 'Experiment in progress', active: false }
        Vue.set(this.state.nxpProgress, this.state.liveNXP, setProgress3)
        Vue.set(this.state.NXPexperimentData, this.state.liveNXP, displayReady.data)
        // extract out the time
        for (let mmod of mod) {
          if (mmod.value.type === 'compute') {
            let newStartTime = 0
            if (this.state.timeStartperiod === 0) {
              newStartTime = mmod.value.info.controls.date
              // context.commit('setTimeAsk', newStartTime)
              this.state.timeStartperiod = newStartTime
            }
          }
        }
        // set data for open data toolbar
        let packContract = {}
        for (let pack of this.state.liveRefContIndex.packaging) {
          if (displayReady.modules.packaging === pack.key) {
            packContract = pack
          }
        }
        this.state.refcontractPackaging.push(packContract)
      } else if (backJSON.type === 'newEntityRange') {
        let matchExpRefContract = ToolUtility.matchExpModulesDetail(backJSON.context.key, this.state.networkPeerExpModules)
        let matchModeType = ToolUtility.matchModuleType('visualise', matchExpRefContract.modules)
        let matchModeTypeCompute = ToolUtility.matchModuleType('compute', matchExpRefContract.modules)
        // one data set per char tor many datasets?
        if (backJSON.devices.length === 1) {
          // how many datatypes?
          if (matchModeType.value.info.settings.yaxis.length !== 1) {
            let updateDisplayOne = ToolUtility.displaySpaceUpdateSingle(this.state.NXPexperimentData[backJSON.context.key], backJSON.data)
            // update the liveData
            Vue.set(this.state.NXPexperimentData[backJSON.context.key][updateDisplayOne.module].data, updateDisplayOne.identifier[0], updateDisplayOne.update)
          } else {
            console.log('one device single datatype')
          }
        } else {
          // many devices
          if (matchModeType.value.info.settings.yaxis.length !== 1) {
            let updateDisplayRange = ToolUtility.displayManySpaceUpdate(this.state.NXPexperimentData[backJSON.context.key], backJSON.data, matchModeType, matchModeTypeCompute)
            // set the grid, data and toolbar settings
            // update the display grid
            let uniqueGrid = []
            for (let gup of updateDisplayRange.grid) {
              let alreadySpace = this.state.moduleGrid[updateDisplayRange.module].find(obj => obj.i === gup.i)
              if (alreadySpace === undefined) {
                uniqueGrid.push(gup)
              }
            }
            for (let gup of uniqueGrid) {
              this.state.moduleGrid[updateDisplayRange.module].push(gup)
            }
            // update tools id reference
            Vue.set(this.state.opendataTools, updateDisplayRange.module, updateDisplayRange.opendata)
            // update toolbar vis status
            Vue.set(this.state.toolbarVisStatus, updateDisplayRange.module, updateDisplayRange.vistoolbar)
            // update vis data
            Vue.set(this.state.NXPexperimentData[backJSON.context.key][updateDisplayRange.module], 'data', updateDisplayRange.update)
            /* let updateDisplayOne = ToolUtility.displayUpdateSpaceSingle(this.state.NXPexperimentData[backJSON.context.key], backJSON.data)
            // update the liveData
            Vue.set(this.state.NXPexperimentData[backJSON.context.key][updateDisplayOne.module].data, updateDisplayOne.identifier[0], updateDisplayOne.update) */
          } else {
            // many individual charts
            let updateDisplayRange = ToolUtility.displaySpaceUpdate(this.state.NXPexperimentData[backJSON.context.key], backJSON.data)
            // set the grid, data and toolbar settings
            // update the display grid
            let uniqueGrid = []
            for (let gup of updateDisplayRange.grid) {
              let alreadySpace = this.state.moduleGrid[updateDisplayRange.module].find(obj => obj.i === gup.i)
              if (alreadySpace === undefined) {
                uniqueGrid.push(gup)
              }
            }
            for (let gup of uniqueGrid) {
              this.state.moduleGrid[updateDisplayRange.module].push(gup)
            }
            // update tools id reference
            Vue.set(this.state.opendataTools, updateDisplayRange.module, updateDisplayRange.opendata)
            // update toolbar vis status
            Vue.set(this.state.toolbarVisStatus, updateDisplayRange.module, updateDisplayRange.vistoolbar)
            // update vis data
            Vue.set(this.state.NXPexperimentData[backJSON.context.key][updateDisplayRange.module], 'data', updateDisplayRange.update)
          }
        }
      } else if (backJSON.type === 'updateEntity') {
        console.log('update first')
        console.log(backJSON)
        // need to exactly update exp, module and grid ID of vis/chart data
        // prepare new data object
        let updateDisplay = ToolUtility.displaySpaceUpdate(this.state.NXPexperimentData[backJSON.context.cnrl], backJSON.data)
        // update the display grid
        Vue.set(this.state.moduleGrid, updateDisplay.module, updateDisplay.grid)
        // update tools id reference
        Vue.set(this.state.opendataTools, updateDisplay.module, updateDisplay.opendata)
        // update toolbar vis status
        Vue.set(this.state.toolbarVisStatus, updateDisplay.module, updateDisplay.vistoolbar)
        // update vid data
        Vue.set(this.state.NXPexperimentData[backJSON.context.cnrl][updateDisplay.module], 'data', updateDisplay.update)
      } else if (backJSON.type === 'updateEntityRange') {
        let matchExpRefContract = ToolUtility.matchExpModulesDetail(backJSON.context.cnrl, this.state.networkPeerExpModules)
        let matchModeType = ToolUtility.matchModuleType('visualise', matchExpRefContract.modules)
        let matchModeTypeCompute = ToolUtility.matchModuleType('compute', backJSON.context.modules)
        // one data set per char tor many datasets?
        // single chart display
        if (backJSON.devices.length === 1) {
          // how many datatypes?
          if (matchModeType.value.info.settings.yaxis.length !== 1) {
            let updateDisplayOne = ToolUtility.displaySpaceUpdateSingle(this.state.NXPexperimentData[backJSON.context.key], backJSON.data)
            // update the liveData
            Vue.set(this.state.NXPexperimentData[backJSON.context.key][updateDisplayOne.module].data, updateDisplayOne.identifier[0], updateDisplayOne.update)
          } else {
            console.log('one device single datatype')
          }
        } else {
          // many devices
          if (matchModeType.value.info.settings.yaxis.length !== 1) {
            let updateDisplayRange = ToolUtility.displayManySpaceUpdate(this.state.NXPexperimentData[backJSON.context.cnrl], backJSON.data, matchModeType, matchModeTypeCompute)
            // set the grid, data and toolbar settings
            // update the display grid
            let uniqueGrid = []
            for (let gup of updateDisplayRange.grid) {
              let alreadySpace = this.state.moduleGrid[updateDisplayRange.module].find(obj => obj.i === gup.i)
              if (alreadySpace === undefined) {
                uniqueGrid.push(gup)
              }
            }
            for (let gup of uniqueGrid) {
              this.state.moduleGrid[updateDisplayRange.module].push(gup)
            }
            // update tools id reference
            Vue.set(this.state.opendataTools, updateDisplayRange.module, updateDisplayRange.opendata)
            // update toolbar vis status
            Vue.set(this.state.toolbarVisStatus, updateDisplayRange.module, updateDisplayRange.vistoolbar)
            // update vis data
            Vue.set(this.state.NXPexperimentData[backJSON.context.cnrl][updateDisplayRange.module], 'data', updateDisplayRange.update)
            // update the liveData
            // Vue.set(this.state.NXPexperimentData[backJSON.context.cnrl][updateDisplayOne.module].data, updateDisplayOne.identifier[0], updateDisplayOne.update)
          } else {
            // many individual charts
            let updateDisplayRange = ToolUtility.displaySpaceUpdate(this.state.NXPexperimentData[backJSON.context.cnrl], backJSON.data)
            // set the grid, data and toolbar settings
            // update the display grid
            let uniqueGrid = []
            for (let gup of updateDisplayRange.grid) {
              let alreadySpace = this.state.moduleGrid[updateDisplayRange.module].find(obj => obj.i === gup.i)
              if (alreadySpace === undefined) {
                uniqueGrid.push(gup)
              }
            }
            for (let gup of uniqueGrid) {
              this.state.moduleGrid[updateDisplayRange.module].push(gup)
            }
            // update tools id reference
            Vue.set(this.state.opendataTools, updateDisplayRange.module, updateDisplayRange.opendata)
            // update toolbar vis status
            Vue.set(this.state.toolbarVisStatus, updateDisplayRange.module, updateDisplayRange.vistoolbar)
            // update vis data
            Vue.set(this.state.NXPexperimentData[backJSON.context.cnrl][updateDisplayRange.module], 'data', updateDisplayRange.update)
          }
        }
      } else if (backJSON.type === 'displayEmpty') {
        console.log('no day show empty toolbar')
        console.log(backJSON)
        this.state.ecsMessageLive = 'no data available'
      } else if (backJSON.type === 'peerprivate') {
        // peer private library contracts
        this.state.livePeerRefContIndex = backJSON.referenceContracts
        this.state.networkPeerExpModules = backJSON.networkPeerExpModules
        for (let exl of backJSON.networkPeerExpModules) {
          let experBundle = {}
          experBundle.cnrl = exl.exp.key
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = exl.exp
          experBundle.modules = exl.modules
          let objectPropC = exl.exp.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
        }
        for (let nxp of backJSON.networkPeerExpModules) {
          let setProgress = { text: 'Experiment in progress', active: false }
          Vue.set(this.state.nxpProgress, nxp.exp.key, setProgress)
        }
        // prepare PEER JOINED LIST
        let gridPeer = ToolUtility.prepareJoinedNXPlist(backJSON.networkPeerExpModules)
        this.state.joinedNXPlist = gridPeer
      } else if (backJSON.type === 'publiclibrary') {
        // save copy of ref contract indexes
        this.state.liveRefContIndex = backJSON.referenceContracts
        // prepare NPXs in NETWORK
        this.state.networkExpModules = backJSON.networkExpModules
        // this.state.networkPeerExpModules = backJSON.networkPeerExpModules
        let gridAnnon = ToolUtility.prepareAnnonNXPlist(backJSON.networkExpModules)
        this.state.NXPexperimentList = gridAnnon
        // set the dashboard toolbar status settings
        for (let exl of backJSON.networkExpModules) {
          let experBundle = {}
          experBundle.cnrl = exl.exp.key
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = exl.exp
          experBundle.modules = exl.modules
          let objectPropC = exl.exp.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
        }
      }
    },
    SET_QUESTION_REFCONTRACT (state, inVerified) {
      // build Question module data structure
      let questionStrucure = {}
      questionStrucure.moduleinfo = inVerified.module
      questionStrucure.question = inVerified.question
      this.state.refcontractQuestion = questionStrucure
    },
    SET_PACKAGING_REFCONTRACT (state, inVerified) {
      // add to module list full detail
      this.state.moduleHolder.push(inVerified)
      // add to module list
      this.state.newNXPmakeRefs.push(inVerified.moduleinfo.refcont)
      // feedback on option for UI
      this.state.refcontractPackaging.push(inVerified.option)
    },
    SET_COMPUTE_REFCONTRACT (state, inVerified) {
      // add to module list full details
      this.state.moduleHolder.push(inVerified)
      this.state.newNXPmakeRefs.push(inVerified.moduleinfo.refcont)
      this.state.refcontractCompute.push(inVerified)
    },
    SET_VISUALISE_REFCONTRACT (state, inVerified) {
      // add to module list full details
      this.state.moduleHolder.push(inVerified)
      this.state.newNXPmakeRefs.push(inVerified.moduleinfo.refcont)
      this.state.refcontractVisualise.push(inVerified)
    },
    SET_NXP_REFCONTRACT (state, inVerified) {
      this.state.nxpRefContract = inVerified
    },
    SET_NEWNXP_VISDEVICES (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'devices', inVerified)
    },
    SET_NEWNXP_VISCOMPUTE (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'compute', inVerified)
    },
    SET_NEWNXP_VISRESULTS (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'visualise', inVerified)
    },
    SET_NEWNXP_VISXAXIS (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'xaxis', inVerified)
    },
    SET_NEWNXP_VISYAXIS (state, inVerified) {
      // y axis can hold many datatypes
      this.state.visModuleHolder.yaxis = inVerified
    },
    SET_NEWNXP_VISCATEGORY (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'category', inVerified)
    },
    SET_NEWNXP_VISTIME (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'timeperiod', inVerified)
    },
    SET_NEWNXP_VISRESOLUTION (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'resolution', inVerified)
    },
    SET_MODULE_LIST (state, inVerified) {
      this.state.nxpModulesList = inVerified
    },
    SET_QUESTION_MODULE (state, inVerified) {
      this.state.moduleHolder.push(this.state.refcontractQuestion)
      this.state.newNXPmakeRefs.push(this.state.refcontractQuestion.moduleinfo.refcont)
    },
    SET_JOIN_NXP_SOURCE (state, inVerified) {
      Vue.set(this.state.joinNXPselected, 'data', inVerified)
      // lookup details for this packaging contract
      let packContract = {}
      for (let pack of this.state.liveRefContIndex.packaging) {
        if (inVerified === pack.key) {
          packContract = pack
        }
      }
      this.state.refcontractPackaging.push(packContract)
    },
    SET_DATE_STARTNXP (state, inVerified) {
      // ECS use ms time only, please convert
      let timeFormat = moment(inVerified).valueOf()
      Vue.set(this.state.joinNXPselected.compute, 'date', timeFormat)
    },
    SET_JOIN_NXP_COMPUTE_CONTROLS (state, inVerified) {
      Vue.set(this.state.joinNXPselected.compute, 'controls', inVerified)
    },
    SET_JOIN_NXP_COMPUTE_AUTO (state, inVerified) {
      Vue.set(this.state.joinNXPselected.compute, 'automate', inVerified)
    },
    NEW_NXP_SHELL (state, inVerified) {
      Vue.set(this.state.newNXshell, 'tempshell', inVerified)
    },
    SET_VISTOOLS_TEMP (state, inVerified) {
      let setVisTools = {}
      setVisTools[inVerified.mData] = { text: 'open tools', active: true }
      Vue.set(this.state.toolbarVisStatus, inVerified.moduleCNRL, setVisTools)
    },
    SETOPEN_DATABAR_TEMP (state, inVerified) {
      let setToolbar = {}
      setToolbar[inVerified.mData] = { text: 'open data', active: true }
      Vue.set(this.state.opendataTools, inVerified.moduleCNRL, setToolbar)
    },
    SET_MODULE_HOLDER (state, inVerified) {
      this.state.moduleHolder = []
      this.state.refcontractPackaging = []
    }
  },
  actions: {
    sendMessage (context, message) {
      let prepareRefContract = {}
      if (message.reftype === 'new-datatype') {
        const localData = this.state.newRefcontractForm
        prepareRefContract = this.state.livesafeFLOW.refcontComposerLive.datatypeRefLive.dataTypePrepare(localData)
      } else if (message.reftype === 'new-packaging') {
        prepareRefContract = this.state.livesafeFLOW.refcontComposerLive.packagingRefLive.packagingPrepare(this.state.newPackingForm)
      } else if (message.reftype === 'new-compute') {
        prepareRefContract = this.state.livesafeFLOW.refcontComposerLive.computeRefLive.computePrepare(this.state.newComputeForm)
      } else if (message.reftype === 'new-visualise') {
        prepareRefContract = this.state.livesafeFLOW.refcontComposerLive.visualiseRefLive.visualisePrepare(this.state.newVisualiseForm)
      }
      const referenceContractReady = JSON.stringify(prepareRefContract)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    actionKeymanagement (context, message) {
      this.state.publickeys = []
      const pubkeyGet = {}
      pubkeyGet.type = 'library'
      pubkeyGet.reftype = 'keymanagement'
      Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
    },
    actionWarmPeers (context, message) {
      let getWarmPeers = {}
      getWarmPeers.type = 'library'
      getWarmPeers.reftype = 'warm-peers'
      Vue.prototype.$socket.send(JSON.stringify(getWarmPeers))
    },
    actionGetRefContract (context, message) {
      Vue.prototype.$socket.send(message)
    },
    actionLibraryPublickey (context, message) {
      const pubkeyGet = {}
      pubkeyGet.type = 'library'
      pubkeyGet.reftype = 'viewpublickey'
      Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
    },
    actionPeersynclibrary (context, message) {
      const peerSync = {}
      peerSync.type = 'library'
      peerSync.reftype = 'replicatekey'
      peerSync.publickey = message
      const peerSyncJSON = JSON.stringify(peerSync)
      Vue.prototype.$socket.send(peerSyncJSON)
    },
    actionAddwarmPeer (context, message) {
      Vue.prototype.$socket.send(message)
    },
    actionMakeVisualiseRefContract (context, message) {
      // Vue.prototype.$socket.send(message)
    },
    actionMakeModuleRefContract (context, update) {
      // reset the module forms
      context.commit('SET_MODULE_HOLDER')
      const moduleContracts = []
      const dataCNRLbundle = {}
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      dataCNRLbundle.reftype = 'module'
      dataCNRLbundle.type = 'question'
      dataCNRLbundle.primary = 'genesis'
      dataCNRLbundle.description = 'Question for network experiment'
      dataCNRLbundle.concept = ''
      dataCNRLbundle.grid = []
      moduleContracts.push(dataCNRLbundle)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle2 = {}
      dataCNRLbundle2.reftype = 'module'
      dataCNRLbundle2.type = 'data'
      dataCNRLbundle2.primary = 'genesis'
      dataCNRLbundle2.description = 'data source(s) for network experiment'
      dataCNRLbundle2.grid = []
      moduleContracts.push(dataCNRLbundle2)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle3 = {}
      dataCNRLbundle3.reftype = 'module'
      dataCNRLbundle3.type = 'device'
      dataCNRLbundle3.primary = 'genesis'
      dataCNRLbundle3.concept = ''
      dataCNRLbundle3.grid = []
      moduleContracts.push(dataCNRLbundle3)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle4 = {}
      dataCNRLbundle4.reftype = 'module'
      dataCNRLbundle4.type = 'mobile'
      dataCNRLbundle4.primary = 'genesis'
      dataCNRLbundle4.concept = ''
      dataCNRLbundle4.grid = []
      moduleContracts.push(dataCNRLbundle4)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle6 = {}
      dataCNRLbundle6.reftype = 'module'
      dataCNRLbundle6.type = 'compute'
      dataCNRLbundle6.primary = 'genesis'
      dataCNRLbundle6.concept = ''
      dataCNRLbundle6.grid = []
      dataCNRLbundle6.dtcompute = []
      dataCNRLbundle6.dtresult = []
      dataCNRLbundle6.category = []
      dataCNRLbundle6.compute = ''
      dataCNRLbundle6.controlpanel = []
      dataCNRLbundle6.automation = false
      dataCNRLbundle6.time = { realtime: 0, timeseg: [], startperiod: '' }
      moduleContracts.push(dataCNRLbundle6)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle5 = {}
      dataCNRLbundle5.reftype = 'module'
      dataCNRLbundle5.type = 'visualise'
      dataCNRLbundle5.primary = 'genesis'
      dataCNRLbundle5.grid = []
      moduleContracts.push(dataCNRLbundle5)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle7 = {}
      dataCNRLbundle7.reftype = 'module'
      dataCNRLbundle7.type = 'education'
      dataCNRLbundle7.primary = 'genesis'
      dataCNRLbundle7.concept = ''
      dataCNRLbundle7.grid = []
      moduleContracts.push(dataCNRLbundle7)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle8 = {}
      dataCNRLbundle8.reftype = 'module'
      dataCNRLbundle8.type = 'lifestyle'
      dataCNRLbundle8.primary = 'genesis'
      dataCNRLbundle8.concet = ''
      dataCNRLbundle8.grid = []
      moduleContracts.push(dataCNRLbundle8)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle9 = {}
      dataCNRLbundle9.reftype = 'module'
      dataCNRLbundle9.type = 'error'
      dataCNRLbundle9.primary = 'genesis'
      dataCNRLbundle9.concept = ''
      dataCNRLbundle9.grid = []
      moduleContracts.push(dataCNRLbundle9)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle10 = {}
      dataCNRLbundle10.reftype = 'module'
      dataCNRLbundle10.type = 'control'
      dataCNRLbundle10.primary = 'genesis'
      dataCNRLbundle10.concept = ''
      dataCNRLbundle10.grid = []
      moduleContracts.push(dataCNRLbundle10)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle11 = {}
      dataCNRLbundle11.reftype = 'module'
      dataCNRLbundle11.type = 'prescription'
      dataCNRLbundle11.primary = 'genesis'
      dataCNRLbundle11.concept = ''
      dataCNRLbundle11.grid = []
      moduleContracts.push(dataCNRLbundle11)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle12 = {}
      dataCNRLbundle12.reftype = 'module'
      dataCNRLbundle12.type = 'communication'
      dataCNRLbundle12.primary = 'genesis'
      dataCNRLbundle12.concept = ''
      dataCNRLbundle12.grid = []
      moduleContracts.push(dataCNRLbundle12)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle13 = {}
      dataCNRLbundle13.reftype = 'module'
      dataCNRLbundle13.type = 'idea'
      dataCNRLbundle13.primary = 'genesis'
      dataCNRLbundle13.concept = ''
      dataCNRLbundle13.grid = []
      moduleContracts.push(dataCNRLbundle13)
      let tempModules = {}
      tempModules.type = 'library'
      tempModules.reftype = 'moduletemp'
      tempModules.action = 'moduletemp'
      tempModules.data = moduleContracts
      // send to Library to create new temp modules
      const newTempModules = JSON.stringify(tempModules)
      Vue.prototype.$socket.send(newTempModules)
    },
    actionSetQuestionRefContract (context, update) {
      context.commit('SET_QUESTION_REFCONTRACT', update)
    },
    actionSetDataRefContract (context, update) {
      let refContractLookup = ToolUtility.refcontractLookup(update.refcont, this.state.liveRefContIndex.packaging)
      update.option = refContractLookup
      context.commit('SET_PACKAGING_REFCONTRACT', update)
    },
    actionSetComputeRefContract (context, update) {
      let refContractLookup = ToolUtility.refcontractLookup(update.refcont, this.state.liveRefContIndex.compute)
      update.option = refContractLookup
      context.commit('SET_COMPUTE_REFCONTRACT', update)
    },
    actionSetTempToolbarVis (context, update) {
      // context.commit('NEW_NXP_SHELL', update.shellID)
      // context.commit('SET_VISTOOLS_TEMP', update)
      // context.commit('SETOPEN_DATABAR_TEMP', update)
    },
    actionSetVisualiseRefContract (context, update) {
      // loop up vis contract details
      let refContractLookup = ToolUtility.refcontractLookup(update.refcont, this.state.liveRefContIndex.visualise)
      update.option = refContractLookup
      context.commit('SET_VISUALISE_REFCONTRACT', update)
      // need to set Temporary vis toolbar settings
      context.commit('NEW_NXP_SHELL', update.shellID)
      context.commit('SET_VISTOOLS_TEMP', update)
      context.commit('SETOPEN_DATABAR_TEMP', update)
    },
    actionMakeKBIDtemplate (context, message) {
      let prepareKBIDtemplate = this.state.livesafeFLOW.kbidComposerLive.kbidTemplateNew(message)
      const kbidTemplateReady = JSON.stringify(prepareKBIDtemplate)
      console.log(kbidTemplateReady)
      // Vue.prototype.$socket.send(kbidTemplateReady)
    },
    actionMakeKBIDentry (context, message) {
      let prepareKBIDentry = this.state.livesafeFLOW.kbidComposerLive.kbidEntry(message)
      const kbidEntryReady = JSON.stringify(prepareKBIDentry)
      Vue.prototype.$socket.send(kbidEntryReady)
    },
    sourceDataExperiment (context, update) {
      context.commit('SET_JOIN_NXP_SOURCE', update)
    },
    buildRefComputeControls (context, update) {
      context.commit('SET_JOIN_NXP_COMPUTE_CONTROLS', update)
    },
    buildRefComputeAutomation (context, update) {
      context.commit('SET_JOIN_NXP_COMPUTE_AUTO', update)
    },
    actionNewVisDevice (context, update) {
      context.commit('SET_NEWNXP_VISDEVICES', update)
    },
    actionNewVisCompute (context, update) {
      context.commit('SET_NEWNXP_VISCOMPUTE', update)
    },
    actionNewVisResults (context, update) {
      context.commit('SET_NEWNXP_VISRESULTS', update)
    },
    actionNewVisXaxis (context, update) {
      context.commit('SET_NEWNXP_VISXAXIS', update)
    },
    actionNewVisYaxis (context, update) {
      context.commit('SET_NEWNXP_VISYAXIS', update)
    },
    actionNewVisCategory (context, update) {
      context.commit('SET_NEWNXP_VISCATEGORY', update)
    },
    actionNewVisTime (context, update) {
      context.commit('SET_NEWNXP_VISTIME', update)
    },
    actionNewVisResolution (context, update) {
      context.commit('SET_NEWNXP_VISRESOLUTION', update)
    },
    actionCalendarDate (context, update) {
      if (update.text === 'data-start') {
        context.commit('SET_DATE_STARTNXP', update.selectDate)
      }
    },
    actionNewNXPrefcontract (context, update) {
      // add the question module
      context.commit('SET_QUESTION_MODULE')
      // prepare the genesis modules please
      // loop over list of module contract to make genesis ie first
      // this.state.lengthMholder = this.state.moduleHolder.length
      // bring together genesis experiment ref contracts & defauts
      let setNewNXPplusModules = {}
      setNewNXPplusModules.type = 'library'
      setNewNXPplusModules.reftype = 'newexperimentmodule'
      setNewNXPplusModules.action = 'newexperimentmodule'
      setNewNXPplusModules.data = this.state.moduleHolder
      const genesisNXPjson = JSON.stringify(setNewNXPplusModules)
      Vue.prototype.$socket.send(genesisNXPjson)
    },
    actionJoinExperiment (context, update) {
      // map experiment refcont to genesis contract
      // make first module contracts for this peer to record start and other module refs with new computations
      const genesisExpRefCont = this.state.joinNXPlive.experiment
      // send to Library to create new experiment and modules for peer
      let dataChoices = {}
      dataChoices.exp = genesisExpRefCont
      let optionsSelected = {}
      optionsSelected.data = this.state.joinNXPselected.data
      optionsSelected.compute = this.state.joinNXPselected.compute
      optionsSelected.visualise = this.state.visModuleHolder
      dataChoices.options = optionsSelected
      let newJoinExperiment = {}
      newJoinExperiment.type = 'library'
      newJoinExperiment.reftype = 'joinexperiment'
      newJoinExperiment.action = 'joinexperiment'
      newJoinExperiment.data = dataChoices
      let ExpmoduleRefContract = JSON.stringify(newJoinExperiment)
      Vue.prototype.$socket.send(ExpmoduleRefContract)
    }
  }
}
