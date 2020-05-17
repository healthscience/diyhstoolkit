<template>
  <div id="compute-nxp">
    <header>compute pppp</header>
    <div id="diy-tools" v-if="toolbarStatusLive.active">
      <compute-controls>cc</compute-controls>
    </div>
  </div>
</template>

<script>
import ComputeControls from './tools/computeControls.vue'

export default {
  name: 'nxp-compute',
  components: {
    ComputeControls
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    mData: String
  },
  computed: {
    toolbarStatusLive: function () {
      return this.$store.state.toolbarStatus[this.moduleCNRL]
    },
    liveData: function () {
      return this.$store.state.NXPexperimentData[this.shellID].modules[this.moduleCNRL]
    }
  },
  data: () => ({
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
#compute-nxp {
  height: 100%;
  overflow: auto;
  border: 3px solid blue;
}
</style>
