<template>
  <div id="compute-nxp">compute
    {{ liveData }} ==
  </div>
</template>

<script>
export default {
  name: 'nxp-compute',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    mData: String
  },
  computed: {
    liveData: function () {
      return this.$store.state.NXPexperimentData[this.shellID].modules[this.moduleCNRL].data[this.mData]
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
</style>
