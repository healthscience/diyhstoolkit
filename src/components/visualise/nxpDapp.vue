<template>
  <div id="dapp-nxp">Dapp
    <div>
      <div>
        {{ liveData.content }}
      </div>
    </div>
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
      return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]
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

<style scoped>
#dapp-nxp {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
