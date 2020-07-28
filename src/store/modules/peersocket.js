import Vue from 'vue'
// import RCcomposer from '@/mixins/rcComposer.js'
// const refcontComposerLive = new RCcomposer()

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
      // console.log('peerLink response')
      // console.log(message.data)
      const backJSON = JSON.parse(message.data)
      // console.log('back message')
      // console.log(backJSON)
      if (backJSON.stored === true) {
        // success in saving reference contract
        console.log('save successful')
      } else {
        // query back from peer data store
        // pass to sort data into ref contract types
        const segmentedRefContracts = this.state.livesafeFLOW.refcontComposerLive.refcontractSperate(backJSON)
        console.log('segmentated contracts')
        console.log(segmentedRefContracts)
        this.state.referenceContract = segmentedRefContracts
        // prepare nxp list format
        let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
        let gridData = []
        // need to split for genesis and peer joined NXPs
        const nxpSplit = this.state.livesafeFLOW.refcontComposerLive.experimentSplit(segmentedRefContracts.experiment)
        console.log('split geneiss joined')
        console.log(nxpSplit)
        for (let nxp of nxpSplit.genesis) {
          // console.log(nxp)
          gridData.push({ id: nxp.key, name: nxp.value.concept.new, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'Join' })
        }
        let gridAnnon = {}
        gridAnnon.columns = gridColumns
        gridAnnon.data = gridData
        this.state.NXPexperimentList = gridAnnon
        let gridDatapeer = []
        for (let nxp of nxpSplit.joined) {
          // console.log(nxp)
          gridDatapeer.push({ id: nxp.key, name: nxp.value.concept.new, description: '--', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', action: 'View' })
        }
        let gridPeer = {}
        gridPeer.columns = gridColumns
        gridPeer.data = gridDatapeer
        this.state.joinedNXPlist = gridPeer
        console.log('peer grid set')
        console.log(this.state.joinedNXPlist)
      }
    },
    SET_QUESTION_REFCONTRACT (state, inVerified) {
      this.state.refcontractQuestion = inVerified
      // this.state.newNXPmakeRefs.push(inVerified)
    },
    SET_PACKAGING_REFCONTRACT (state, inVerified) {
      // Vue.set(state.refcontractPackaging, 'packaging' inVerified)
      this.state.newNXPmakeRefs.push(inVerified)
      this.state.refcontractPackaging = inVerified
    },
    SET_COMPUTE_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      // Vue.set(state.refcontractPackaging, 'packaging' inVerified)
      this.state.newNXPmakeRefs.push(inVerified)
      this.state.refcontractCompute = inVerified
    },
    SET_VISUALISE_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      // Vue.set(state.refcontractPackaging, 'packaging' inVerified)
      this.state.newNXPmakeRefs.push(inVerified)
      this.state.refcontractVisualise = inVerified
    },
    SET_NXP_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      this.state.nxpRefContract = inVerified
      // send to peerLink for saving
      // Vue.set(this.state.nxpRefContract, 'nxpRefContract' inVerified)
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
      console.log(this.state.livesafeFLOW)
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
      dataCNRLbundle.primary = 'genesis'
      dataCNRLbundle.description = 'Question for network experiment'
      dataCNRLbundle.concept = 'cnrl-001234543212'
      dataCNRLbundle.grid = []
      moduleContracts.push(dataCNRLbundle)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle2 = {}
      dataCNRLbundle2.reftype = 'module'
      dataCNRLbundle2.primary = 'genesis'
      dataCNRLbundle2.description = 'data source(s) for network experiment'
      dataCNRLbundle2.grid = []
      moduleContracts.push(dataCNRLbundle2)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle3 = {}
      dataCNRLbundle3.reftype = 'module'
      dataCNRLbundle3.primary = 'genesis'
      dataCNRLbundle3.concept = 'cnrl-001297343304'
      dataCNRLbundle3.grid = []
      moduleContracts.push(dataCNRLbundle3)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle4 = {}
      dataCNRLbundle4.reftype = 'module'
      dataCNRLbundle4.primary = 'genesis'
      dataCNRLbundle4.concept = 'cnrl-001234543304'
      dataCNRLbundle4.grid = []
      moduleContracts.push(dataCNRLbundle4)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle5 = {}
      dataCNRLbundle5.reftype = 'module'
      dataCNRLbundle5.primary = 'cnrl-primary'
      dataCNRLbundle5.concept = 'cnrl-001234543213'
      dataCNRLbundle5.grid = []
      moduleContracts.push(dataCNRLbundle5)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle6 = {}
      dataCNRLbundle6.reftype = 'module'
      dataCNRLbundle6.primary = 'genesis'
      dataCNRLbundle6.concept = 'cnrl-001234543214'
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
      const dataCNRLbundle7 = {}
      dataCNRLbundle7.reftype = 'module'
      dataCNRLbundle7.primary = 'genesis'
      dataCNRLbundle7.concept = 'cnrl-001234543458'
      dataCNRLbundle7.grid = []
      dataCNRLbundle7.rules = []
      dataCNRLbundle7.visualise = ''
      moduleContracts.push(dataCNRLbundle7)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle8 = {}
      dataCNRLbundle8.reftype = 'module'
      dataCNRLbundle8.primary = 'genesis'
      dataCNRLbundle8.concet = 'cnrl-001234543215'
      dataCNRLbundle8.grid = []
      moduleContracts.push(dataCNRLbundle8)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle9 = {}
      dataCNRLbundle9.reftype = 'module'
      dataCNRLbundle9.primary = 'genesis'
      dataCNRLbundle9.concept = 'cnrl-001234543216'
      dataCNRLbundle9.grid = []
      moduleContracts.push(dataCNRLbundle9)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle10 = {}
      dataCNRLbundle10.reftype = 'module'
      dataCNRLbundle10.primary = 'genesis'
      dataCNRLbundle10.concept = 'cnrl-001234543217'
      dataCNRLbundle10.grid = []
      moduleContracts.push(dataCNRLbundle10)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle11 = {}
      dataCNRLbundle11.reftype = 'module'
      dataCNRLbundle11.primary = 'genesis'
      dataCNRLbundle11.concept = 'cnrl-001234543218'
      dataCNRLbundle11.grid = []
      moduleContracts.push(dataCNRLbundle11)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle12 = {}
      dataCNRLbundle12.reftype = 'module'
      dataCNRLbundle12.primary = 'genesis'
      dataCNRLbundle12.concept = 'cnrl-001234543219'
      dataCNRLbundle12.grid = []
      moduleContracts.push(dataCNRLbundle12)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle13 = {}
      dataCNRLbundle13.reftype = 'module'
      dataCNRLbundle13.primary = 'genesis'
      dataCNRLbundle13.concept = 'cnrl-001234543220'
      dataCNRLbundle13.grid = []
      moduleContracts.push(dataCNRLbundle13)
      console.log(moduleContracts)
      for (const mc of moduleContracts) {
        console.log(mc)
        const prepareModule = this.state.livesafeFLOW.refcontComposerLive.modulePrepare(mc)
        const referenceContractReady = JSON.stringify(prepareModule)
        Vue.prototype.$socket.send(referenceContractReady)
      }
    },
    actionSetQuestionRefContract (context, update) {
      // console.log('look up peer store for refContract')
      context.commit('SET_QUESTION_REFCONTRACT', update)
    },
    actionSetRefContract (context, update) {
      // console.log('look up peer store for refContract')
      let refContractLookup = this.state.livesafeFLOW.refcontComposerLive.refcontractLookup(update, this.state.referenceContract.packaging)
      // console.log('refContractLookup')
      // console.log(refContractLookup)
      context.commit('SET_PACKAGING_REFCONTRACT', refContractLookup)
    },
    actionSetComputeRefContract (context, update) {
      console.log('look compute refContracts')
      let refContractLookup = this.state.livesafeFLOW.refcontComposerLive.refcontractLookup(update, this.state.referenceContract.compute)
      console.log('refContractLookup')
      console.log(refContractLookup)
      context.commit('SET_COMPUTE_REFCONTRACT', refContractLookup)
    },
    actionSetVisualiseRefContract (context, update) {
      console.log('look visualise refContracts')
      let refContractLookup = this.state.livesafeFLOW.refcontComposerLive.refcontractLookup(update, this.state.referenceContract.visualise)
      context.commit('SET_VISUALISE_REFCONTRACT', refContractLookup)
    },
    actionNewNXPrefcontract (context, update) {
      console.log('new Shell info ref contracts')
      // add contenet from Question (default module)
      // this.state.newNXPmakeRefs.push(this.state.refcontractQuestion)
      // let nxpBundle = {}
      // add content from question module
      const liveMakeRefContracts = this.state.nxpMakeList
      // aggregate the modules with contracts
      for (const lnxp of liveMakeRefContracts) {
        console.log(lnxp.refcont)
      }
      console.log('modules live in nxp make')
      console.log(this.state.newNXPmakeRefs)
      // console.log(this.state.refcontractPackaging)
      // console.log(this.state.refcontractCompute)
      // console.log(this.state.refcontractVisualise)
      // pass to Network Library Composer to make New Network Experiment Reference Contract
      const prepareNXPrefcont = this.state.livesafeFLOW.refcontComposerLive.experimentComposerGenesis(this.state.newNXPmakeRefs, this.state.refcontractQuestion)
      console.log(prepareNXPrefcont)
      const referenceContractReady = JSON.stringify(prepareNXPrefcont)
      console.log(referenceContractReady)
      // Vue.prototype.$socket.send(referenceContractReady)
    },
    joinExperiment (context, update) {
      console.log('save to Peer datastore joined NXP')
      // map experiment refcont to genesis contract
      const genesisMatch = update
      const prepareNXPrefcont = this.state.livesafeFLOW.refcontComposerLive.experimentComposerJoin(genesisMatch)
      const referenceContractReady = JSON.stringify(prepareNXPrefcont)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    sourceExperiment (context, update) {
      console.log('peer select data source for NXP')
    }
  }
}
