<template>
  <div id="plain-nxp">PainBoard
    {{ liveData }} ll
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
      return this.$store.state.NXPexperimentData[this.shellID].modules[this.moduleCNRL].data
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
