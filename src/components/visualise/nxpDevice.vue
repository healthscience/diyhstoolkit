<template>
  <div id="device-nxp">Device --
    <ul>
      <li>
        {{ liveData.device_name }}
      </li>
      <li>
        {{ liveData.device_mac }}
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
    liveData: function () {
      console.log('device moduloe')
      console.log(this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData])
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
