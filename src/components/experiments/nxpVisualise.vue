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
  props: {
  },
  computed: {
    refContractVisualise: function () {
      // console.log(this.$store.state.refcontractVisualise)
      return this.$store.state.refcontractVisualise
    }
  },
  data: () => ({
    type: 'chart.js',
    shellID: null,
    moduleCNRL: 'cnrl-001234543458',
    moduleType: 'vis',
    mData: '',
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
      this.shellID = '1234567'
      this.mData = '98889'
      let tempNew = {}
      tempNew.shellID = this.shellID
      tempNew.moduleCNRL = 'cnrl-001234543458'
      tempNew.mData = this.mData
      // setup toolbar info.
      this.$store.dispatch('actionSetTempToolbarVis', tempNew)
      this.$store.dispatch('actionSetVisualiseRefContract', this.visualRefCont)
    }
  }
}
</script>

<style>
</style>
