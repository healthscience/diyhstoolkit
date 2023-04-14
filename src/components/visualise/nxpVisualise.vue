<template>
  <div id="visualise-nxp">
    <div id="prime-visualise" v-if="visPrepareStatus !== undefined">
      <progress-vismessage v-if="visPrepareStatus.active === true" :progressMessage="visPrepareStatus" ></progress-vismessage>
      <div id="vis-chartbuilder">
        <component v-bind:is="moduleVisType" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></component>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressVismessage from '@/components/visualise/tools/inProgress.vue'
import chartBuilder from '@/components/visualise/chartBuilder'
// import tableBuild from '@/components/visualise/table/tableBuilder'
// import simulationView from '@/components/visualise/simulation/simulation-life'

export default {
  name: 'nxp-question',
  components: {
    ProgressVismessage,
    chartBuilder
    // tableBuild,
    // simulationView
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String
  },
  computed: {
    moduleVisType: function () {
      return 'chart-builder' // modvisType[this.dashCNRL].vistype
    },
    visPrepareStatus: function () {
      return this.$store.state.visProgress[this.moduleCNRL][this.mData]
    }
  },
  data: () => ({
    visChart: false,
    visTableview: false,
    visSimview: false,
    vis1:
    {
      name: 'chart',
      id: 'vis-sc-1',
      active: false
    },
    vis2:
    {
      name: 'table',
      id: 'vis-sc-2',
      active: false
    },
    vis3:
    {
      name: 'simulation',
      id: 'vis-sc-3',
      active: false
    },
    tablecollection: {}
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    saveVisualise () {
      console.log('save visualise')
    },
    selectVis (visIN) {
      if (visIN.id === 'vis-sc-1') {
        if (visIN.active === true) {
          this.visChartview = false
          this.vis1.active = false
        } else {
          // dispatch and prepare bundleData
          this.$store.dispatch('actionBundleData', 'prepare')
          this.vis1.active = true
          this.visChartview = true
        }
      } else if (visIN.id === 'vis-sc-2') {
        if (visIN.active === true) {
          this.visTableview = false
          this.vis2.active = false
        } else {
          // dispatch and prepare bundleData
          this.$store.dispatch('actionBundleData', 'prepare')
          this.vis2.active = true
          this.visTableview = true
        }
      } else if (visIN.id === 'vis-sc-3') {
        if (visIN.active === true) {
          this.visSimview = false
          this.vis3.active = false
        } else {
          // dispatch and prepare bundleData
          this.$store.dispatch('actionBundleData', 'prepare')
          this.vis3.active = true
          this.visSimview = true
        }
      }
      // filter what visualisation is active
      this.filterVisualisation()
    },
    filterVisualisation () {
      let visLive = []
      if (this.vis1.active === true) {
        visLive.push(this.vis1.id)
      }
      if (this.vis2.active === true) {
        visLive.push(this.vis2.id)
      }
      if (this.vis3.active === true) {
        visLive.push(this.vis3.id)
      }
    },
    addToExperiment (exB) {
      this.selectedExperiment = exB.target.value
    },
    experADD (expA) {
      // need to keep permanent store of experiments to Ecomponents linked (save, delete, update also)
      const localthis = this
      this.$emit('experimentMap', this.selectedExperiment)
      setTimeout(function () {
        localthis.saveExpKid.active = false
      }, 3000) // hide the message after 3 seconds
    }
  }
}
</script>

<style scoped>
#visualise-nxp {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px solid pink;
}

#visualise-nxp header{
  font-weight: bold;
}

#vis-chartbuilder {
  border: 0px solid black;
}

#prime-visualise {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px solid blue;
}
</style>
