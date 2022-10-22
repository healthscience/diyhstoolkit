<template>
  <div id="visualise-nxp-build">
    <header>VISUALISE DASHBOARD BUILDER:</header>
    <div id="prime-visualise-build">
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
import chartBuilder from '@/components/bentoboard/setChartBuilder'

export default {
  name: 'nxp-visualdashboard',
  components: {
    chartBuilder
  },
  computed: {
    refContractVisualise: function () {
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
      let visMod = {}
      visMod.moduleinfo = this.modData
      visMod.refcont = this.visualRefCont
      visMod.shellID = this.shellID
      visMod.mData = this.mData
      visMod.moduleCNRL = this.moduleCNRL
      this.$store.dispatch('actionSetVisualiseRefContract', visMod)
      this.visualRefCont = ''
    }
  }
}
</script>

<style>
</style>
