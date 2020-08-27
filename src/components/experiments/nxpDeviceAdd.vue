<template>
  <div id="device-add-nxp">
      <li class="device-item">
        Network Library Reference Contract:<input v-model="packageRefCont" placeholder="Reference Contract">
        <button type="button" class="btn" @click="refContractLookup()">Lookup</button>
      </li>
      <li>
        <ul v-for="rcp of refContractPackage" :key="rcp.key">
          <li>
            <ul v-if="rcp.key">
              <li>
                {{ rcp.key }} ---
              </li>
              <li>
                {{ rcp.value.concept.name }} ---
              </li>
              <li>
                {{ rcp.value.concept.description}} ---
              </li>
              <li>
                {{ rcp.value.concept.api }} ---
              </li>
              <li>
                {{ rcp.value.concept.apipath}} ---
              </li>
              <li class="ref-pair" v-for="colpair in rcp.value.concept.tablestructure" :key="colpair.refcontract">
                {{ colpair.refcontract }} --- {{ colpair.column }}
              </li>
              <li class="ref-pair" v-for="cat in rcp.value.concept.category" :key="cat.id">
                {{ cat.category }} --- {{ cat.column }}
              </li>
              <li class="ref-pair" v-for="tidy in rcp.value.concept.tidy" :key="tidy.id">
                {{ tidy.tidy }} --- {{ tidy.tidydatatype }} --- {{ tidy.tidycode }}
              </li>
            </ul>
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
