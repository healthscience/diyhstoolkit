<template>
  <div id="live-network-grid">
    <!-- peer network experiment added -->
    <div id="grid-template">
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
          <tr v-for="entry in filteredExperiments" :key="entry.id">
            <td v-for="key in columns" :key="key.id">
              <div v-if="key !== 'action'">
              {{entry[key]}}
              </div>
              <div v-else>
                <button type="button" class="btn" @click="actionPreviewExperiment(entry.id, entry)">{{ entry[key] }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- loop over the different modules included -->
      <div id="module-list" v-if="NXPstatusData[shellContract]" > {{ NXPprogress.active }}
        <progress-message v-if="NXPprogress.active === true"></progress-message>
        <ul v-for="modI in NXPstatusData[shellContract].modules" :key="modI.id">
          <dash-board v-if="isModalDashboardVisible" :shellCNRL="shellContract" :moduleCNRL="modI"></dash-board>
        </ul>
      </div>
      <!-- join network experiment modal -->
      <join-experiment v-show="isModalJoinVisible" @close="closeModalJoin">
        <template v-slot:header>
        <!-- The code below goes into the header slot --> {{ actionKBundle }}
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
          <div class="compute-select-datasource">ppp= {{ NXPJoinModuleData }}
            <label for="compute-select-source">Select data source:</label>
            <select class="select-compute-source" @change="sourceSelect" v-model="selectJoin.source" id="">Please select
              <!-- <option value="mongo-gadgetbridge">Gadgetbridge-mongo</option>
              <option value="openhumansAPI">OpenHumans</option> -->
              <option v-for="ds in NXPJoinModuleData" :key="ds.key" >
                <option value=ds.option.key>{{ ds.option.value.concept.name }}</option>
              </option>
            </select>
          </div>
        </template>
        <template v-slot:compute>
          <header>Compute</header>
          <li>
            --{{ NXPJoinModuleCompute }}
          </li>
          <li class="compute-form-item">
            Set start time of data:<input v-model="newCompute.startperiod" placeholder="Reference Contract">
            <button type="button" class="btn" @click="datastartLookup()">find startdate</button>
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
          <li>newVisualise
            vv- {{ NXPJoinModuleVisualise }}
            <chart-builder v-if="type === 'chart.js'" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData" ></chart-builder>
          </li>
        </template>
        <template v-slot:submit-join>
          <button id="joinsaveNetworkExperiment" @click.prevent="joinNetworkExperiment()">Join The Experiment</button>
        </template>
      </join-experiment>
      <button v-show="isModalJoinVisible" @click="contributeNXP">contribute experiment</button>
    </div>
  </div>
</template>

<script>
import DashBoard from '@/components/experiments/edashBoard.vue'
import ProgressMessage from '@/components/visualise/tools/inProgress.vue'
import JoinExperiment from '@/components/experiments/JoinExperiment.vue'
import ChartBuilder from '@/components/visualise/chartBuilder'

export default {
  name: 'ExperimentNetwork',
  components: {
    DashBoard,
    ProgressMessage,
    JoinExperiment,
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
    NXPstatusData: function () {
      return this.$store.state.experimentStatus
    },
    NXPJoinModuleData: function () {
      return this.$store.state.joinNXPlive.data
    },
    NXPJoinModuleCompute: function () {
      return this.$store.state.joinNXPlive.compute
    },
    NXPJoinModuleVisualise: function () {
      return this.$store.state.joinNXPlive.visualise
    },
    NXPprogress: function () {
      return this.$store.state.nxpProgress[this.shellContract]
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
      moduleType: 'vis',
      mData: '',
      visualRefCont: ''
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    refContractLookup () {
      console.log('lookup ref contract for api data info')
      // create new temp shellID
      this.shellID = '1234567'
      this.mData = '98889'
      let tempNew = {}
      tempNew.shellID = this.shellID
      tempNew.moduleCNRL = 'cnrl-001234543458'
      tempNew.mData = this.mData
      console.log('data and vis modules info')
      console.log(this.NXPJoinModuleData[0])
      console.log(this.NXPJoinModuleVisualise[0])
      let dataMod = {}
      dataMod.moduleinfo = this.NXPJoinModuleData[0].moduleinfo // this.modData
      dataMod.refcont = this.NXPJoinModuleData[0].refcont // this.visualRefCont
      console.log(dataMod)
      let visMod = {}
      visMod.moduleinfo = this.NXPJoinModuleVisualise[0].moduleinfo // this.modData
      visMod.refcont = this.NXPJoinModuleVisualise[0].refcont // this.visualRefCont
      console.log(visMod)
      this.$store.dispatch('actionSetDataRefContract', dataMod)
      // setup toolbar info.
      this.$store.dispatch('actionSetTempToolbarVis', tempNew)
      this.$store.dispatch('actionSetVisualiseRefContract', visMod)
    },
    actionPreviewExperiment (shellCNRL, NXPcontract) {
      this.shellContract = shellCNRL
      this.actionKBundle = NXPcontract
      if (NXPcontract.action === 'View') {
        this.$store.dispatch('actionDashboardState', shellCNRL)
        // this.$store.dispatch('actionDisplay', shellCNRL)
        this.isModalDashboardVisible = true
      } else {
        console.log('view previsu jion')
        console.log(shellCNRL)
        this.$store.dispatch('actionJOINViewexperiment', shellCNRL)
        this.refContractLookup()
        console.log('after')
        console.log(this.NXPJoinModuleVisualise)
        this.isModalJoinVisible = true
      }
    },
    closeModalJoin () {
      this.isModalJoinVisible = false
    },
    viewDashboard () {
      this.previewSeen = true
    },
    joinsaveNetworkExperiment () {
      console.log('join & save network experiment')
    },
    sourceSelect () {
      console.log('select source JOIN')
      this.$store.dispatch('sourceExperiment', this.selectJoin)
    },
    automationSave () {
      // this.$store.dispatch('buildRefComputeAutomation', this.newCompute.automation)
    },
    controlsSave () {
      // this.$store.dispatch('buildRefComputeControls', this.newCompute.controls)
    },
    datastartLookup () {
      console.log('look up start of data now have api info')
      this.newCompute.startperiod = 12345123451
    },
    contributeNXP () {
      console.log('new NXP to save progess')
      this.$store.dispatch('actionNewNXPrefcontract')
    },
    joinNetworkExperiment () {
      console.log('save and join network exerpiment')
      const peerChoices = {}
      let compute = {}
      compute.refcont = this.NXPJoinModuleCompute
      compute.controls = this.newCompute
      let visualise = {}
      compute.refcont = this.NXPJoinModuleVisualise
      compute.controls = this.newVisualise
      peerChoices.genesis = this.actionKBundle.id
      peerChoices.question = this.actionKBundle.name
      peerChoices.compute = compute
      peerChoices.visualise = visualise
      this.$store.dispatch('actionJoinExperiment', peerChoices)
      this.closeModalJoin()
    }
  }
}
</script>

<style>

#live-network-grid {
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
  border: 2px solid #42b4b9;
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
  background-color: #f9f9f9;
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

#preview-width {
  width: 200px;
}
</style>
