<template>
  <div id="dapp-nxp">Dapp
    {{ liveData }}
  </div>
</template>

<script>
export default {
  name: 'nxp-dapp',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
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
