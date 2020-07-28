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
            Network Library Reference Contract:<input v-model="packageRefCont" placeholder="Reference Contract">
            <button type="button" class="btn" @click="refContractLookup()">Lookup</button>
          </li>
          <li>
            <ul v-if="refContractPackage.key">
              <li>
                {{ refContractPackage.key }} ---
              </li>
              <li>
                {{ refContractPackage.value.concept.name }} ---
              </li>
              <li>
                {{ refContractPackage.value.concept.description}} ---
              </li>
              <li>
                {{ refContractPackage.value.concept.api }} ---
              </li>
              <li>
                {{ refContractPackage.value.concept.apipath}} ---
              </li>
              <li class="ref-pair" v-for="colpair in refContractPackage.value.concept.tablestructure" :key="colpair.refcontract">
                {{ colpair.refcontract }} --- {{ colpair.column }}
              </li>
            </ul>
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
    refContractPackage: function () {
      // console.log(this.$store.state.refcontractPackaging)
      return this.$store.state.refcontractPackaging
    }
  },
  data: () => ({
    packageRefCont: ''
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    refContractLookup () {
      console.log('lookup ref contract for api data info')
      console.log(this.packageRefCont)
      this.$store.dispatch('actionSetRefContract', this.packageRefCont)
    }
  }
}
</script>

<style>
#network-library {
  margin: 2em;
}

.ref-pair {
  display: block;
}
</style>
