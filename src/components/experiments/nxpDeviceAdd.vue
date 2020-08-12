<template>
  <div id="device-add-nxp">
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
  </div>
</template>

<script>

export default {
  name: 'nxp-add-device',
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
</style>
