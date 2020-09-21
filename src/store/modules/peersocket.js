import Vue from 'vue'

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
      console.log('back message')
      console.log(backJSON)
      if (backJSON.stored === true) {
        // success in saving reference contract
        console.log('save successful')
        // what type of save?
        if (backJSON.type === 'module') {
          this.state.moduleGenesisList.push(backJSON)
          // keep track of how many modules
          this.state.lengthMholder--
          if (this.state.lengthMholder === 0) {
            this.state.moduleListEnd = true
          }
          this.state.lengthMholderj--
          if (this.state.lengthMholderj === 0) {
            this.state.moduleJoinedListEnd = true
          }
        }
        if (this.state.moduleListEnd === true) {
          // pass to Network Library Composer to make New Network Experiment Reference Contract ie. extract genesis module contract keys
          // const prepareNXPrefcont = this.state.livesafeFLOW.refcontComposerLive.experimentComposerGenesis(this.state.moduleGenesisList)
          // const referenceContractReady = JSON.stringify(prepareNXPrefcont)
          // Vue.prototype.$socket.send(referenceContractReady)
        } else if (this.state.moduleJoinedListEnd === true) {
          // pass to Network Library Composer to make New Network Experiment Reference Contract ie. extract genesis module contract keys
          // const prepareNXPrefcont = this.state.livesafeFLOW.refcontComposerLive.experimentComposerJoin(this.state.moduleGenesisList)
          // const referenceContractReady = JSON.stringify(prepareNXPrefcont)
          // Vue.prototype.$socket.send(referenceContractReady)
        }
      } else if (backJSON.safeflow === true) {
        // safeFLOW inflow
        if (backJSON.type === 'auth') {
          console.log('auth complete')
          console.log(backJSON)
          // get starting experiments
          const refContract = {}
          refContract.type = 'library'
          refContract.reftype = 'datatype'
          refContract.action = 'GET'
          const refCJSON = JSON.stringify(refContract)
          Vue.prototype.$socket.send(refCJSON)
        }
      } else if (backJSON.type === 'extractexperiment') {
        console.log('data ref contract extract')
        console.log(backJSON)
        Vue.set(this.state.joinNXPlive, 'data', backJSON.data)
        Vue.set(this.state.joinNXPlive, 'compute', backJSON.compute)
        Vue.set(this.state.joinNXPlive, 'visualise', backJSON.visualise)
        // set dataModule
        // set vis tools
        let tempNew = {}
        tempNew.shellID = '1234567'
        tempNew.moduleCNRL = 'cnrl-001234543458'
        tempNew.mData = '98889'
        // context.commit('NEW_NXP_SHELL', tempNew.shellID)
        Vue.set(this.state.newNXshell, 'tempshell', tempNew.shellID)
        // context.commit('SET_VISTOOLS_TEMP', tempNew)
        let setVisTools = {}
        setVisTools[tempNew.mData] = { text: 'open tools', active: true }
        Vue.set(this.state.toolbarVisStatus, tempNew.moduleCNRL, setVisTools)
        // context.commit('SETOPEN_DATABAR_TEMP', tempNew)
        let setToolbar = {}
        setToolbar[tempNew.mData] = { text: 'open data', active: true }
        Vue.set(this.state.opendataTools, tempNew.moduleCNRL, setToolbar)
        /* this.$store.dispatch('actionSetDataRefContract', dataMod)
        this.$store.dispatch('actionSetTempToolbarVis', tempNew)
        this.$store.dispatch('actionSetVisualiseRefContract', visMod) */
      } else {
        console.log('network experiment data BACK FAE NetworkLibrary')
        // save copy of ref contract indexes
        this.state.liveRefContIndex = backJSON.referenceContracts
        // prepare NPXs in NETWORK
        this.state.networkExpModules = backJSON.networkExpModules
        // NETWORK tap into -- N B over time need to filter as info overload
        let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
        let gridData = []
        for (let nxp of backJSON.networkExpModules) {
          // look up question
          let question = { text: 111 } // this.state.livesafeFLOW.refcontUtilityLive.extractQuestion(nxp.modules, 'question')
          gridData.push({ id: nxp.exp.key, name: question.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview / Join' })
        }
        let gridAnnon = {}
        gridAnnon.columns = gridColumns
        gridAnnon.data = gridData
        this.state.NXPexperimentList = gridAnnon
        // set the dashboard toolbar status settings
        for (let exl of backJSON.networkExpModules) {
          console.log(exl)
          let experBundle = {}
          experBundle.cnrl = exl.exp.key
          experBundle.status = false
          experBundle.contract = exl.exp
          experBundle.modules = exl.modules
          let objectPropC = exl.exp.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
        }
        for (let nxp of backJSON.networkExpModules) {
          let setProgress = { text: 'Experiment in progress', active: false }
          Vue.set(this.state.nxpProgress, nxp.exp.key, setProgress)
        }
        // prepare PEER JOINED LIST
        let gridDatapeer = []
        for (let nxp of backJSON.networkPeerExpModules) {
          let question = 222 //  this.state.livesafeFLOW.refcontUtilityLive.extractQuestionJOINED(nxp.modules, 'question')
          gridDatapeer.push({ id: nxp.exp.key, name: question, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' })
        }
        let gridPeer = {}
        gridPeer.columns = gridColumns
        gridPeer.data = gridDatapeer
        this.state.joinedNXPlist = gridPeer
        console.log('complete start lists')
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
      this.state.refcontractPackaging.push(inVerified)
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
      Vue.set(this.state.visModuleHolder, 'yaxis', inVerified)
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
      console.log('set data source selected')
      console.log(this.state.joinNXPselected)
    },
    SET_DATE_STARTNXP (state, inVerified) {
      console.log('set date data flow starts')
      console.log(inVerified)
      Vue.set(this.state.joinNXPselected.compute, 'date', inVerified)
    },
    SET_JOIN_NXP_COMPUTE_CONTROLS (state, inVerified) {
      console.log('set join compute controls')
      Vue.set(this.state.joinNXPselected.compute, 'controls', inVerified)
    },
    SET_JOIN_NXP_COMPUTE_AUTO (state, inVerified) {
      console.log('set join compute controls')
      Vue.set(this.state.joinNXPselected.compute, 'automate', inVerified)
    },
    NEW_NXP_SHELL (state, inVerified) {
      Vue.set(state.newNXshell, 'tempshell', inVerified)
    },
    SET_VISTOOLS_TEMP (state, inVerified) {
      let setVisTools = {}
      setVisTools[inVerified.mData] = { text: 'open tools', active: true }
      Vue.set(state.toolbarVisStatus, inVerified.moduleCNRL, setVisTools)
    },
    SETOPEN_DATABAR_TEMP (state, inVerified) {
      let setToolbar = {}
      setToolbar[inVerified.mData] = { text: 'open data', active: true }
      Vue.set(state.opendataTools, inVerified.moduleCNRL, setToolbar)
    }
  },
  actions: {
    sendMessage (context, message) {
      // console.log('Ref Contract preapre peerLink')
      // console.log(message)
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
    actionGetRefContract (context, message) {
      Vue.prototype.$socket.send(message)
    },
    actionMakeVisualiseRefContract (context, message) {
      console.log('setup Visualise ref contract')
      console.log(message)
      // Vue.prototype.$socket.send(message)
    },
    actionMakeModuleRefContract (context, update) {
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
      // console.log(moduleContracts)
      let modCount = 1
      let moduleHolder = []
      for (const mc of moduleContracts) {
        // console.log(mc)
        const prepareModule = this.state.livesafeFLOW.refcontComposerLive.moduleComposer(mc, '', {})
        let moduleContainer = {}
        moduleContainer.name = prepareModule.contract.concept.type
        moduleContainer.id = modCount
        moduleContainer.refcont = prepareModule.hash
        moduleHolder.push(moduleContainer)
        modCount++
      }
      context.commit('SET_MODULE_LIST', moduleHolder)
    },
    actionSetQuestionRefContract (context, update) {
      // console.log('look up peer store for refContract')
      context.commit('SET_QUESTION_REFCONTRACT', update)
    },
    actionSetDataRefContract (context, update) {
      let refContractLookup = this.state.livesafeFLOW.refcontUtilityLive.refcontractLookup(update.refcont, this.state.referenceContract.packaging)
      update.option = refContractLookup
      context.commit('SET_PACKAGING_REFCONTRACT', update)
    },
    actionSetComputeRefContract (context, update) {
      // console.log('look compute refContracts')
      let refContractLookup = this.state.livesafeFLOW.refcontUtilityLive.refcontractLookup(update.refcont, this.state.referenceContract.compute)
      update.option = refContractLookup
      context.commit('SET_COMPUTE_REFCONTRACT', update)
    },
    actionSetTempToolbarVis (context, update) {
      // context.commit('NEW_NXP_SHELL', update.shellID)
      // context.commit('SET_VISTOOLS_TEMP', update)
      // context.commit('SETOPEN_DATABAR_TEMP', update)
      // console.log('toolbar set')
    },
    actionSetVisualiseRefContract (context, update) {
      context.commit('SET_VISUALISE_REFCONTRACT', update)
    },
    actionNewNXPrefcontract (context, update) {
      // add the question module
      context.commit('SET_QUESTION_MODULE')
      // prepare the genesis modules please
      // loop over list of module contract to make genesis ie first
      this.state.lengthMholder = this.state.moduleHolder.length
      // bring together defaults i.e. setting for compute/vis
      for (let mh of this.state.moduleHolder) {
        const moduleRefContract = this.state.livesafeFLOW.refcontComposerLive.moduleComposer(mh, '', this.state.visModuleHolder)
        const moduleRefContractReady = JSON.stringify(moduleRefContract)
        Vue.prototype.$socket.send(moduleRefContractReady)
      }
    },
    actionMakeKBIDtemplate (context, message) {
      console.log('make KBID template entry')
      console.log(message)
      let prepareKBIDtemplate = this.state.livesafeFLOW.kbidComposerLive.kbidTemplateNew(message)
      console.log(prepareKBIDtemplate)
      const kbidTemplateReady = JSON.stringify(prepareKBIDtemplate)
      console.log(kbidTemplateReady)
      // Vue.prototype.$socket.send(kbidTemplateReady)
    },
    actionMakeKBIDentry (context, message) {
      console.log('make KBID entry')
      console.log(message)
      let prepareKBIDentry = this.state.livesafeFLOW.kbidComposerLive.kbidEntry(message)
      console.log(prepareKBIDentry)
      const kbidEntryReady = JSON.stringify(prepareKBIDentry)
      console.log(kbidEntryReady)
      // Vue.prototype.$socket.send(kbidEntryReady)
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
    actionNewVisDevices (context, update) {
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
    actionJoinExperiment (context, update) {
      // map experiment refcont to genesis contract
      // make first module contracts for this peer to record start and other module refs with new computations
      console.log('JOIN NXP START-----')
      const genesisExpRefCont = this.state.livesafeFLOW.refcontUtilityLive.refcontractLookup(update.genesis, this.state.referenceContract.experiment)
      // for each module in experiment, add peer selections
      // loop over list of module contract to make genesis ie first
      this.state.lengthMholderj = genesisExpRefCont.value.modules.length
      for (let mh of genesisExpRefCont.value.modules) {
        // prepare new modules for this peer  ledger
        let peerModules = {}
        // look up module template genesis contract
        // console.log('module')
        // console.log(mh)
        let moduleExpanded = this.state.livesafeFLOW.refcontUtilityLive.refcontractLookup(mh.key, this.state.referenceContract.module)
        if (moduleExpanded.value.concept.moduleinfo.name === 'question') {
          peerModules.type = 'question'
          peerModules.question = moduleExpanded.value.concept.question
        } else if (moduleExpanded.value.concept.moduleinfo.name === 'data') {
          peerModules.type = 'data'
          peerModules.data = this.state.joinNXPselected.data
        } else if (moduleExpanded.value.concept.moduleinfo.name === 'compute') {
          peerModules.type = 'compute'
          peerModules.compute = moduleExpanded.value.concept.refcont
          peerModules.controls = this.state.joinNXPselected.compute
          peerModules.settings = this.state.visModuleHolder
        } else if (moduleExpanded.value.concept.moduleinfo.name === 'visualise') {
          peerModules.type = 'visualise'
          peerModules.visualise = moduleExpanded.value.concept.refcont
        }
        let moduleRefContract = this.state.livesafeFLOW.refcontComposerLive.moduleComposer(peerModules, 'join', '')
        let moduleRefContractReady = JSON.stringify(moduleRefContract)
        // console.log('send to NetworkLibrary to record in peers LEDGER')
        // console.log(moduleRefContractReady)
        Vue.prototype.$socket.send(moduleRefContractReady)
      }
    }
  }
}
