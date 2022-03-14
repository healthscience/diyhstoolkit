<template>
  <div id="compute-nxp">
    <header>Computed</header>
    <compute-controls></compute-controls>
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
    /* toolbarStatusLive: function () {
      return this.$store.state.toolbarStatus[this.moduleCNRL]
    },
    liveData: function () {
      if (!this.$store.state.NXPexperimentData[this.shellID]) {
        return {}
      } else if (!this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data) {
        return {}
      } else {
        return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data
      }
    } */
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

<style scoped>
#compute-nxp {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px solid red;
}
</style>
