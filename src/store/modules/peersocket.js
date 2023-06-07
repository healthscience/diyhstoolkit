import Vue from 'vue'
import ToolkitUtility from '@/mixins/toolkitUtility.js'
import VisToolsUtility from '@/mixins/visualUtility.js'
import ContextUtility from '@/mixins/contextUtility.js'
import moment from 'moment'
// import { configureRequestOptions } from 'builder-util-runtime'
const ToolUtility = new ToolkitUtility()
const VisualUtility = new VisToolsUtility()
const ValidateUtility = new ContextUtility()

export default {
  state: {
    backdatacount: 0,
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    },
    startPeerRefContracts: [],
    HOPreturn: {
      publiclib: false,
      peerlib: false
    },
    HOPHolder: {},
    libraryHolder:
    {
      bentospacestart: {},
      publiclibrary: {},
      peerlibrary: {}
    },
    testHolder: {}

  },
  getters: {
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      this.$socket = event.currentTarget
      state.socket.isConnected = true
      this.state.socketClosed = false
      this.state.connectStatus = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
      this.state.connectStatus = false
      this.state.peerauthStatus = false
      this.state.socketClosed = true
      this.dispatch('actionDisconnect')
    },
    SOCKET_ONERROR (state, event) {
      this.state.socketClosed = true
      this.state.connectStatus = false
      this.state.peerauthStatus = false
      // remote.getCurrentWindow().close()
      // inform Peer connection to network lost
      this.dispatch('actionDisconnect')
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      // console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
      this.state.peerauthStatus = false
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      let backJSON = {}
      backJSON = JSON.parse(message.data)
      // console.log('===****HOP--INPUT******===')
      // console.log(backJSON)
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
            prepareNXPrefcont.jwt = this.state.jwttoken
            const referenceContractReady = JSON.stringify(prepareNXPrefcont)
            Vue.prototype.$socket.send(referenceContractReady)
          }
        } else if (backJSON.type === 'experiment-new') {
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
        } else if (backJSON.contract === 'new-joinboard') {
          // what is the state of the experiment Genesis or Joined?
          // set the state of the experiment for the dashboard
          // set the exeriment status object i.e. add to list
          // context.commit('SET_EXP_JOINLIST', joinNXP)
          // SET_EXP_JOINLIST (state, inVerified)
          // set state for experiment just joined
          let experBundle = {}
          experBundle.cnrl = backJSON.key
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = backJSON.data.board.contract
          experBundle.modules = backJSON.data.modules
          let objectPropC = backJSON.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
          // set local state exp expaneded
          /* let newFormed = {}
          newFormed.key = backJSON.key
          newFormed.value = backJSON.data.board.contract.modules */
          let addExpMod = {}
          addExpMod.key = backJSON.key // rename key
          addExpMod.modules = backJSON.data.modules // backJSON.data.board.contract.modules // backJSON.data.modules
          this.state.networkPeerExpModules.push(addExpMod)
          // standard from key value
          let standardExp = {}
          standardExp.exp = backJSON.key
          standardExp.modules = backJSON.data.modules
          // need to add to joined list of experiments
          let newExpJoinedDataItem = ToolUtility.prepareExperimentSummarySingle(standardExp)
          Vue.set(this.state.joinedNXPlist, 'columns', newExpJoinedDataItem.columns)
          Vue.set(this.state.joinedNXPlist, 'data', [])
          this.state.joinedNXPlist.data.push(newExpJoinedDataItem.data)
        } else if (backJSON.contract === 'new-genesisboard') {
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
        } else if (backJSON.type === 'solospaces') {
          this.dispatch('actionSavedLayout', backJSON.data.value.initialgrid, { root: true })
          this.dispatch('actionSavedSoloZoom', backJSON.data.value.solozoom, { root: true })
        }
      } else if (backJSON.type === 'bentospaces-list') {
        // the callback will be called whenever any of the watched object properties
        // now need to ask for data for the active bentospace boards's
        // set space zoom
        console.log(backJSON)
        if (backJSON.data !== null) {
          this.state.activeScalevalue = backJSON.data.value.zoom
        }
        // first check if any bentospaces list is provided
        if (backJSON.data.layout !== null) {
          let bentospaceStartList = Object.keys(backJSON.data.value.layout)
          Vue.set(this.state.livePeerRefContIndex, bentospaceStartList[0])
          let saveDash = Object.keys(backJSON.data.value.layout)
          if (saveDash.length > 0) {
            let boardKeys = Object.keys(backJSON.data.value.layout)
            for (let bkey of boardKeys) {
            // put data in library holder
              Vue.set(state.libraryHolder, 'bentospacestart', backJSON)
              // now ask HOP for more information: modulue, refContracts and data
              const refContract = {}
              refContract.type = 'library'
              refContract.reftype = 'privatelibrary'
              refContract.action = 'GET'
              refContract.data = bkey
              refContract.jwt = this.state.jwttoken
              const refCJSON = JSON.stringify(refContract)
              Vue.prototype.$socket.send(refCJSON)
            }
          }
        } else {
          // console.log('blank bentospace - empty')
          const refContract = {}
          refContract.type = 'library'
          refContract.reftype = 'privatelibrary-start'
          refContract.action = 'GET'
          refContract.data = 'first'
          refContract.jwt = this.state.jwttoken
          const refCJSON = JSON.stringify(refContract)
          Vue.prototype.$socket.send(refCJSON)
        }
      } else if (backJSON.type === 'solospaces-list') {
        // console.log(backJSON)
        // set in solospace  NB need to keep track of per board UUID, get solospace to ask HOP for new data
        if (backJSON?.data?.value !== undefined) {
          this.dispatch('actionSavedLayout', backJSON.data.value.initialgrid, { root: true })
          this.dispatch('actionSavedContext', backJSON.data.value.context, { root: true })
          this.dispatch('actionSavedSoloZoom', backJSON.data.value.solozoom, { root: true })
        }
      } else if (backJSON.type === 'bbai-reply') {
        console.log('beebee reply')
        console.log(backJSON)
        // flow messages to ai helper
        let date = new Date()
        // get the time as a string
        let time = date.toLocaleTimeString()
        Vue.set(this.state.aiInterface.caleaiReply, 'type', backJSON.data.type)
        Vue.set(this.state.aiInterface.caleaiReply, 'text', backJSON.data.text)
        Vue.set(this.state.aiInterface.caleaiReply, 'query', backJSON.data.query)
        Vue.set(this.state.aiInterface.caleaiReply, 'data', backJSON.data.data)
        Vue.set(this.state.aiInterface.caleaiReply, 'time', time)
        Vue.set(this.state.aiInterface.caleaiReply, 'active', true)
      } else if (backJSON.type === 'lifeboard') {
        if (backJSON.contract.concept.state === 'joined') {
        } else if (backJSON.contract.concept.state === 'add') {

        }
      } else if (backJSON.type === 'hyperdrive-pubkey') {
        Vue.set(this.state, 'publickeyHyperdrive', backJSON.data)
      } else if (backJSON.type === 'hyperbee-pubkeys') {
        this.state.publickeys = backJSON.data
        Vue.set(this.state, 'publickeys', [...backJSON.data])
      } else if (backJSON.type === 'open-library') {
        this.state.swarmStatus = true
      } else if (backJSON.type === 'replicate-publiclibrary') {
        Vue.set(this.state.replicatePubliclibrary, 'data', backJSON.data)
        // auto call add peer public library
        this.dispatch('actionViewSyncLibrary', 'replicate-publiclibrary')
        // replicate data results complete when temp library complete
        this.state.replicatDataStatus = false
      } else if (backJSON.type === 'publiclibraryaddcomplete') {
        // console.log('add to public library')
        // Vue.set(this.state., '', backJSON.data)
        // now call the peers public library to refresh contracts lists
        const refContractp = {}
        refContractp.type = 'library'
        refContractp.reftype = 'publiclibrary'
        refContractp.action = 'GET'
        refContractp.jwt = this.state.jwttoken
        const refCJSONp = JSON.stringify(refContractp)
        Vue.prototype.$socket.send(refCJSONp)
        // open up the join list
        this.dispatch('actionLifeview', 'publicexperiments', { root: true })
        this.dispatch('actionSpaceList', 'public', { root: true })
        this.dispatch('actionSpaceJoinListShow', true, { root: true })
      } else if (backJSON.type === 'replicatedata-publiclibrary') {
        this.state.tempNetworkLibrary = backJSON
        let gridAnnon = ToolUtility.prepareAnnonNXPlist(backJSON.networkExpModules)
        this.state.replicateNXPexperimentList = gridAnnon
        // now replicate reference contract to produce join list
        // match nxp id to full ref contract
        let fullnxpRefcontract = {}
        for (let nxpopt of this.state.replicateNXPexperimentList.data) {
          if (nxpopt.id === 'c77453057ebe97d24ae1ccbc67f774f70fd224f8') {
            fullnxpRefcontract = nxpopt
          }
        }
        let demoRefcontract1 = {}
        demoRefcontract1.type = 'addPlibrary'
        demoRefcontract1.nxpID = 'c77453057ebe97d24ae1ccbc67f774f70fd224f8'
        demoRefcontract1.nxpContract = fullnxpRefcontract
        this.dispatch('actionAddPubliclibrary', demoRefcontract1)
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
          prepareNXPrefcont.jwt = this.state.jwttoken
          const referenceContractReady = JSON.stringify(prepareNXPrefcont)
          Vue.prototype.$socket.send(referenceContractReady)
        }
      } else if (backJSON.type === 'extractexperimentmodules') {
        Vue.set(this.state.joinNXPlive, 'data', backJSON.data)
        Vue.set(this.state.joinNXPlive, 'compute', backJSON.compute)
        Vue.set(this.state.joinNXPlive, 'visualise', backJSON.visualise)
      } else if (backJSON.safeflow === true) {
        // safeFLOW inflow
        if (backJSON.type === 'auth-hop') {
          if (backJSON.auth !== false) {
            // set remove welcome message
            this.state.peerauthStatus = true
            // set the JWT for this session
            this.state.jwttoken = backJSON.jwt
            // get starting experiments
            /* const refContractp = {}
            refContractp.type = 'library'
            refContractp.reftype = 'publiclibrary'
            refContractp.action = 'GET'
            refContractp.jwt = this.state.jwttoken
            const refCJSONp = JSON.stringify(refContractp)
            Vue.prototype.$socket.send(refCJSONp) */
            // network library updates?
            /* const refContract = {}
            refContract.type = 'library'
            refContract.reftype = 'privatelibrary'
            refContract.action = 'GET'
            refContract.jwt = this.state.jwttoken
            const refCJSON = JSON.stringify(refContract)
            Vue.prototype.$socket.send(refCJSON) */
            /* const pubkeyGet = {}
            pubkeyGet.type = 'library'
            pubkeyGet.reftype = 'keymanagement'
            pubkeyGet.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(pubkeyGet)) */
            // get datastore
            let getWarmPeers = {}
            getWarmPeers.type = 'library'
            getWarmPeers.reftype = 'warm-peers'
            getWarmPeers.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(getWarmPeers))
            // get the peer start lifeboard
            /* let getLifeboard = {}
            getLifeboard.type = 'library'
            getLifeboard.reftype = 'peerLifeboard'
            getLifeboard.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(getLifeboard)) */
            // get bentospaces layout
            let getBentospaces = {}
            getBentospaces.type = 'bentospace'
            getBentospaces.reftype = 'bentospace'
            getBentospaces.action = 'list-position'
            getBentospaces.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(getBentospaces))
            // get solospaces info per bentospace asked for
            let getSolospaces = {}
            getSolospaces.type = 'bentospace'
            getSolospaces.reftype = 'solospace'
            getSolospaces.action = 'list-position'
            getSolospaces.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(getSolospaces))
          }
        } else {
          console.log('---')
        }
      } else if (backJSON.type === 'ecssummary') {
        console.log('SUMMAERY======HOP=ECS===================')
        console.log(backJSON)
        let boardUUID = Object.keys(backJSON.data)
        // update the NXP contract list held in toolkit
        // let updateListContracts = ToolUtility.updateContractList(this.state.liveNXP, backJSON.data[boardUUID[0]], this.state.networkPeerExpModules)
        let updateListContracts = ToolUtility.updateContractList(this.state.liveNXP, backJSON.data[boardUUID[0]], this.state.networkPeerExpModules)
        // this.state.networkPeerExpModules = updateListContracts
        Vue.set(this.state.networkPeerExpModules, updateListContracts)
        // context.commit('SET_ENTITY_RETURN', entityReturn)
        this.state.entityUUIDReturn = backJSON.data[boardUUID[0]].shellID
        // keep copy of latest returne nxp state
        if (this.state.entityUUIDsummary[boardUUID[0]] === undefined) {
          this.state.entityUUIDsummary[boardUUID[0]] = {}
        }
        this.state.entityUUIDsummary[boardUUID[0]] = backJSON
        // set the grid base for the experiment
        for (let mod of backJSON.data[boardUUID[0]].modules) {
          Vue.set(this.state.moduleGrid, mod.key, [])
          Vue.set(this.state.solopositionSpace.soloGrid, mod.key, [])
        }
        // set the data placer for per module
        Vue.set(this.state.NXPexperimentData, boardUUID[0], {})
        // being placer of modules
        let extractModuleOrder = VisualUtility.orderModules(backJSON.data[boardUUID[0]].modules, 'private')
        for (let modd of extractModuleOrder) { // backJSON.data[this.state.liveNXP].modules) {
          Vue.set(this.state.NXPexperimentData[boardUUID[0]], modd.key, {}) // now set the data elements
          Vue.set(this.state.NXPexperimentData[boardUUID[0]][modd.key], 'data', {})
          Vue.set(this.state.NXPexperimentData[boardUUID[0]][modd.key], 'prime', {})
          Vue.set(this.state.compModuleHolder, modd.key, {})
        }
      } else if (backJSON.type === 'newEntityRange') {
        console.log('$$$--SECOND-PART-----DATA RETURNED-----')
        console.log(backJSON)
        // console.log(state.backdatacount)
        // if (state.backdatacount < 3) {
        // is the data for the Lifeboard(AI) or Board space or Solospace?
        // does the context hash match any existing visualsiation module?
        if (backJSON.context.input.outhash !== undefined) {
          console.log('***dataHASH on RETURN-route 1----')
          for (let track of this._modules.root.state.solopositionSpace.trackOut) {
            // also check if hyphon this will also be solo space module only
            let hypthonCheck = backJSON.context.input.outhash.includes('-')
            if (track.outhash === backJSON.context.input.outhash && hypthonCheck === false) {
              this.dispatch('actionUpdateCopy', backJSON)
            } else if (hypthonCheck === true) {
              this.dispatch('actionUpdateCell', backJSON)
              // need to remove
              this.dispatch('actionOuthashRemove', track, { root: true })
            } else {
              // need to remove
              this.dispatch('actionOuthashRemove', track, { root: true })
              // this.dispatch('actionUpdateCopy', backJSON)
              // check for none data  e.g. bug, error, goes wrong cannot return data for display
              if (backJSON.data.data === 'none') {
                // switch off progress message and inform toolkit
                let setnxpProgress = { text: 'Update in progress', active: false }
                Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                // set feedback message per cell
                this.dispatch('actionDataFeedback', backJSON, { root: true })
                // need to personalise per vis modulue
                let matchExpRefContract = ToolUtility.matchExpModulesDetail(backJSON.context.input.key, this.state.networkPeerExpModules)
                // has data for the visual module already been setup?
                let displayModulesReady = {}
                let gridBefore = Object.keys(this.state.moduleGrid[backJSON.context.moduleorder.visualise.key])
                if (gridBefore.length === 0) {
                  console.log('no grid before')
                } else {
                  // set experiment progress message
                  let setnxpProgress = { text: 'Update in progress', active: true }
                  Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                  // prepare the module grid and data extract
                  displayModulesReady = VisualUtility.displayPrepareModules(matchExpRefContract.modules, backJSON)
                  // set the module GRID items
                  /* for (let modG of backJSON.context.input.value.modules) {
                    Vue.set(this.state.moduleGrid, modG, displayModulesReady.grid[modG])
                  } */
                  // set the vis/calendar toolbar open
                  // Vue.set(this.state.toolbarVisStatus, backJSON.context.moduleorder.visualise.key, {})
                  // Vue.set(this.state.visProgress, backJSON.context.moduleorder.visualise.key, {})
                  if (backJSON.context.moduleorder.compute.value.type === 'compute') {
                    let startCompControls = {}
                    startCompControls.date = backJSON.context.moduleorder.compute.value.info.controls.date
                    // let modUpdate = this.state.compModuleHolder[backJSON.context.moduleorder.visualise.key]
                    // modUpdate[backJSON.data.context.triplet.device] = startCompControls
                    // Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, {})
                    // Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, modUpdate)
                  }
                  // form holder for vis toolbars
                  if (backJSON.context.moduleorder.visualise.key === 'Visualise') {
                    // set the toolbars per vis module per device
                    let deviceP = backJSON.data.context.triplet.device
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
                    Vue.set(this.state.visModuleHolder, deviceP, visSettings)
                    // set vis e.g. chart progress message per device
                    let setVisProgress = { text: 'Preparing visualisation', active: false }
                    Vue.set(this.state.visProgress[backJSON.context.moduleorder.visualise.key], deviceP, setVisProgress)
                    // set the vis toolbar status
                    let setVisTools = {}
                    setVisTools = { text: 'open tools', active: true }
                    Vue.set(this.state.toolbarVisStatus[backJSON.context.moduleorder.visualise.key], deviceP, setVisTools)
                    // set the open data toolbar
                    let setOPenDataToolbar = {}
                    // setOPenDataToolbar[deviceP] = { text: 'open data', active: false }
                    setOPenDataToolbar = { text: 'open data', active: false }
                    Vue.set(this.state.opendataTools, backJSON.context.moduleorder.visualise.key, {})
                    Vue.set(this.state.opendataTools[backJSON.context.moduleorder.visualise.key], deviceP, setOPenDataToolbar)
                  }
                  // set the modulesgrid info
                  // this.state.moduleGrid[backJSON.context.moduleorder.visualise.key].push(displayModulesReady.data[backJSON.context.moduleorder.visualise.key].prime)
                  // set the data for visualisation
                  if (backJSON.data.data !== 'none') {
                    Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], 'data', displayModulesReady.data[backJSON.context.moduleorder.visualise.key].data)
                    Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], 'prime', displayModulesReady.data[backJSON.context.moduleorder.visualise.key].prime)
                  } else {
                    // this.state.ecsMessageLive = 'no data available'
                    // set experiment progress message off
                    let setnxpProgress = { text: 'Board in progress', active: false }
                    Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                    let setProgress = {}
                    setProgress = { text: 'Updating visualisation', active: false }
                    Vue.set(this.state.visProgress[backJSON.context.moduleorder.visualise.key], backJSON.data.context.triplet.device, setProgress)
                    // still setup module content to fix or add info try again?
                    // Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], 'data', displayModulesReady.data[backJSON.context.moduleorder.visualise.key].data)
                    // Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], 'prime', displayModulesReady.data[backJSON.context.moduleorder.visualise.key].prime)
                  }
                }
              } else {
                // switch off nxp Progress message
                let setnxpProgress = { text: 'Board in progress', active: true }
                Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                // set devices for this NXP
                if (this.state.devicesLive[backJSON.context.input.key] === undefined) {
                  Vue.set(this.state.devicesLive, backJSON.context.input.key, [])
                }
                if (this.state.devicesLive[backJSON.context.input.key].length === 0) {
                  // need to set devices per network experiment id
                  Vue.set(this.state.devicesLive, backJSON.context.input.key, backJSON.devices)
                }
                let matchExpRefContract = ToolUtility.matchExpModulesDetail(backJSON.context.input.key, this.state.networkPeerExpModules)
                // has data for the visual module already been setup?
                let displayModulesReady = {}
                let gridBefore = Object.keys(this.state.moduleGrid[backJSON.context.moduleorder.visualise.key])
                if (gridBefore.length > 0) {
                  // move network experment prorgress message
                  let setnxpProgressOff = { text: 'Board in progress', active: false }
                  Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgressOff)
                  let matchVisModuleType = ToolUtility.matchModuleType('visualise', matchExpRefContract.modules)
                  // need to add data to vis module placer
                  let displayDataUpdate = VisualUtility.addVisData(matchVisModuleType, this.state.moduleGrid[backJSON.context.moduleorder.visualise.key], this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], backJSON)
                  // compute setting i.e. date etc.
                  if (backJSON.context.moduleorder.compute?.value?.type === 'compute') {
                    // compModuleHolder
                    let startCompControls = {}
                    startCompControls.date = backJSON.context.moduleorder.compute.value.info.controls.date
                    // set to vis module ID and device ID
                    let liveDevice = backJSON.data.context.triplet.device
                    let modUpdate = this.state.compModuleHolder[backJSON.context.moduleorder.visualise.key]
                    modUpdate[liveDevice] = startCompControls
                    Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, {})
                    Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, modUpdate)
                    // test holder
                    // Vue.set(state.testHolder, backJSON.context.moduleorder.visualise.key, modUpdate)
                    // Vue.set(state.testHolder, backJSON.context.moduleorder.visualise.key, modUpdate)
                  }
                  // update setting grid
                  if (displayDataUpdate.update.grid.length > 0) {
                    for (let modG of displayDataUpdate.update.grid) {
                      // set new grid
                      this.state.moduleGrid[displayDataUpdate.module].push(modG)
                      if (backJSON.data.context.triplet.device === modG.i) {
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
                        Vue.set(this.state.visModuleHolder, modG.i, visSettings)
                        // set toolbars
                        let setVisTools = {}
                        setVisTools = { text: 'open tools', active: true }
                        Vue.set(this.state.toolbarVisStatus[displayDataUpdate.module], modG.i, setVisTools)
                        // set the open data toolbar
                        let setOPenDataToolbar = {}
                        setOPenDataToolbar = { text: 'open data', active: false }
                        Vue.set(this.state.opendataTools[displayDataUpdate.module], modG.i, setOPenDataToolbar)
                        // set the data for the visualisation
                        Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module].data, modG.i, backJSON.data)
                        let contextPlacer = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': modG, 'data': backJSON.data.data }
                        Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module], 'prime', contextPlacer.prime)
                        // set a placer for any subsequent updates
                        let setProgress = {}
                        setProgress = { text: 'Updating visualisation', active: false }
                        Vue.set(this.state.visProgress[displayDataUpdate.module], modG.i, setProgress)
                      }
                    }
                  } else {
                    // switch off the update message for update
                    let setProgress = {}
                    setProgress = { text: 'Updating visualisation', active: false }
                    Vue.set(this.state.visProgress[backJSON.context.moduleorder.visualise.key], backJSON.data.context.triplet.device, setProgress)
                    // check for data update?  are the times the same?
                    let lastTime = 0
                    if (Object.keys(this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key].data[backJSON.data.context.triplet.device]).length !== 0) {
                      lastTime = this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key].data[backJSON.data.context.triplet.device].context.triplet
                    }
                    if (backJSON.data.context.triplet.timeout !== lastTime) {
                      // set data for experiment module
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module].data, backJSON.data.context.triplet.device, backJSON.data)
                    }
                  }
                } else {
                  // set experiment progress message
                  let setnxpProgress = { text: 'Board in progress', active: true }
                  Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                  // prepare the module grid and data extract
                  displayModulesReady = VisualUtility.displayPrepareModules(matchExpRefContract.modules, backJSON)
                  // set the module GRID items
                  for (let modG of backJSON.context.input.value.modules) {
                    Vue.set(this.state.moduleGrid, modG, displayModulesReady.grid[modG])
                  }
                  // update vis toolsbars and data
                  let moduleList = Object.keys(displayModulesReady.data)
                  for (let modID of moduleList) {
                    // set the vis/calendar toolbar open
                    Vue.set(this.state.toolbarVisStatus, modID, {})
                    Vue.set(this.state.visProgress, modID, {})
                    if (displayModulesReady.data[modID].prime.text === 'Visualise') {
                      // set the toolbars per vis module per device
                      let listDevices = Object.keys(displayModulesReady.data[modID].data)
                      for (let deviceP of listDevices) {
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
                        Vue.set(this.state.visModuleHolder, deviceP, visSettings)
                        // set vis e.g. chart progress message per device
                        let setVisProgress = { text: 'Preparing visualisation', active: false }
                        Vue.set(this.state.visProgress[modID], deviceP, setVisProgress)
                        // set the vis toolbar status
                        let setVisTools = {}
                        setVisTools = { text: 'open tools', active: true }
                        Vue.set(this.state.toolbarVisStatus[modID], deviceP, setVisTools)
                        // set the open data toolbar
                        let setOPenDataToolbar = {}
                        // setOPenDataToolbar[deviceP] = { text: 'open data', active: false }
                        setOPenDataToolbar = { text: 'open data', active: false }
                        Vue.set(this.state.opendataTools, modID, {})
                        Vue.set(this.state.opendataTools[modID], deviceP, setOPenDataToolbar)
                      }
                    }
                    // set the data for visualisation
                    if (backJSON.data !== 'none') {
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'data', displayModulesReady.data[modID].data)
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'prime', displayModulesReady.data[modID].prime)
                      let setnxpProgress = { text: 'Experiment in progress', active: false }
                      Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                    } else {
                      this.state.ecsMessageLive = 'no data available'
                      // set experiment progress message off
                      let setnxpProgress = { text: 'Experiment in progress', active: false }
                      Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                      // still setup module content to fix or add info try again?
                      // let matchContrastStart = ToolUtility.matchModuleRefcontractID(modID, this.state.experimentStatus[backJSON.context.input.key].modules)
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'data', displayModulesReady.data[modID].data)
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'prime', displayModulesReady.data[modID].prime)
                    }
                  }
                }
              }
            }
          }
        } else {
          // check for none data  e.g. bug, error, goes wrong cannot return data for display
          if (backJSON.data.data === 'none') {
            let deviceP = backJSON.data.context.triplet.device
            // switch off progress message and inform toolkit
            let setnxpProgress = { text: 'Board in progress', active: false }
            Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
            // need to make toolbar appear so date can be selected
            // set devices for this Board
            if (this.state.devicesLive[backJSON.context.input.key] === undefined) {
              Vue.set(this.state.devicesLive, backJSON.context.input.key, [])
            }
            if (this.state.devicesLive[backJSON.context.input.key].length === 0) {
              // need to set devices per network board id
              Vue.set(this.state.devicesLive, backJSON.context.input.key, backJSON.devices)
            }
            let matchExpRefContract = ToolUtility.matchExpModulesDetail(backJSON.context.input.key, this.state.networkPeerExpModules)
            // has data for the visual module already been setup?
            let displayModulesReady = {}
            let gridBefore = Object.keys(this.state.moduleGrid[backJSON.context.moduleorder.visualise.key])
            if (typeof gridBefore !== 'object') {
              console.log('not set shoud not happen')
            } else {
              // is this first time grid or adding to existing modules i.e. visual data but none to display?
              let deviceNew = false
              for (let gridi of this.state.moduleGrid[backJSON.context.moduleorder.visualise.key]) {
                if (gridi.i === deviceP) {
                  deviceNew = true
                }
              }
              if (deviceNew === false && gridBefore.length !== 0) {
                let setnxpProgressOff = { text: 'Board in progress', active: false }
                Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgressOff)
                let matchVisModuleType = ToolUtility.matchModuleType('visualise', matchExpRefContract.modules)
                // need to add data to vis module placer
                let displayDataUpdate = VisualUtility.addVisData(matchVisModuleType, this.state.moduleGrid[backJSON.context.moduleorder.visualise.key], this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], backJSON)
                // need to add device to data modules
                this.state.moduleGrid[backJSON.context.moduleorder.data.key].push(displayDataUpdate.update.grid[0])
                // update setting grid
                if (backJSON.context.moduleorder.compute.value.type === 'compute') {
                  // no data no date set as today
                  let nowDate = moment()
                  let liveDate = moment(nowDate).startOf('day')
                  let startCompControls = {}
                  startCompControls.date = liveDate.valueOf()
                  let modUpdate = this.state.compModuleHolder[backJSON.context.moduleorder.visualise.key]
                  modUpdate[backJSON.data.context.triplet.device] = startCompControls
                  // set to vis module ID and device ID
                  Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, {})
                  Vue.set(this.state.compModuleHolder, [backJSON.context.moduleorder.visualise.key], modUpdate)
                }
                if (displayDataUpdate.update.grid.length > 0) {
                  for (let modG of displayDataUpdate.update.grid) {
                    // set new grid
                    this.state.moduleGrid[displayDataUpdate.module].push(modG)
                    if (backJSON.data.context.triplet.device === modG.i) {
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
                      Vue.set(this.state.visModuleHolder, modG.i, visSettings)
                      // set toolbars
                      let setVisTools = {}
                      setVisTools = { text: 'open tools', active: true }
                      Vue.set(this.state.toolbarVisStatus[displayDataUpdate.module], modG.i, setVisTools)
                      // set the open data toolbar
                      let setOPenDataToolbar = {}
                      setOPenDataToolbar = { text: 'open data', active: false }
                      Vue.set(this.state.opendataTools[displayDataUpdate.module], modG.i, setOPenDataToolbar)
                      // set the data for the visualisation
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module].data, modG.i, displayDataUpdate.update.data)
                      let contextPlacer = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': modG, 'data': displayDataUpdate.update.data }
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module], 'prime', contextPlacer.prime)
                      // set a placer for any subsequent updates
                      let setProgress = {}
                      setProgress = { text: 'Updating visualisation', active: false }
                      Vue.set(this.state.visProgress[displayDataUpdate.module], modG.i, setProgress)
                    }
                  }
                }
              } else {
                // set experiment progress message
                let setnxpProgress = { text: 'Board in progress', active: true }
                Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                // prepare the module grid and data extract
                displayModulesReady = VisualUtility.displayPrepareModules(matchExpRefContract.modules, backJSON)
                // update vis toolsbars and data
                let moduleList = Object.keys(displayModulesReady.data)
                // has this module been published before?
                // if () {}
                for (let modID of moduleList) {
                  // set the vis/calendar toolbar open
                  Vue.set(this.state.toolbarVisStatus, modID, {})
                  Vue.set(this.state.visProgress, modID, {})
                  if (displayModulesReady.data[modID].prime.text === 'Compute') {
                    // no data no date set as today
                    let startCompControls = {}
                    startCompControls.date = new Date().valueOf()
                    let modUpdate = this.state.compModuleHolder[backJSON.context.moduleorder.visualise.key]
                    modUpdate[backJSON.data.context.triplet.device] = startCompControls
                    // Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, {})
                    Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, modUpdate)
                  }
                  if (displayModulesReady.data[modID].prime.text === 'Visualise') {
                    // set the toolbars per vis module per device
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
                    Vue.set(this.state.visModuleHolder, deviceP, visSettings)
                    // set vis e.g. chart progress message per device
                    let setVisProgress = { text: 'Preparing visualisation', active: false }
                    Vue.set(this.state.visProgress[modID], deviceP, setVisProgress)
                    // set the vis toolbar status
                    let setVisTools = {}
                    setVisTools = { text: 'open tools', active: true }
                    Vue.set(this.state.toolbarVisStatus[modID], deviceP, setVisTools)
                    // set the open data toolbar
                    let setOPenDataToolbar = {}
                    // setOPenDataToolbar[deviceP] = { text: 'open data', active: false }
                    setOPenDataToolbar = { text: 'open data', active: false }
                    Vue.set(this.state.opendataTools, modID, {})
                    Vue.set(this.state.opendataTools[modID], deviceP, setOPenDataToolbar)
                  } else {
                    // console.log('non vis module in list')
                  }
                  // has the modulue data and prime set before?
                  if (Object.keys(this.state.NXPexperimentData[backJSON.context.input.key][modID].data).length === 0) {
                    // set the modulesgrid info
                    this.state.moduleGrid[modID].push(displayModulesReady.data[modID].grid[0])
                    // set the data for visualisation & modules
                    if (backJSON.data.data !== 'none') {
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID].data, deviceP, displayModulesReady.data[modID].data)
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID].prime, deviceP, displayModulesReady.data[modID].prime)
                    } else {
                      // this.state.ecsMessageLive = 'no data available'
                      // set experiment progress message off
                      let setnxpProgress = { text: 'Board in progress', active: false }
                      Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                      Vue.set(this.state.NXPexperimentData[backJSON.context.input.key], modID, displayModulesReady.data[modID])
                    }
                  } else {
                    console.log('module set before')
                  }
                }
              }
            }
          } else {
            // switch off nxp Progress message
            let setnxpProgress = { text: 'Board in progress', active: true }
            Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
            // set devices for this NXP
            if (this.state.devicesLive[backJSON.context.input.key] === undefined) {
              Vue.set(this.state.devicesLive, backJSON.context.input.key, [])
            }
            if (this.state.devicesLive[backJSON.context.input.key].length === 0) {
              // need to set devices per network experiment id
              Vue.set(this.state.devicesLive, backJSON.context.input.key, backJSON.devices)
            }
            let matchExpRefContract = ToolUtility.matchExpModulesDetail(backJSON.context.input.key, this.state.networkPeerExpModules)
            // has data for the visual module already been setup?
            let displayModulesReady = {}
            let visKey = backJSON.context.moduleorder.visualise.key
            let gridBefore = this.state.moduleGrid[visKey]
            if (typeof gridBefore === 'object') { // > 0) {
              // move network experment prorgress message
              let setnxpProgressOff = { text: 'Board in progress', active: false }
              Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgressOff)
              let matchVisModuleType = ToolUtility.matchModuleType('visualise', matchExpRefContract.modules)
              // need to add data to vis module placer
              let displayDataUpdate = VisualUtility.addVisData(matchVisModuleType, this.state.moduleGrid[backJSON.context.moduleorder.visualise.key], this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key], backJSON)
              // compute setting i.e. date etc.
              if (backJSON.context.moduleorder.compute.value.type === 'compute') {
                // compModuleHolder
                let startCompControls = {}
                startCompControls.date = backJSON.context.moduleorder.compute.value.info.controls.date
                let modUpdate = this.state.compModuleHolder[backJSON.context.moduleorder.visualise.key]
                modUpdate[backJSON.data.context.triplet.device] = startCompControls
                // set to vis module ID and device ID
                // Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, {})
                Vue.set(this.state.compModuleHolder, backJSON.context.moduleorder.visualise.key, modUpdate)
                // test holder
                // Vue.set(state.testHolder, backJSON.context.moduleorder.visualise.key, {})
                // Vue.set(state.testHolder, backJSON.context.moduleorder.visualise.key, modHold)
              }
              // need to add device to data modules
              this.state.moduleGrid[backJSON.context.moduleorder.data.key].push(displayDataUpdate.update.grid[0])
              // update setting grid
              if (displayDataUpdate.update.grid.length > 0) {
                for (let modG of displayDataUpdate.update.grid) {
                  // set new grid
                  this.state.moduleGrid[displayDataUpdate.module].push(modG)
                  if (backJSON.data.context.triplet.device === modG.i) {
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
                    Vue.set(this.state.visModuleHolder, modG.i, visSettings)
                    // set toolbars
                    let setVisTools = {}
                    setVisTools = { text: 'open tools', active: true }
                    // check if module has toobarVis status set?
                    if (this.state.toolbarVisStatus[displayDataUpdate.module] === undefined) {
                      Vue.set(this.state.toolbarVisStatus, displayDataUpdate.module, {})
                    }
                    Vue.set(this.state.toolbarVisStatus[displayDataUpdate.module], modG.i, setVisTools)
                    // set the open data toolbar
                    let setOPenDataToolbar = {}
                    setOPenDataToolbar = { text: 'open data', active: false }
                    // check if module set?
                    if (this.state.opendataTools[displayDataUpdate.module] === undefined) {
                      Vue.set(this.state.opendataTools, displayDataUpdate.module, {})
                    }
                    Vue.set(this.state.opendataTools[displayDataUpdate.module], modG.i, setOPenDataToolbar)
                    // set the data for the visualisation
                    Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module].data, modG.i, displayDataUpdate.update.data)
                    let contextPlacer = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': modG, 'data': displayDataUpdate.update.data }
                    Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module], 'prime', contextPlacer.prime)
                    // set a placer for any subsequent updates
                    let setProgress = {}
                    setProgress = { text: 'Updating visualisation', active: false }
                    // check if module set?
                    if (this.state.visProgress[displayDataUpdate.module] === undefined) {
                      Vue.set(this.state.visProgress, displayDataUpdate.module, {})
                    }
                    Vue.set(this.state.visProgress[displayDataUpdate.module], modG.i, setProgress)
                  }
                  state.backdatacount++
                }
              } else {
                // switch off the update message for update
                let setProgress = {}
                setProgress = { text: 'Updating visualisation', active: false }
                Vue.set(this.state.visProgress[backJSON.context.moduleorder.visualise.key], backJSON.data.context.triplet.device, setProgress)
                // check for data update?  are the times the same?
                let lastTime = 0
                if (Object.keys(this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key].data[backJSON.data.context.triplet.device]).length !== 0) {
                  lastTime = this.state.NXPexperimentData[backJSON.context.input.key][backJSON.context.moduleorder.visualise.key].data[backJSON.data.context.triplet.device].context.triplet
                }
                if (backJSON.data.context.triplet.timeout !== lastTime) {
                  // set data for experiment module
                  Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][displayDataUpdate.module].data, backJSON.data.context.triplet.device, backJSON.data)
                }
              }
            } else {
              // set experiment progress message
              let setnxpProgress = { text: 'Board in progress', active: true }
              Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
              // prepare the module grid and data extract
              displayModulesReady = VisualUtility.displayPrepareModules(matchExpRefContract.modules, backJSON)
              // set the module GRID items
              // for (let modG of backJSON.context.input.value.modules) {
              // Vue.set(this.state.moduleGrid, modG.key, displayModulesReady.grid[modG.key])
              // }
              // set the solospace start as empty if none set
              if (!this.state.solopositionSpace.initialGrid) {
                this.dispatch('actionSavedLayout', {}, { root: true })
              }
              // update vis toolsbars and data
              let moduleList = Object.keys(displayModulesReady.data)
              for (let modID of moduleList) {
                // set the vis/calendar toolbar open
                Vue.set(this.state.toolbarVisStatus, modID, {})
                Vue.set(this.state.visProgress, modID, {})
                if (displayModulesReady.data[modID].prime.text === 'Compute') {
                  // compModuleHolder
                  // Vue.set(this.state.compModuleHolder, , )
                }
                if (displayModulesReady.data[modID].prime.text === 'Visualise') {
                  // set the toolbars per vis module per device
                  let listDevices = Object.keys(displayModulesReady.data[modID].data)
                  for (let deviceP of listDevices) {
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
                    Vue.set(this.state.visModuleHolder, deviceP, visSettings)
                    // set vis e.g. chart progress message per device
                    let setVisProgress = { text: 'Preparing visualisation', active: false }
                    Vue.set(this.state.visProgress[modID], deviceP, setVisProgress)
                    // set the vis toolbar status
                    let setVisTools = {}
                    setVisTools = { text: 'open tools', active: true }
                    Vue.set(this.state.toolbarVisStatus[modID], deviceP, setVisTools)
                    // set the open data toolbar
                    let setOPenDataToolbar = {}
                    // setOPenDataToolbar[deviceP] = { text: 'open data', active: false }
                    setOPenDataToolbar = { text: 'open data', active: false }
                    Vue.set(this.state.opendataTools, modID, {})
                    Vue.set(this.state.opendataTools[modID], deviceP, setOPenDataToolbar)
                  }
                }
                // set the data for visualisation
                if (backJSON.data !== 'none') {
                  Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'data', displayModulesReady.data[modID].data)
                  Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'prime', displayModulesReady.data[modID].prime)
                  let setnxpProgress = { text: 'Board in progress', active: false }
                  Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                } else {
                  this.state.ecsMessageLive = 'no data available'
                  // set experiment progress message off
                  let setnxpProgress = { text: 'Board in progress', active: false }
                  Vue.set(this.state.nxpProgress, backJSON.context.input.key, setnxpProgress)
                  // still setup module content to fix or add info try again?
                  // let matchContrastStart = ToolUtility.matchModuleRefcontractID(modID, this.state.experimentStatus[backJSON.context.input.key].modules)
                  Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'data', displayModulesReady.data[modID].data)
                  Vue.set(this.state.NXPexperimentData[backJSON.context.input.key][modID], 'prime', displayModulesReady.data[modID].prime)
                }
              }
            }
          }
        }
      } else if (backJSON.type === 'displayEmpty') {
        console.log('display empty')
        this.state.ecsMessageLive = 'no data available'
      } else if (backJSON.type === 'peerlifeboard') {
        // prepare PEER JOINED LIST
        let lbPeer = ToolUtility.prepareLifeboardList(backJSON.lifeboard)
        this.state.joinedLifeboard.push(lbPeer)
      } else if (backJSON.type === 'peerprivatedelete') {
        // need to update space coord dash/minmap list ie remove id just removed
        this.dispatch('actionDashBRemove', backJSON.data.nxp)
        // this.state.positionSpace.liveSpaceCoord
        // save state of bentospace dashboard
        this.dispatch('actionSaveSpaceNXP', 'nxp')
      } else if (backJSON.type === 'peerprivate-start') {
        // prepare PEER JOINED LIST
        let gridPeer = ToolUtility.prepareJoinedNXPlist(backJSON.data)
        this.state.joinedNXPlist = gridPeer
        this.state.networkPeerExpModules = backJSON.data
        // setup UI settings for spaces grid
        // this.state.livePeerRefContIndex = backJSON.referenceContracts
        // this.state.networkPeerExpModules = backJSON.data.expanded
        for (let board of backJSON.data) {
          let strCheck = typeof board.key
          if (strCheck === 'string') {
            for (let exl of board.modules) {
              let experBundle = {}
              experBundle.cnrl = board.key
              experBundle.status = false
              experBundle.active = false
              experBundle.contract = board
              experBundle.modules = VisualUtility.orderModules(board.modules, 'private', exl)
              let objectPropC = board.key
              Vue.set(this.state.experimentStatus, objectPropC, experBundle)
            }
          }
        }
      } else if (backJSON.type === 'peerprivate') {
        // set the HOPholder to say data for this back
        Vue.set(state.HOPHolder, backJSON.board, {})
        Vue.set(state.HOPHolder, backJSON.board, 'request')
        // form HOP board/exp contract style
        let nxpContract = {}
        nxpContract.key = backJSON.board
        nxpContract.value = backJSON.data.value
        Vue.set(this.state.HOPrequestLive, backJSON.board, nxpContract)
        // peer private library contracts
        // keep track of what data has been asked for
        this.state.livePeerRefContIndex = backJSON.referenceContracts
        this.state.networkPeerExpModules.push(backJSON.data)
        for (let exl of this.state.networkPeerExpModules) {
          console.log(exl)
          let experBundle = {}
          experBundle.cnrl = backJSON.data.board
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = backJSON.data.value
          experBundle.modules = VisualUtility.orderModules(backJSON.data.modules, 'private')
          let objectPropC = backJSON.board
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
        }
        // tell toolkit ref contracts are active
        state.startPeerRefContracts.push('peeref')
        // prepare PEER JOINED LIST
        let gridPeer = ToolUtility.prepareBentoSpaceJoinedNXPlist(this.state.networkPeerExpModules)
        this.state.joinedNXPlist = gridPeer
        // now ask for the data & list top 10 public library join options
        /* const refContractp = {}
        refContractp.type = 'library'
        refContractp.reftype = 'publiclibrary-start'
        refContractp.action = 'GET'
        refContractp.jwt = this.state.jwttoken
        const refCJSONp = JSON.stringify(refContractp)
        Vue.prototype.$socket.send(refCJSONp) */
      } else if (backJSON.type === 'publiclibrary') {
        // consider renaming this to board (nxp) return listener and have sperate ref contracts if done library next to hyperbee no need to return all prepared there as much as possible.
        Vue.set(state.HOPreturn, 'publiclib', true)
        // save copy of te ref contract indexes
        this.state.liveRefContIndex = backJSON.referenceContracts
        // prepare NPXs in NETWORK
        this.state.networkExpModules = backJSON.networkExpModules
        let gridAnnon = ToolUtility.prepareAnnonNXPlist(backJSON.networkExpModules)
        this.state.NXPexperimentList = gridAnnon
        // set the dashboard toolbar status settings
        for (let exl of backJSON.networkExpModules) {
          let experBundle = {}
          experBundle.cnrl = exl.exp.key
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = exl.exp
          experBundle.modules = VisualUtility.orderModules(exl.modules, 'public') // exl.modules
          // inform toolkit contract are active
          this.state.startPubRefContracts.push('pubref')
          let objectPropC = exl.exp.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
        }
      }
    },
    SET_HOPOUT_MESSAGE (state, update) {
      // set the HOPholder to say data for this been message to HOP
      Vue.set(state.HOPHolder, update, {})
      Vue.set(state.HOPHolder, update, 'request')
    },
    LIBRARY_START_DATA (state, update) {
      const refContractp = {}
      refContractp.type = 'library'
      refContractp.reftype = 'publiclibrary-start'
      refContractp.action = 'GET'
      refContractp.jwt = this.state.jwttoken
      const refCJSONp = JSON.stringify(refContractp)
      Vue.prototype.$socket.send(refCJSONp)
    },
    UPDATE_HOP_HOLDER (state, update) {
      // prepare UI supporting UI ready for return of HOP Data
      // console.log('new data back listenering--HOPHOLDER--xxxxxxxxxxxxxxxx')
      // console.log(update)
      // loop over and if request prepare output for HOP
      let listAssess = Object.keys(state.HOPHolder)
      for (let assess of listAssess) {
        if (state.HOPHolder[assess] === 'request') {
          // prepare output
          let positionStartInfo = {}
          positionStartInfo.nxp = assess
          // does a bentospace start place location exist?
          let bentospacePosition = {}
          if (state.libraryHolder?.bentospacestart?.data?.value.layout === undefined) {
            bentospacePosition = { x: 80, y: 40 }
          } else {
            bentospacePosition = state.libraryHolder.bentospacestart.data.value.layout[assess]
          }
          positionStartInfo.coord = bentospacePosition
          positionStartInfo.type = 'saved'
          // set active space
          this.dispatch('actionLiveNXPlist', this.state.joinedNXPlist.data, { root: true })
          this.dispatch('actionPostionCoord', positionStartInfo, { root: true })
          this.dispatch('actionDashboardState', positionStartInfo, { root: true })
          Vue.set(state.HOPHolder, assess, 'sent')
        }
      }
    },
    SET_ASK_KEYMANAGEMENT (state) {
      this.state.publickeys = []
      const pubkeyGet = {}
      pubkeyGet.type = 'library'
      pubkeyGet.reftype = 'keymanagement'
      pubkeyGet.jwt = this.state.jwttoken
      Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
    },
    CLEAR_CONTRIB_REFCONTRACTS (state, inVerified) {
      // reset the contract holders
      this.state.isModalNewNetworkExperiment = false
      this.state.nxpMakeList = []
      this.state.moduleHolder = []
      let qOptions = {}
      qOptions.text = ''
      qOptions.forum = ''
      this.state.refcontractQuestion.question = qOptions
      this.state.refcontractCompute = []
    },
    SET_QUESTION_REFCONTRACT (state, inVerified) {
      // build Question module data structure
      let questionStrucure = {}
      questionStrucure.moduleinfo = inVerified.module
      questionStrucure.question = this.state.refcontractQuestion.question
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
      this.state.genRefcontractCompute.push(inVerified)
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
    SET_SETNXP_VISDEVICES (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'devices', inVerified)
    },
    SET_SETNXP_VISCOMPUTE (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'compute', inVerified)
    },
    SET_SETNXP_VISRESULTS (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'results', inVerified)
    },
    SET_SETNXP_VISXAXIS (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'xaxis', inVerified)
    },
    SET_SETNXP_VISYAXIS (state, inVerified) {
      // y axis can hold many datatypes
      let singleDTref = []
      for (let dtCheck of inVerified) {
        if (typeof dtCheck === 'object') {
          singleDTref.push(dtCheck.sourcedt)
        } else {
          singleDTref.push(dtCheck)
        }
      }
      // keep tabs that open data updated
      this.state.opendataUpdate = true
      this.state.newSetupHolder.yaxis = singleDTref
    },
    SET_SETNXP_VISCATEGORY (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'category', inVerified)
    },
    SET_SETNXP_VISTIME (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'timeperiod', inVerified)
    },
    SET_SETNXP_VISRESOLUTION (state, inVerified) {
      Vue.set(this.state.newSetupHolder, 'resolution', inVerified)
    },
    SET_NEWNXP_VISDEVICES (state, inVerified) {
      let deviceHold = {}
      deviceHold = this.state.visModuleHolder[inVerified.device]
      deviceHold.devices = inVerified.setting
      Vue.set(this.state.visModuleHolder, inVerified.device, deviceHold)
      // Vue.set(this.state.visModuleHolder[inVerified.device], 'devices', inVerified.setting)
    },
    SET_NEWNXP_VISCOMPUTE (state, inVerified) {
      Vue.set(this.state.visModuleHolder[inVerified.device], 'compute', inVerified.setting)
    },
    SET_NEWNXP_VISRESULTS (state, inVerified) {
      Vue.set(this.state.visModuleHolder, 'results', inVerified)
    },
    SET_NEWNXP_VISXAXIS (state, inVerified) {
      Vue.set(this.state.visModuleHolder[inVerified.device], 'xaxis', inVerified.setting)
    },
    SET_NEWNXP_VISYAXIS (state, inVerified) {
      // y axis can hold many datatypes
      // keep tabs that open data updated
      this.state.opendataUpdate = true
      Vue.set(this.state.visModuleHolder[inVerified.device], 'yaxis', inVerified.setting)
    },
    SET_NEWNXP_VISCATEGORY (state, inVerified) {
      Vue.set(this.state.visModuleHolder[inVerified.device], 'category', inVerified.setting)
    },
    SET_NEWNXP_VISTIME (state, inVerified) {
      Vue.set(this.state.visModuleHolder[inVerified.device], 'timeperiod', inVerified.setting)
    },
    SET_NEWNXP_VISRESOLUTION (state, inVerified) {
      Vue.set(this.state.visModuleHolder[inVerified.device], 'resolution', inVerified.setting)
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
      let dateRange = []
      dateRange.push(timeFormat)
      Vue.set(this.state.joinNXPselected.compute, 'rangedate', dateRange)
    },
    SET_JOIN_NXP_COMPUTE_CONTROLS (state, inVerified) {
      Vue.set(this.state.joinNXPselected.compute, 'controls', inVerified)
    },
    SET_JOIN_NXP_COMPUTE_AUTO (state, inVerified) {
      Vue.set(this.state.joinNXPselected.compute, 'automate', inVerified)
    },
    NEW_NXP_SHELL_TEMP (state, inVerified) {
      Vue.set(this.state.newNXshell, 'tempshell', inVerified)
    },
    SET_VISTOOLS_TEMP (state, inVerified) {
      let setVisTools = {}
      setVisTools[inVerified.mData] = { text: 'open tools', active: true, learn: false }
      Vue.set(this.state.toolbarVisStatus, inVerified.moduleCNRL, setVisTools)
    },
    SETOPEN_DATABAR_TEMP (state, inVerified) {
      let setToolbar = {}
      setToolbar = { text: 'open data', active: true, learn: false }
      Vue.set(this.state.opendataTools, inVerified.moduleCNRL, {})
      Vue.set(this.state.opendataTools[inVerified.moduleCNRL], inVerified.mData, setToolbar)
    },
    SET_MODULE_HOLDER (state, inVerified) {
      this.state.moduleHolder = []
      this.state.refcontractPackaging = []
    },
    SET_COMPHOLDER_COPY (state, inVerified) {
      let modID = inVerified.moduleCNRL
      // let sourceVisMod = '6609e91c729d53e65529c6473b70d490397e2a31' // inVerified.moduleCNRL.slice()
      let startCompControls = {}
      startCompControls.date = 1664665200000 // backJSON.context.moduleorder.compute.value.info.controls.date
      // set to vis module ID and device ID
      let liveDevice = inVerified.mData
      let modUpdate = {} // this.state.compModuleHolder[sourceVisMod]
      modUpdate[liveDevice] = startCompControls
      Vue.set(this.state.compModuleHolder, 'copy-' + modID, {})
      Vue.set(this.state.compModuleHolder, 'copy-' + modID, modUpdate)
    },
    SET_TIMEFORMAT_STYLE (state, inVerified) {
      this.state.setTimeFormat = inVerified
      Vue.set(this.state.visModuleHolder, 'setTimeFormat', inVerified)
    },
    SET_LEGEND_STATUS (state, inVerified) {
      let updataLegened = false
      if (this.state.NXPexperimentData[inVerified.shellID][inVerified.moduleCNRL].data[inVerified.mData].data.chartOptions.legend.display === true) {
        updataLegened = false
      } else if (this.state.NXPexperimentData[inVerified.shellID][inVerified.moduleCNRL].data[inVerified.mData].data.chartOptions.legend.display === false) {
        updataLegened = true
      }
      Vue.set(this.state.NXPexperimentData[inVerified.shellID][inVerified.moduleCNRL].data[inVerified.mData].data.chartOptions.legend, 'display', updataLegened)
    },
    SET_FEEDBACK_MEASSAGE (state, inVerified) {
      Vue.set(this.state.feedbackMessage, inVerified.device, inVerified.message)
    },
    SET_COMBINE_CONTEXT (state, inVerified) {
      this.state.combineSpaceList.push(inVerified)
    },
    SET_COMBINE_CLEAR (state, inVerified) {
      this.state.combineSpaceList = []
    },
    SET_NXPLIST_SHOW (state, inVerified) {
      let updateText = ''
      if (this.state.experimentListshow.text === 'hide') {
        updateText = 'show'
      } else {
        updateText = 'hide'
      }
      let updateState = !this.state.experimentListshow.state
      Vue.set(this.state.experimentListshow, 'text', updateText)
      Vue.set(this.state.experimentListshow, 'state', updateState)
    },
    SET_NXPLIST_DEFAULT (state, inVerified) {
      Vue.set(this.state.experimentListshow, 'text', 'show')
      Vue.set(this.state.experimentListshow, 'state', false)
    },
    SET_DISCONNECT_NETWORK: (state, inVerified) => {
      let safeFlowMessage = {}
      let message = {}
      message.type = 'safeflow'
      message.reftype = 'ignore'
      message.action = 'disconnect'
      message.jwt = inVerified.token
      safeFlowMessage = JSON.stringify(message)
      Vue.prototype.$socket.send(safeFlowMessage)
    }
  },
  actions: {
    actionDisconnect (context, update) {
      // set auth to not auth
      this.state.peerauthStatus = false
      // clear peer data
      this.state.joinedNXPlist = []
      // clear list of dashboards
      this.state.liveDashList = []
      // clear peeers and data list
      this.state.warmNetwork = []
      this.state.publickeys = []
      this.state.moduleGrid = {}
      this.state.NXPexperimentData = {}
      this.state.replicateNXPexperimentList = {}
      Vue.set(this.state.spaceStateShow, 'state', true)
      Vue.set(this.state.spaceStateShow, 'text', 'hide')
      Vue.set(this.state.networkConnection, 'active', false)
      Vue.set(this.state.networkConnection, 'text', 'connect')
      Vue.set(this.state.networkConnection, 'type', 'self-verify')
      // clear the minimap
      context.dispatch('actionResetMmap', 'clear', { root: true })
      context.dispatch('actionClearPosition', 'clear', { root: true })
      let dataEnd = {}
      dataEnd.token = context.rootState.jwttoken
      dataEnd.update = update
      context.commit('SET_DISCONNECT_NETWORK', dataEnd)
      // context.commit('SOCKET_ONCLOSE')
      // empty miniMap
      context.dispatch('actionResetMmap', { root: true })
      window.close()
    },
    actionHOPdataAssess (context, data) {
      context.commit('UPDATE_HOP_HOLDER', data)
    },
    actionHOPdataHander (context, data) {
      // public library
      const localthis = this
      let saveDash = Object.keys(localthis.state.peersocket.libraryHolder.bentospacestart)
      if (saveDash.length > 0) {
        if (localthis.state.peersocket.libraryHolder.bentospacestart.data.value.layout !== null) {
          let nxpList = Object.keys(localthis.state.peersocket.libraryHolder.bentospacestart.data.value.layout)
          for (let nxp of nxpList) {
            let positionStartInfo = {}
            positionStartInfo.nxp = nxp
            positionStartInfo.coord = localthis.state.peersocket.libraryHolder.bentospacestart.data.value.layout[nxp]
            positionStartInfo.type = 'saved'
            // set active space
            localthis.dispatch('actionLiveNXPlist', localthis.state.joinedNXPlist.data, { root: true })
            localthis.dispatch('actionPostionCoord', positionStartInfo, { root: true })
            localthis.dispatch('actionDashboardState', positionStartInfo, { root: true })
          }
          // peerlibrary
          for (let nxp of nxpList) {
            let positionStartInfo = {}
            positionStartInfo.nxp = nxp
            positionStartInfo.coord = localthis.state.peersocket.libraryHolder.bentospacestart.data.value.layout[nxp]
            positionStartInfo.type = 'saved'
            // set the active dash list
            localthis.dispatch('actionLiveNXPlist', localthis.state.joinedNXPlist.data, { root: true })
            localthis.dispatch('actionPostionCoord', positionStartInfo, { root: true })
            localthis.dispatch('actionDashboardState', positionStartInfo, { root: true })
          }
        } else {
          console.log('no start list')
        }
      }
    },
    actionOpenLibrary (context, data) {
      let openLibrary = {}
      openLibrary.type = 'library'
      openLibrary.reftype = 'openlibrary'
      openLibrary.data = data
      openLibrary.jwt = this.state.jwttoken
      Vue.prototype.$socket.send(JSON.stringify(openLibrary))
    },
    actionWarmPeers (context, message) {
      let getWarmPeers = {}
      getWarmPeers.type = 'library'
      getWarmPeers.reftype = 'warm-peers'
      getWarmPeers.jwt = this.state.jwttoken
      Vue.prototype.$socket.send(JSON.stringify(getWarmPeers))
    },
    actionGetRefContract (context, message) {
      message.jwt = this.state.jwttoken
      Vue.prototype.$socket.send(message)
    },
    actionLibraryPublickey (context, message) {
      const pubkeyGet = {}
      pubkeyGet.type = 'library'
      pubkeyGet.reftype = 'viewpublickey'
      pubkeyGet.jwt = this.state.jwttoken
      Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
    },
    actionPeersyncLibrary (context, message) {
      const peerSync = {}
      peerSync.type = 'library'
      peerSync.reftype = 'replicatekey'
      peerSync.publickey = message
      peerSync.jwt = this.state.jwttoken
      const peerSyncJSON = JSON.stringify(peerSync)
      Vue.prototype.$socket.send(peerSyncJSON)
      // set the replication status
      this.state.replicatDataStatus = true
    },
    actionViewSyncLibrary (context, message) {
      const viewSyncLibrary = {}
      viewSyncLibrary.type = 'library'
      viewSyncLibrary.reftype = 'view-replicatelibrary'
      viewSyncLibrary.publickey = ''
      viewSyncLibrary.jwt = this.state.jwttoken
      const replicateJSON = JSON.stringify(viewSyncLibrary)
      Vue.prototype.$socket.send(replicateJSON)
    },
    actionAddwarmPeer (context, message) {
      message.jwt = this.state.jwttoken
      Vue.prototype.$socket.send(message)
    },
    actionMakeVisualiseRefContract (context, message) {
      // Vue.prototype.$socket.send(message)
    },
    actionMakeModuleRefContract (context, update) {
      // open the modal
      this.state.isModalNewNetworkExperiment = true
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
      /* const dataCNRLbundle3 = {}
      dataCNRLbundle3.reftype = 'module'
      dataCNRLbundle3.type = 'device'
      dataCNRLbundle3.primary = 'genesis'
      dataCNRLbundle3.concept = ''
      dataCNRLbundle3.grid = []
      moduleContracts.push(dataCNRLbundle3) */
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      /* const dataCNRLbundle4 = {}
      dataCNRLbundle4.reftype = 'module'
      dataCNRLbundle4.type = 'mobile'
      dataCNRLbundle4.primary = 'genesis'
      dataCNRLbundle4.concept = ''
      dataCNRLbundle4.grid = []
      moduleContracts.push(dataCNRLbundle4) */
      // module ref contract utility type
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
      /* const dataCNRLbundle8 = {}
      dataCNRLbundle8.reftype = 'module'
      dataCNRLbundle8.type = 'lifestyle'
      dataCNRLbundle8.primary = 'genesis'
      dataCNRLbundle8.concet = ''
      dataCNRLbundle8.grid = []
      moduleContracts.push(dataCNRLbundle8) */
      /* const dataCNRLbundle9 = {}
      dataCNRLbundle9.reftype = 'module'
      dataCNRLbundle9.type = 'error'
      dataCNRLbundle9.primary = 'genesis'
      dataCNRLbundle9.concept = ''
      dataCNRLbundle9.grid = []
      moduleContracts.push(dataCNRLbundle9) */
      /* const dataCNRLbundle10 = {}
      dataCNRLbundle10.reftype = 'module'
      dataCNRLbundle10.type = 'control'
      dataCNRLbundle10.primary = 'genesis'
      dataCNRLbundle10.concept = ''
      dataCNRLbundle10.grid = []
      moduleContracts.push(dataCNRLbundle10) */
      const dataCNRLbundle11 = {}
      dataCNRLbundle11.reftype = 'module'
      dataCNRLbundle11.type = 'prescription'
      dataCNRLbundle11.primary = 'genesis'
      dataCNRLbundle11.concept = ''
      dataCNRLbundle11.grid = []
      moduleContracts.push(dataCNRLbundle11)
      /* const dataCNRLbundle12 = {}
      dataCNRLbundle12.reftype = 'module'
      dataCNRLbundle12.type = 'communication'
      dataCNRLbundle12.primary = 'genesis'
      dataCNRLbundle12.concept = ''
      dataCNRLbundle12.grid = []
      moduleContracts.push(dataCNRLbundle12) */
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      /* const dataCNRLbundle13 = {}
      dataCNRLbundle13.reftype = 'module'
      dataCNRLbundle13.type = 'idea'
      dataCNRLbundle13.primary = 'genesis'
      dataCNRLbundle13.concept = ''
      dataCNRLbundle13.grid = []
      moduleContracts.push(dataCNRLbundle13) */
      const dataCNRLbundle14 = {}
      dataCNRLbundle14.reftype = 'module'
      dataCNRLbundle14.type = 'rhino'
      dataCNRLbundle14.primary = 'genesis'
      dataCNRLbundle14.concept = ''
      dataCNRLbundle14.grid = []
      moduleContracts.push(dataCNRLbundle14)
      const dataCNRLbundle15 = {}
      dataCNRLbundle15.reftype = 'module'
      dataCNRLbundle15.type = 'pricing'
      dataCNRLbundle15.primary = 'genesis'
      dataCNRLbundle15.concept = ''
      dataCNRLbundle15.grid = []
      moduleContracts.push(dataCNRLbundle15)
      let tempModules = {}
      tempModules.type = 'library'
      tempModules.reftype = 'moduletemp'
      tempModules.action = 'moduletemp'
      tempModules.data = moduleContracts
      tempModules.jwt = this.state.jwttoken
      // send to Library to create new temp modules
      const newTempModules = JSON.stringify(tempModules)
      Vue.prototype.$socket.send(newTempModules)
    },
    actionClearContributeNXP (context, update) {
      context.commit('CLEAR_CONTRIB_REFCONTRACTS', update)
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
    actionSetVisualiseRefContract (context, update) {
      // loop up vis contract details
      let refContractLookup = ToolUtility.refcontractLookup(update.refcont, this.state.liveRefContIndex.visualise)
      update.option = refContractLookup
      context.commit('SET_VISUALISE_REFCONTRACT', update)
      // need to set Temporary vis toolbar settings
      context.commit('NEW_NXP_SHELL_TEMP', update.shellID)
      context.commit('SET_VISTOOLS_TEMP', update)
      context.commit('SETOPEN_DATABAR_TEMP', update)
    },
    /* actionMakeKBIDentry (context, message) {
      let prepareKBIDentry = this.state.livesafeFLOW.kbidComposerLive.kbidEntry(message)
      prepareKBIDentry.jwt = this.state.jwttoken
      const kbidEntryReady = JSON.stringify(prepareKBIDentry)
      Vue.prototype.$socket.send(kbidEntryReady)
    }, */
    sourceDataExperiment (context, update) {
      context.commit('SET_JOIN_NXP_SOURCE', update)
    },
    buildRefComputeControls (context, update) {
      context.commit('SET_JOIN_NXP_COMPUTE_CONTROLS', update)
    },
    buildRefComputeAutomation (context, update) {
      context.commit('SET_JOIN_NXP_COMPUTE_AUTO', update)
    },
    actionSetVisDevice (context, update) {
      context.commit('SET_SETNXP_VISDEVICES', update)
    },
    actionSetVisCompute (context, update) {
      context.commit('SET_SETNXP_VISCOMPUTE', update)
    },
    actionSetVisResults (context, update) {
      context.commit('SET_SETNXP_VISRESULTS', update)
    },
    actionSetVisXaxis (context, update) {
      context.commit('SET_SETNXP_VISXAXIS', update)
    },
    actionSetVisYaxis (context, update) {
      context.commit('SET_SETNXP_VISYAXIS', update)
    },
    actionSetVisCategory (context, update) {
      context.commit('SET_SETNXP_VISCATEGORY', update)
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
    actionSetTimeFormat (context, update) {
      context.commit('SET_TIMEFORMAT_STYLE', update)
    },
    actionLegendStatus (context, update) {
      context.commit('SET_LEGEND_STATUS', update)
    },
    actionFeeback (context, update) {
      context.commit('SET_FEEDBACK_MEASSAGE', update)
    },
    actionSetVisTime (context, update) {
      context.commit('SET_SETNXP_VISTIME', update)
    },
    actionSetVisResolution (context, update) {
      context.commit('SET_SETNXP_VISRESOLUTION', update)
    },
    actionNewNXPrefcontract (context, update) {
      // add the question module
      // need form validation must question, data, compute and vis modules complete inputs
      let moduleCheck = true
      if (this.state.newNXPfeedbackActive === false) {
        context.commit('SET_QUESTION_MODULE')
      }
      // loop over modues to ensure they prepared correctly
      if (this.state.moduleHolder.length < 4) {
        moduleCheck = false
        // which modules are missing, give peer prompt
      }
      if (moduleCheck === false) {
        this.state.newNXPfeedback = 'please add four contracts and try again'
        this.state.newNXPfeedbackActive = true
      } else {
        // prepare the genesis modules please
        // close the modal
        this.state.isModalNewNetworkExperiment = false
        this.state.newNXPfeedbackActive = false
        // loop over and set compute settings selected via toolbar
        let newAddsettingHolder = []
        for (let newMod of this.state.moduleHolder) {
          if (newMod.moduleinfo.name === 'visualise') {
            let addSettings = newMod
            addSettings.option['settings'] = this.state.newSetupHolder
            newAddsettingHolder.push(addSettings)
          } else {
            newAddsettingHolder.push(newMod)
          }
        }
        // bring together genesis experiment ref contracts & defaults
        let setNewNXPplusModules = {}
        setNewNXPplusModules.type = 'library'
        setNewNXPplusModules.reftype = 'newexperimentmodule'
        setNewNXPplusModules.action = 'newexperimentmodule'
        setNewNXPplusModules.data = this.state.moduleHolder
        setNewNXPplusModules.jwt = this.state.jwttoken
        const genesisNXPjson = JSON.stringify(setNewNXPplusModules)
        Vue.prototype.$socket.send(genesisNXPjson)
        // clear the new NXP forms
        this.state.moduleHolder = []
        this.state.refcontractQuestion = {}
        this.state.genRefcontractCompute = []
        // clear the forms and inputs ref contrat modules
        this.state.nxpMakeList = []
        this.state.moduleHolder = []
        let qOptions = {}
        qOptions.text = ''
        qOptions.forum = ''
        this.state.refcontractQuestion.question = qOptions
        this.state.refcontractCompute = []
      }
    },
    actionJoinBoard (context, update) {
      // perform validation checks
      // map experiment refcont to genesis contract
      // make first module contracts for this peer to record start and other module refs with new computations
      const genesisExpRefCont = this.state.joinNXPlive.experiment
      // validate all the NXP join inputs are present?
      let validJoinInput = false
      let computeValid = ValidateUtility.validateComputeSettings(this.state.joinNXPselected)
      let visValid = ValidateUtility.validateVisSettings(this.state.joinNXPselected)
      if (computeValid.pass === true && visValid === true) {
        validJoinInput = true
      }
      if (validJoinInput === true) {
        // send to Library to create new experiment and modules for peer
        let dataChoices = {}
        dataChoices.exp = genesisExpRefCont
        let optionsSelected = {}
        optionsSelected.data = this.state.joinNXPselected.data
        optionsSelected.compute = this.state.joinNXPselected.compute
        optionsSelected.visualise = this.state.newSetupHolder
        dataChoices.options = optionsSelected
        let newJoinExperiment = {}
        newJoinExperiment.type = 'library'
        newJoinExperiment.reftype = 'joinexperiment'
        newJoinExperiment.action = 'joinexperiment'
        newJoinExperiment.data = dataChoices
        newJoinExperiment.jwt = this.state.jwttoken
        let ExpmoduleRefContract = JSON.stringify(newJoinExperiment)
        Vue.prototype.$socket.send(ExpmoduleRefContract)
        this.state.isModalJoinNetworkExperiment = false
        this.state.joineNXPFeedbackActive = true
        // switch to private spaces menu
        this.state.spaceState = 'private'
      } else {
        // provide feedback to Peer on what is missing from joining the NXP
        this.state.joineNXPFeedback = 'Please select a date . .. .'
        this.state.joineNXPFeedbackActive = true
        // this.state.isModalJoinNetworkExperiment = true
      }
    },
    actionCombineSpace (context, update) {
      // combine two visualisation data space and combine
      context.commit('SET_COMBINE_CONTEXT', update)
    },
    actionExperimentList (context, update) {
      context.commit('SET_NXPLIST_SHOW', update)
    },
    actionExperimentListDefault (context, update) {
      context.commit('SET_NXPLIST_DEFAULT', update)
    },
    actionSelfSignin (context, update) {
      let cloudInfo = {}
      cloudInfo.type = 'safeflow'
      cloudInfo.reftype = 'ignore'
      cloudInfo.action = 'selfauth'
      cloudInfo.network = null // update.network
      cloudInfo.settings = null // update.settings
      cloudInfo.data = update
      let cloudAuth = JSON.stringify(cloudInfo)
      Vue.prototype.$socket.send(cloudAuth)
    },
    actionRrefreshRefContracts (context, update) {
      const refContractp = {}
      refContractp.type = 'library'
      refContractp.reftype = 'publiclibrary'
      refContractp.action = 'GET'
      refContractp.jwt = this.state.jwttoken
      const refCJSONp = JSON.stringify(refContractp)
      Vue.prototype.$socket.send(refCJSONp)
    },
    actionAddPubliclibrary (context, update) {
      let connectModules = []
      for (let modref of this.state.tempNetworkLibrary.networkExpModules) {
        if (update.nxpID === modref.exp.key) {
          connectModules = modref
        }
      }
      let matchModules = []
      for (let mod of connectModules.modules) {
        let dtMatch = this.state.tempNetworkLibrary.referenceContracts.module.find(elem => elem.key === mod.key)
        matchModules.push(dtMatch)
      }
      const refContractp = {}
      refContractp.type = 'library'
      refContractp.reftype = 'addpubliclibraryentry'
      refContractp.action = 'add'
      refContractp.data = update
      refContractp.jwt = this.state.jwttoken
      const refCJSONp = JSON.stringify(refContractp)
      Vue.prototype.$socket.send(refCJSONp)
    },
    actionRemoveTempNLibrary (context, update) {
      const refContractp = {}
      refContractp.type = 'library'
      refContractp.reftype = 'removetemppubliclibrary'
      refContractp.action = 'remove-templibrary'
      refContractp.data = update
      refContractp.jwt = this.state.jwttoken
      const refCJSONp = JSON.stringify(refContractp)
      Vue.prototype.$socket.send(refCJSONp)
    },
    actionSaveSpaceNXP (context, update) {
      const saveSpacePosition = {}
      saveSpacePosition.type = 'bentospace'
      saveSpacePosition.reftype = 'bentospace'
      saveSpacePosition.action = 'save-position'
      let spaceLayout = {}
      spaceLayout.layout = this.state.positionSpace.liveSpaceCoord
      spaceLayout.zoom = this.state.activeScalevalue
      saveSpacePosition.data = spaceLayout
      saveSpacePosition.jwt = this.state.jwttoken
      const saveJSONp = JSON.stringify(saveSpacePosition)
      Vue.prototype.$socket.send(saveJSONp)
    },
    actionSaveSoloSpaceCells (context, update) {
      const saveSpacePosition = {}
      saveSpacePosition.type = 'bentospace'
      saveSpacePosition.reftype = 'solospace'
      saveSpacePosition.action = 'save-position'
      // need board, modules, dataprint? i.e. settings two ways of looking at this. 1. provide compute link contract that will be unique and mean KBLedger needs that at refence, 2.  save dataprint i.e. date, datatype, device info. and use that to input into HOP so SafeFlow-ECS can assess whether results exist before or it is a brand new?
      // extract context for each uuid modue holder
      let contextMod = []
      // go over each board
      let boardKeys = Object.keys(this.state.solopositionSpace.initialGrid)
      for (let board of boardKeys) {
        for (let gridID of Object.keys(this.state.solopositionSpace.initialGrid[board])) {
          for (let dev of Object.keys(this.state.solopositionSpace.initialGrid[board][gridID])) {
            // next match the device id to soloData context i.e. dataPrint triplet
            if (this.state.solopositionSpace.soloData[gridID]?.prime?.text === 'Visualise') {
              let cellID = this.state.solopositionSpace.initialGrid[board][gridID][dev].cell.i
              let contextCell = {}
              contextCell.mod = gridID
              contextCell.context = this.state.solopositionSpace.soloData[gridID].data[cellID].context
              contextMod.push(contextCell)
            }
          }
        }
      }
      // console.log(contextMod)
      let soloLocHolder = {}
      soloLocHolder.initialgrid = this.state.solopositionSpace.initialGrid
      soloLocHolder.solozoom = this.state.solopositionSpace.soloZoom
      soloLocHolder.context = contextMod
      saveSpacePosition.data = soloLocHolder
      saveSpacePosition.jwt = this.state.jwttoken
      // console.log('solop spa ce layuo')
      // console.log(saveSpacePosition)
      const saveJSONp = JSON.stringify(saveSpacePosition)
      Vue.prototype.$socket.send(saveJSONp)
    },
    actionSyncRequest (context, update) {
      const syncDataBundle = {}
      syncDataBundle.type = 'library'
      syncDataBundle.reftype = 'sync-nxp-data'
      syncDataBundle.action = 'replicate'
      syncDataBundle.data = update
      syncDataBundle.jwt = this.state.jwttoken
      const syncJSON = JSON.stringify(syncDataBundle)
      Vue.prototype.$socket.send(syncJSON)
    },
    actionFileupload (context, update) {
      const fileLocalBundle = {}
      fileLocalBundle.type = 'library'
      fileLocalBundle.reftype = 'convert-csv-json'
      fileLocalBundle.action = 'localfile'
      fileLocalBundle.data = update
      fileLocalBundle.jwt = this.state.jwttoken
      const fileJSON = JSON.stringify(fileLocalBundle)
      Vue.prototype.$socket.send(fileJSON)
    },
    actionLibraryStart (context, update) {
      context.commit('LIBRARY_START_DATA', update)
    },
    actionHOPoutState (context, update) {
      context.commit('SET_HOPOUT_MESSAGE', update)
    },
    actionSetCompHolder (context, update) {
      context.commit('SET_COMPHOLDER_COPY', update)
    }
  }
}
