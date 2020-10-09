<template>
  <div id="visualise-nxp">
    <header>VISUALISE DASHBOARD BUILDER:</header>
    <div id="prime-visualise">
      <header>Type of visualisation:</header>
      <li class="visualise-medium-item">
        Network Library Reference Contract:<input v-model="visualRefCont" placeholder="Reference Contract">
        <button type="button" class="btn" @click="refContractLookup()">Lookup</button>
      </li>
      <li v-if="refContractVisualise.key">
        {{  }}
      </li>
    </div>
    <chart-builder v-if="type === 'chart.js'" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></chart-builder>
  </div>
</template>

<script>
import chartBuilder from '@/components/visualise/chartBuilder'

export default {
  name: 'nxp-visualdashboard',
  components: {
    chartBuilder
  },
  computed: {
    refContractVisualise: function () {
      console.log('vis live???')
      console.log(this.$store.state.refcontractVisualise.length)
      console.log(this.$store.state.refcontractVisualise)
      let liveVis = []
      if (this.$store.state.refcontractVisualise.length !== 0) {
        liveVis = this.$store.state.refcontractVisualise
      } else {
        liveVis = []
      }
      return liveVis
    }
  },
  props: {
    modData: {
      type: Object
    }
  },
  data: () => ({
    type: 'chart.js',
    shellID: '1234567',
    moduleCNRL: 'cnrl-001234543458',
    moduleType: 'vis',
    mData: '1',
    visualRefCont: ''
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    refContractLookup () {
      console.log('lookup ref contract for api data info')
      console.log(this.visualRefCont)
      // create new temp shellID
      /* this.shellID = '1234567'
      this.mData = '98889'
      let tempNew = {}
      tempNew.shellID = this.shellID
      tempNew.moduleCNRL = 'cnrl-001234543458'
      tempNew.mData = this.mData
      // setup toolbar info.
      this.$store.dispatch('actionSetTempToolbarVis', tempNew) */
      let visMod = {}
      visMod.moduleinfo = this.modData
      visMod.refcont = this.visualRefCont
      visMod.shellID = this.shellID
      visMod.mData = this.mData
      visMod.moduleCNRL = this.moduleCNRL
      this.$store.dispatch('actionSetVisualiseRefContract', visMod)
    }
  }
}
</script>

<style>
</style>
