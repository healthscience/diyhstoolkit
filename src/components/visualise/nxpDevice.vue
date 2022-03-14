<template>
  <div id="device-nxp">Device
    <div v-if="liveDevice">
      <div>
        {{ liveDevice.device_name }}
      </div>
      <div>
        {{ liveDevice.device_mac }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-device',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    mData: String
  },
  computed: {
    liveDevice: function () {
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
#device-nxp {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px solid green;
}
</style>
