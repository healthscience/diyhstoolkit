<template>
  <div id="device-add-nxp">
      <li class="device-item">
        Network Library Reference Contract:
        <input v-model="packageRefCont" placeholder="Reference Contract">
        <button type="button" class="btn" @click="refContractLookup()">Lookup</button>
      </li>
      <li>
        <ul class="data-refspace">
          <li>
            <ul v-if="refContractPackage.key">
              <li class="ref-pair">
                {{ refContractPackage.key }} ---
              </li>
              <li class="ref-pair">
                {{ refContractPackage.value.concept.name }}
              </li>
              <li class="ref-pair">
                {{ refContractPackage.value.concept.description}}
              </li>
              <li class="ref-pair">
                {{ refContractPackage.value.concept.api }}
              </li>
              <li class="ref-pair">
                {{ refContractPackage.value.concept.apipath}}
              </li>
              <li class="ref-pair" v-for="colpair in refContractPackage.value.concept.tablestructure" :key="colpair.refcontract">
                {{ colpair.refcontract }} - {{ colpair.column }}
              </li>
              <li class="ref-pair" v-for="cat in refContractPackage.value.concept.category" :key="cat.id">
                {{ cat.category }} - {{ cat.column }}
              </li>
              <li class="ref-pair" v-for="tidy in refContractPackage.value.concept.tidy" :key="tidy.id">
                {{ tidy.tidy }} - {{ tidy.tidydatatype }} - {{ tidy.tidycode }}
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
      let livePackage = {}
      if (this.$store.state.refcontractPackaging[this.datID] !== undefined) {
        livePackage = this.$store.state.refcontractPackaging[0] // .option
      } else {
        livePackage = {}
      }
      return livePackage
    }
  },
  props: {
    datID: null,
    modData: {
      type: Object
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
      let dataModHolder = {}
      dataModHolder.moduleinfo = this.modData
      dataModHolder.refcont = this.packageRefCont
      this.$store.dispatch('actionSetDataRefContract', dataModHolder)
      this.packageRefCont = ''
    }
  }
}
</script>

<style>

.data-refspace {
  background-color: white;
  padding: 10px;
}

.ref-pair {
  font-size: 1.2em;
  padding: 4px;
}
</style>
