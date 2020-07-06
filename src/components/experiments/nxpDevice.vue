<template>
  <div id="device-nxp">
    <header>Device Data Source:</header>
    <div id="network-library">
      All device, sensors, data stores need to be described in the <a href="" id="network-library-damahub">Network Library</a>
    </div>
    <div id="prime-device">
      <form id="device_form" name="device_form" method="post" action="#">
        <ul>
          <li class="device-item">
            Network Library Reference Contract:<input v-model="computeRefCont" placeholder="Reference Contract">
            <button type="button" class="btn" @click="refContractLookup()">Lookup</button>
          </li>
          <li>
            {{ refContractCompute }} ---
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nxp-device',
  components: {
  },
  computed: {
    refContractCompute: function () {
      return this.$store.state.refcontract
    }
  },
  data: () => ({
    computeRefCont: ''
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    refContractLookup () {
      console.log('lookup ref contract for api data info')
      console.log(this.computeRefCont)
      this.$store.dispatch('actionSetRefContract', this.computeRefCont)
    }
  }
}
</script>

<style>
#network-library {
  margin: 2em;
}
</style>
