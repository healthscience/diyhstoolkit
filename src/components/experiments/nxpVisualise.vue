<template>
  <div id="visualise-nxp">
    <header>VISUALISE DASHBOARD BUILDER:</header>
    <div id="prime-visualise">
      <header>Type of visualisation:</header>
      <button>Chart</button>
      <button>Table</button>
      <button>Simulation</button>
    </div>
    <chart-builder v-if="type === 'chart'" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></chart-builder>
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
  },
  data: () => ({
    type: 'chart',
    shellID: 'new',
    moduleCNRL: 'dfdfd',
    moduleType: 'dfdfd',
    mData: 'one'
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
  }
}
</script>

<style>
</style>
