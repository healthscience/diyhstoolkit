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
          <li>
            <ul v-if="refContractCompute.key">
              <li>
                {{ refContractCompute.key }} ---
              </li>
              <li>
                {{ refContractCompute.value.computational.name }} ---
              </li>
              <li>
                {{ refContractCompute.value.computational.description}} ---
              </li>
              <li>
                {{ refContractCompute.value.computational.code }} ---
              </li>d
            </ul>
          </li>
        </ul>
      </form>
      <div id="view-controls-compute">
      </div>
      <div class="compute-code">
        <a href="#" id="add-compute" >add</a>
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
      console.log(this.$store.state.refcontractCompute)
      return this.$store.state.refcontractCompute
    }
  },
  data: () => ({
    compute:
    {
      text: '',
      forum: ''
    },
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
      this.$store.dispatch('actionSetComputeRefContract', this.computeRefCont)
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
