<template>
  <div id="device-nxp">Device
    <ul v-if="liveDevice">
      <li>
        {{ liveDevice.device_name }}
      </li>
      <li>
        {{ liveDevice.device_mac }}
      </li>
    </ul>
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

<style>
</style>
