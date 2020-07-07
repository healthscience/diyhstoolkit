import Vue from 'vue'
import RCcomposer from '@/mixins/rcComposer.js'
const refcontComposerLive = new RCcomposer()

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
      console.log('peerLink response')
      // console.log(message.data)
      const backJSON = JSON.parse(message.data)
      console.log('back message')
      // console.log(backJSON)
      if (backJSON.stored === true) {
        // success in saving reference contract
        console.log('save successful')
      } else {
        // query back from peer data store
        // pass to sort data into ref contract types
        const segmentedRefContracts = refcontComposerLive.refcontractSperate(backJSON)
        console.log('segmentated contracts')
        console.log(segmentedRefContracts)
        this.state.referenceContract = segmentedRefContracts
      }
    },
    SET_PACKAGING_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      // Vue.set(state.refcontractPackaging, 'packaging' inVerified)
      this.state.refcontractPackaging = inVerified
      console.log('after set packaging')
      console.log(state.refContractPackaging)
    },
    SET_COMPUTE_REFCONTRACT (state, inVerified) {
      console.log(inVerified)
      // Vue.set(state.refcontractPackaging, 'packaging' inVerified)
      this.state.refcontractCompute = inVerified
      console.log('after set packaging')
      console.log(state.refContractCompute)
    }
  },
  actions: {
    sendMessage (context, message) {
      console.log('Ref Contract preapre peerLink')
      console.log(message)
      let prepareRefContract = {}
      if (message.reftype === 'new-datatype') {
        const localData = this.state.newRefcontractForm
        prepareRefContract = refcontComposerLive.dataTypePrepare(localData)
      } else if (message.reftype === 'new-packaging') {
        prepareRefContract = refcontComposerLive.packagingPrepare(this.state.newPackingForm)
      } else if (message.reftype === 'new-compute') {
        prepareRefContract = refcontComposerLive.computePrepare(this.state.newComputeForm)
      }
      const referenceContractReady = JSON.stringify(prepareRefContract)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    actionGetRefContract (context, message) {
      console.log('action for ws')
      Vue.prototype.$socket.send(message)
    },
    actionSetRefContract (context, update) {
      console.log('look up peer store for refContract')
      let refContractLookup = refcontComposerLive.refcontractLookup(update, this.state.referenceContract.packaging)
      console.log('refContractLookup')
      console.log(refContractLookup)
      context.commit('SET_PACKAGING_REFCONTRACT', refContractLookup)
    },
    actionSetComputeRefContract (context, update) {
      console.log('look compute refContracts')
      let refContractLookup = refcontComposerLive.refcontractLookup(update, this.state.referenceContract.compute)
      console.log('refContractLookup')
      console.log(refContractLookup)
      context.commit('SET_COMPUTE_REFCONTRACT', refContractLookup)
    }
  }
}
