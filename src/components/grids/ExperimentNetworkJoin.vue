<template>
  <div id="live-network-grid-join">
    <!-- peer network experiment added -->
    <div id="grid-template-join">live dashboard --
      <table>
        <thead>
          <tr>
            <th v-for="key in columns" :key="key.id"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="alternate-bk" v-for="entry in filteredExperiments" :key="entry.id">
            <td v-for="key in columns" :key="key.id">
              <div v-if="key !== 'action'">
              {{entry[key]}}
              </div>
              <div v-else>
                <button type="button" class="btn" @click="actionExperiment(entry.id, entry)">{{ entry[key] }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- join network experiment modal -->
      <join-experiment v-show="isModalJoinVisible && NXPJoinModuleData.length !== 0" @close="closeModalJoin">
        <template v-slot:header>
        <!-- The code below goes into the header slot -->
          N=1 Network Experiment {{ actionKBundle.name }}
        </template>
        <template v-slot:body>
        <!-- The code below goes into the header slot -->
          <header>Experiment Question:</header>
          {{ actionKBundle.name }}
        </template>
        <template v-slot:connect>
          <!-- mobile apps suggested-->
        </template>
        <template v-slot:packaging>
          <!-- select data source -->
          <header>Datastore packaging</header>
          <div class="compute-select-datasource" v-if="NXPJoinModuleData.length !== 0">
            <label for="data-select-source">Select data source:</label>
            <select class="data-data-source" @change="sourceSelect" v-model="selectJoin.source" id="">Please select
              <option v-for="ds in NXPJoinModuleData" :key="ds.key" v-bind:value="ds.option.key">
                {{ ds.option.value.concept.name }}
              </option>
            </select>
          </div>
        </template>
        <template v-slot:compute>
          <header>Compute</header>
          <div id="compute-selected" v-if="NXPJoinModuleCompute !== undefined">
            Computaton selected: {{ NXPJoinModuleCompute[0].option.value.computational.name }}
          </div>
          <li class="compute-form-item">
            Select start date of data:
            <calendar-select></calendar-select>
            <label for="compute-add-source">Controls</label>
            <select class="select-compute-source" @change="controlsSave" v-model="newCompute.controls" id="">Please select
              <option value=true>YES</option>
              <option value=false>NO</option>
            </select>
            <label for="compute-add-source">Automation</label>
            <select class="select-compute-automation" @change="automationSave" v-model="newCompute.automation" id="">Please select
              <option value=true>YES</option>
              <option value=false>NO</option>
            </select>
          </li>
          <!-- preview visualisation -->
        </template>
        <template v-slot:dashboard-visualisation>
          <header>Visualisation</header>
          <li>
            <chart-builder v-if="NXPJoinModuleVisualise" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData" ></chart-builder>
          </li>
        </template>
        <template v-slot:submit-join>
          <button id="joinsaveNetworkExperiment" @click.prevent="joinNetworkExperiment()">Join The Experiment</button>
        </template>
      </join-experiment>
    </div>
  </div>
</template>

<script>
// import DashBoard from '@/components/experiments/edashBoard.vue'
import JoinExperiment from '@/components/experiments/JoinExperiment.vue'
import CalendarSelect from '@/components/visualise/tools/calendarSelect.vue'
import ChartBuilder from '@/components/experiments/setChartBuilder'

export default {
  name: 'ExperimentNetwork',
  components: {
    // DashBoard,
    JoinExperiment,
    CalendarSelect,
    ChartBuilder
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
      isModalJoinVisible: false,
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
    actionExperiment (expCNRL, NXPcontract) {
      this.shellContract = expCNRL
      this.actionKBundle = NXPcontract
      if (NXPcontract.action === 'View') {
        this.$store.dispatch('actionDashboardState', expCNRL)
        this.isModalDashboardVisible = true
      } else {
        // preview network experiment
        let joinContext = {}
        joinContext.type = 'chart.js'
        joinContext.shellID = expCNRL
        joinContext.moduleType = 'vis'
        joinContext.moduleCNRL = 'cnrl-001234543458'
        joinContext.mData = '1'
        this.$store.dispatch('actionJOINViewexperiment', joinContext)
        this.isModalJoinVisible = true
      }
    },
    closeModalJoin () {
      this.isModalJoinVisible = false
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
      this.closeModalJoin()
    },
    closeDashboard (dc) {
      this.$store.dispatch('actionCloseDashboard', dc)
    }
  }
}
</script>

<style>

#live-network-grid-join {
  border: 0px solid blue;
  margin: auto;
  text-align: center;
}

body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 1px solid #42b4b9;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b4b9;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  /* background-color: #f9f9f9; */
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
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

.clear {
  clear: both;
}

</style>
