<template>
  <div id="live-network-grid-join">
    <!-- peer network experiment added -->
    <div id="grid-template-join">
      <div class="list-table">
        <div class="table-header">
          <div class="row-header">
            <div class="header-items" v-for="key in columns" :key="key.id"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </div>
          </div>
        </div>
        <div class="table-rows">
          <div class="alternate-bk" v-for="entry in filteredExperiments" :key="entry.id">
            <div v-for="key in columns" :key="key.id">
              <div v-if="key !== 'action'">
              {{entry[key]}}
              </div>
              <div v-else>
                <button type="button" class="btn" @click="actionAddtoLibrary(entry.id, entry)">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExperimentNetwork',
  components: {
  },
  created () {
  },
  mounted () {
  },
  props: {
    experiments: Array,
    columns: Array,
    filterKey: String
  },
  computed: {
    isModalJoinVisible: function () {
      return this.$store.state.isModalJoinNetworkExperiment
    },
    joinFeedback: function () {
      return this.$store.state.joineNXPFeedback
    },
    joinFeedbackActive: function () {
      return this.$store.state.joineNXPFeedbackActive
    },
    showExperimentList: function () {
      return this.$store.state.experimentListshow
    },
    visDefaults: function () {
      return this.$store.state.visModuleHolder
    },
    selectedOptions: function () {
      return this.$store.state.joinNXPselected
    },
    NXPstatusData: function () {
      let nxpContractRC = this.shellContract.trim()
      let modData = this.$store.state.NXPexperimentData
      let modHolder = {}
      if (this.shellContract.length !== 0 && modData[nxpContractRC] !== undefined) {
        let extractMod = modData[nxpContractRC]
        let modList = Object.keys(extractMod)
        modHolder[nxpContractRC] = []
        modHolder[nxpContractRC] = modList
        return modHolder
      } else {
        return false
      }
    },
    dashLive: function () {
      return this.$store.state.liveDashList
    },
    NXPJoinModuleData: function () {
      let modulesLive = []
      if (this.$store.state.joinNXPlive.data !== undefined) {
        modulesLive = this.$store.state.joinNXPlive.data
      } else {
        modulesLive = []
      }
      return modulesLive
    },
    NXPJoinModuleCompute: function () {
      return this.$store.state.joinNXPlive.compute
    },
    NXPJoinModuleVisualise: function () {
      if (this.$store.state.joinNXPlive.visualise === undefined) {
        return {}
      } else {
        return this.$store.state.joinNXPlive.visualise
      }
    },
    NXPprogress: function () {
      return this.$store.state.nxpProgress[this.shellContract]
    },
    ecsMessage: function () {
      return this.$store.state.ecsMessageLive
    },
    filteredExperiments: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var experiments = this.experiments
      if (filterKey) {
        experiments = experiments.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        experiments = experiments.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return experiments
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      shellContract: '',
      sortKey: '',
      sortOrders: sortOrders,
      isModalDashboardVisible: false,
      actionKBundle: {},
      previewSeen: false,
      selectJoin:
      {
        refcon: '',
        source: ''
      },
      newCompute: {
        automation: false,
        controls: false,
        startperiod: null
      },
      newVisualise: {},
      newVisualisation: {
      },
      type: 'chart.js',
      shellID: null,
      moduleCNRL: 'cnrl-001234543458',
      moduleType: 'chart.js',
      mData: '1',
      visualRefCont: ''
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    actionAddtoLibrary (expCNRL, NXPcontract) {
      this.shellContract = expCNRL
      this.actionKBundle = NXPcontract
      let libraryAdd = {}
      libraryAdd.type = 'addPlibrary'
      libraryAdd.nxpID = this.shellContract
      libraryAdd.nxpContract = this.actionKBundle
      this.$store.dispatch('actionAddPubliclibrary', libraryAdd)
    },
    closeModalJoin () {
      // this.isModalJoinVisible = false
      this.$store.dispatch('actionCloseJoinexperiment', 'join')
    },
    viewDashboard () {
      this.previewSeen = true
    },
    sourceSelect () {
      this.$store.dispatch('sourceDataExperiment', this.selectJoin.source)
    },
    automationSave () {
      this.$store.dispatch('buildRefComputeAutomation', this.newCompute.automation)
    },
    controlsSave () {
      this.$store.dispatch('buildRefComputeControls', this.newCompute.controls)
    },
    datastartLookup () {
      this.newCompute.startperiod = 12345123451
    },
    joinNetworkExperiment () {
      this.shellID = null
      this.moduleCNRL = 'cnrl-001234543458'
      this.moduleType = 'vis'
      this.mData = '1'
      const peerChoices = {}
      peerChoices.genesis = this.actionKBundle.id
      peerChoices.question = this.actionKBundle.name
      this.$store.dispatch('actionJoinExperiment', peerChoices)
      // this.closeModalJoin()
    },
    closeDashboard (dc) {
      this.$store.dispatch('actionCloseDashboard', dc)
    }
  }
}
</script>

<style scoped>
#live-network-grid-join {
  border: 0px solid blue;
  margin: auto;
  text-align: center;
  z-index: 40;
}

#grid-template-join {
  border: 0px dashed red;
}

.list-table {
}

.row-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border: 1px solid lightgrey;
  height: 40px;
}

.header-items {
  align-self: center;
  background-color: lightgrey;
  padding: .4em;
}

.header-items:nth-child(1) {
  width: 21em;
}

.table-rows {
  display: grid;
  grid-template-columns: 1fr;
}

.alternate-bk {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  height: 50px;
  justify-content: bottom;
  background-color: white;
}

.table-row-columns {
  align-self: center;
}

.alternate-bk:nth-child(even) {
  background-color: #ffefd5;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

#joinsaveNetworkExperiment {
  font-size: 1.4em;
}
</style>
