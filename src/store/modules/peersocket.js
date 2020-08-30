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
        } else if (backJSON.type === 'experiment') {
          console.log('network experiment genesis saved')
          this.state.moduleListEnd = false
        }
        console.log('module geneis list')
        console.log(this.state.moduleGenesisList)
        if (this.state.moduleListEnd === true) {
          // pass to Network Library Composer to make New Network Experiment Reference Contract ie. extract genesis module contract keys
          const prepareNXPrefcont = this.state.livesafeFLOW.refcontComposerLive.experimentComposerGenesis(this.state.moduleGenesisList)
          console.log('prepare genesis network experiment')
          console.log(prepareNXPrefcont)
          const referenceContractReady = JSON.stringify(prepareNXPrefcont)
          // console.log(referenceContractReady)
          Vue.prototype.$socket.send(referenceContractReady)
        }
      } else {
        // query back from peer data store
        // pass to sort data into ref contract types
        const segmentedRefContracts = this.state.livesafeFLOW.refcontUtilityLive.refcontractSperate(backJSON)
        console.log('segmentated contracts')
        console.log(segmentedRefContracts)
        this.state.referenceContract = segmentedRefContracts
        // prepare nxp list format
        let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
        let gridData = []
        // need to split for genesis and peer joined NXPs
        const nxpSplit = this.state.livesafeFLOW.refcontUtilityLive.experimentSplit(segmentedRefContracts.experiment)
        console.log('split geneiss joined')
        console.log(nxpSplit)
        // look up modules for this experiments
        this.state.networkExpModules = this.state.livesafeFLOW.refcontUtilityLive.expMatchModule(this.state.referenceContract.module, nxpSplit.genesis)
        for (let nxp of this.state.networkExpModules) {
          // look up question
          let question = this.state.livesafeFLOW.refcontUtilityLive.extractQuestion(nxp.modules, 'question')
          gridData.push({ id: nxp.exp.key, name: question.text, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'Join' })
        }
        let gridAnnon = {}
        gridAnnon.columns = gridColumns
        gridAnnon.data = gridData
        this.state.NXPexperimentList = gridAnnon
        // console.log('available NXP in network available')
        // console.log(this.state.NXPexperimentList)
        let gridDatapeer = []
        for (let nxp of nxpSplit.joined) {
          // console.log(nxp)
          gridDatapeer.push({ id: nxp.key, name: nxp.value.concept.new, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'View' })
        }
        let gridPeer = {}
        gridPeer.columns = gridColumns
        gridPeer.data = gridDatapeer
        this.state.joinedNXPlist = gridPeer
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
      console.log('set packaing')
      console.log(inVerified)
      // add to module list full details
      this.state.moduleHolder.push(inVerified)
      // add to module list
      this.state.newNXPmakeRefs.push(inVerified.moduleinfo.refcont)
      // feedback on option for UI
      this.state.refcontractPackaging.push(inVerified)
    },
    SET_COMPUTE_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      // add to module list full details
      this.state.moduleHolder.push(inVerified)
      this.state.newNXPmakeRefs.push(inVerified.moduleinfo.refcont)
      this.state.refcontractCompute.push(inVerified)
    },
    SET_VISUALISE_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      // add to module list full details
      this.state.moduleHolder.push(inVerified)
      this.state.newNXPmakeRefs.push(inVerified.moduleinfo.refcont)
      this.state.refcontractVisualise.push(inVerified)
    },
    SET_NXP_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      this.state.nxpRefContract = inVerified
      // send to peerLink for saving
      // Vue.set(this.state.nxpRefContract, 'nxpRefContract' inVerified)
    },
    SET_NEWNXP_VISDEVICES (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISCOMPUTE (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISRESULTS (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISXAXIS (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISYAXIS (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISCATEGORY (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISTIME (state, inVerified) {
      console.log(inVerified)
    },
    SET_NEWNXP_VISRESOLUTION (state, inVerified) {
      console.log(inVerified)
    },
    SET_MODULE_LIST (state, inVerified) {
      console.log(inVerified)
      this.state.nxpModulesList = inVerified
    },
    SET_QUESTION_MODULE (state, inVerified) {
      console.log('question module')
      console.log(this.state.refcontractQuestion)
      this.state.moduleHolder.push(this.state.refcontractQuestion)
      this.state.newNXPmakeRefs.push(this.state.refcontractQuestion.moduleinfo.refcont)
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
      console.log(prepareRefContract)
      const referenceContractReady = JSON.stringify(prepareRefContract)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    actionGetRefContract (context, message) {
      console.log('action for ws')
      Vue.prototype.$socket.send(message)
    },
    actionMakeVisualiseRefContract (context, message) {
      console.log('setup Visualise ref contract')
      console.log(message)
      // Vue.prototype.$socket.send(message)
    },
    actionMakeModuleRefContract (context, update) {
      console.log('setup Module Contracts')
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
        const prepareModule = this.state.livesafeFLOW.refcontComposerLive.moduleComposer(mc)
        let moduleContainer = {}
        moduleContainer.name = prepareModule.contract.concept.type
        moduleContainer.id = modCount
        moduleContainer.refcont = prepareModule.hash
        moduleHolder.push(moduleContainer)
        modCount++
        // const referenceContractReady = JSON.stringify(prepareModule)
        // Vue.prototype.$socket.send(referenceContractReady)
      }
      context.commit('SET_MODULE_LIST', moduleHolder)
    },
    actionSetQuestionRefContract (context, update) {
      // console.log('look up peer store for refContract')
      context.commit('SET_QUESTION_REFCONTRACT', update)
    },
    actionSetDataRefContract (context, update) {
      console.log('look up packaing for refContract')
      console.log(update)
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
    actionSetVisualiseRefContract (context, update) {
      // console.log('look visualise refContracts')
      let refContractLookup = this.state.livesafeFLOW.refcontUtilityLive.refcontractLookup(update.refcont, this.state.referenceContract.visualise)
      update.option = refContractLookup
      context.commit('SET_VISUALISE_REFCONTRACT', update)
    },
    actionNewNXPrefcontract (context, update) {
      console.log('new Shell info ref contracts')
      // add the question module
      context.commit('SET_QUESTION_MODULE')
      // prepare the genesis modules
      // loop over list of module contract to make genesis ie first
      let lengthMholder = this.state.moduleHolder.length
      console.log('num modules in this experiment')
      console.log(lengthMholder)
      for (let mh of this.state.moduleHolder) {
        const moduleRefContract = this.state.livesafeFLOW.refcontComposerLive.moduleComposer(mh)
        console.log('module genesis sent to peerLINK')
        console.log(moduleRefContract)
        const moduleRefContractReady = JSON.stringify(moduleRefContract)
        // console.log(moduleRefContractReady)
        Vue.prototype.$socket.send(moduleRefContractReady)
        lengthMholder--
        console.log('number of muldes LEFT')
        console.log(lengthMholder)
        if (lengthMholder === 0) {
          this.state.moduleListEnd = true
        }
      }
    },
    joinExperiment (context, update) {
      console.log('save to Peer datastore joined NXP')
      // map experiment refcont to genesis contract
      const genesisMatch = update
      const prepareNXPrefcont = this.state.livesafeFLOW.refcontComposerLive.experimentComposerJoin(genesisMatch)
      const referenceContractReady = JSON.stringify(prepareNXPrefcont)
      Vue.prototype.$socket.send(referenceContractReady)
      // need to add to active joined list TODO need check composer pass inputs
      // prepare column display list format
      console.log('joined NXP contract')
      console.log(prepareNXPrefcont)
      const newJOINnxp = { id: prepareNXPrefcont.hash, name: prepareNXPrefcont.contract.modules, description: '--', time: Infinity, dapps: 'new Joined peer selected', device: 'Yes', action: 'View' }
      console.log('existing joined list')
      console.log(this.state.joinedNXPlist)
      this.state.joinedNXPlist.data.push(newJOINnxp)
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
    sourceExperiment (context, update) {
      console.log('peer select data source for NXP')
    },
    actionNewVisDevices (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISDEVICES', update)
    },
    actionNewVisCompute (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISCOMPUTE', update)
    },
    actionNewVisResults (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISRESULTS', update)
    },
    actionNewVisXaxis (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISXAXIS', update)
    },
    actionNewVisYaxis (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISYAXIS', update)
    },
    actionNewVisCategory (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISCATEGORY', update)
    },
    actionNewVisTime (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISTIME', update)
    },
    actionNewVisResolution (context, update) {
      console.log('new vis contract')
      context.commit('SET_NEWNXP_VISRESOLUTION', update)
    }
  }
}
