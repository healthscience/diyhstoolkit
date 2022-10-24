<template>
  <div id="plain-nxp">
    {{ liveData[1].content }}
  </div>
</template>

<script>
export default {
  name: 'nxp-plain',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String
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

<style scoped>
#plain-nxp {
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.4em;
  border: 0px solid green;
}
</style>
