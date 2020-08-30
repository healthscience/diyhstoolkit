<template>
  <div id="compute-nxp">
    <header>COMPUTE used to produce results:</header>
    <div id="prime-compute">
      <form id="compute_form" name="compute_form" method="post" action="#">
        <ul>
          <li class="device-item">
            Network Library Reference Contract:<input v-model="computeRefCont" placeholder="Reference Contract">
            <button type="button" class="btn" @click="refContractLookup()">Lookup</button>
          </li>
          <li v-for="cs of computesource" :key="cs.id">
            <ul v-if="refContractCompute[cs]">
              <li>
                {{ refContractCompute[cs].option.key }} ---
              </li>
              <li>
                {{ refContractCompute[cs].option.value.computational.name }} ---
              </li>
              <li>
                {{ refContractCompute[cs].option.value.computational.description}} ---
              </li>
              <li>
                {{ refContractCompute[cs].option.value.computational.code }} ---
              </li>
            </ul>
          </li>
        </ul>
      </form>
      <div id="view-controls-compute">
      </div>
      <div class="compute-code">
        <a href="#" id="addComputeContract" >add</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nxp-compute',
  components: {
  },
  computed: {
    refContractCompute: function () {
      console.log('compute live???')
      console.log(this.$store.state.refcontractCompute.length)
      let liveCompute = []
      if (this.$store.state.refcontractCompute.length !== 0) {
        liveCompute = this.$store.state.refcontractCompute
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

<style>
#compute-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#compute-nxp header{
  font-weight: bold;
}

#prime-compute {
  margin: 1em;
}

.compute-summary {
  display: block;
  margin: 2em;
}
</style>
