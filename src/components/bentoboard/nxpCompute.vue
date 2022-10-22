<template>
  <div id="compute-nxp-buid">
    <header>COMPUTE used to produce results:</header>
    <div id="prime-compute">
      <form id="compute_form" name="compute_form" method="post" action="#">
        <div id="add-newref-compute">
          <div class="compute-item">
            <div class="computeref-add" id="newref-compute" >
              Network Library Reference Contract:<input v-model="computeRefCont" placeholder="Reference Contract">
            </div>
            <button type="button" class="computeref-add" id="compute-btn" @click="refContractLookup()">Lookup</button>
          </div>
          <div v-for="cs of computesource" :key="cs.id">
            <ul class="compute-refspace" v-if="refContractCompute[cs]">
              <li class="compute-refcontract">
                {{ refContractCompute[cs].option.key }} -
              </li>
              <li class="compute-refcontract">
                {{ refContractCompute[cs].option.value.computational.name }} -
              </li>
              <li class="compute-refcontract">
                {{ refContractCompute[cs].option.value.computational.description}} -
              </li>
              <li class="compute-refcontract">
                {{ refContractCompute[cs].option.value.computational.code }} -
              </li>
            </ul>
          </div>
        </div>
      </form>
      <div id="view-controls-compute">
      </div>
      <div class="compute-code">
        <!-- <a href="#" id="addComputeContract" >add</a> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nxp-compute-build',
  components: {
  },
  computed: {
    refContractCompute: function () {
      let liveCompute = []
      if (this.$store.state.genRefcontractCompute.length !== 0) {
        liveCompute = this.$store.state.genRefcontractCompute
      } else {
        liveCompute = []
      }
      return liveCompute
    }
  },
  props: {
    modData: {
      type: Object
    }
  },
  data: () => ({
    compute:
    {
      text: '',
      forum: ''
    },
    computeRefCont: '',
    countD: 0,
    computesource: [0]
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    refContractLookup () {
      let computeMod = {}
      computeMod.moduleinfo = this.modData
      computeMod.refcont = this.computeRefCont
      this.$store.dispatch('actionSetComputeRefContract', computeMod)
      this.computeRefCont = ''
    },
    addComputeContract () {
      // update vuex of data source latest
      // this.$store.dispatch('actionDatasourceCount', this.countD)
      this.countD++
      this.computesource.push(this.countD)
    }
  }
}
</script>

<style scoped>
#compute-nxp-build {
  margin: 1em;
  border: 1px solid grey;
}

#compute-nxp-build header {
  font-weight: bold;
}

#prime-compute {
  margin: 1em;
}

.compute-summary {
  display: block;
  margin: 2em;
}

.compute-refspace {
  background-color: white;
  padding: 10px;
}
.compute-refcontract {
  font-size: 1.2em;
  padding: 10px;
}

.add-newref-compute {
  display: grid;
  grid-template-columns: 1fr;
}

.compute-item {
  display: grid;
  grid-template-columns: 5fr 1fr;
  justify-content: center;
}

.computeref-add {
}

#newref-compute {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: end;
  justify-self: end;
}

#compute-btn {
  display: grid;
  align-self: start;
  justify-self: start;
}
</style>
