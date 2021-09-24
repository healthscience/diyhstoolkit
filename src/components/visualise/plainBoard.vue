<template>
  <div id="plain-nxp">
    <b> Question: {{ liveData[1].content }} </b>
  </div>
</template>

<script>
export default {
  name: 'nxp-plain',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    mData: String
  },
  computed: {
    liveData: function () {
      if (!this.$store.state.NXPexperimentData[this.shellID]) {
        return {}
      } else if (!this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data) {
        return {}
      } else {
        return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data
      }
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
#plain-nxp {
  font-size: 1.4em;
}
</style>
