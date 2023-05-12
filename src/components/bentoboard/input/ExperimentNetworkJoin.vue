<template>
  <div id="live-network-grid-join">
    <!-- join a network experiment-->
    <div id="join-toolbar">
       <div class="join-tools">Join dashboard</div>
       <div class="join-tools">
          <button id="close-join" @click="closeJoinList">Close</button>
       </div>
    </div>
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
                <button type="button" class="btn" @click="actionExperiment(entry.id, entry)">{{ entry[key] }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- join network experiment modal -->
    <join-experiment v-show="isModalJoinVisible && NXPJoinModuleData.length !== 0" @close="closeModalJoin">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        <div class="nxp-header">
          Experiment: {{ actionKBundle.name }}
        </div>
      </template>
      <template v-slot:body>
      <!-- The code below goes into the header slot -->
        <div class="nxp-header">
          Experiment Name:
        {{ actionKBundle.name }}
        </div>
      </template>
      <template v-slot:connect>
        <!-- mobile apps suggested-->
      </template>
      <template v-slot:packaging>
        <!-- select data source -->
        <header class="module-header">Data</header>
        <div class="data-select-datasource" v-if="NXPJoinModuleData.length !== 0">
          <div class="data-select-item right">
            <label for="data-select-source">Select Data Contract</label>
          </div>
          <div class="data-select-item peerinput">
            <select class="data-data-source" @change="sourceSelect" v-model="selectJoin.source" id="">Please select
              <option v-for="ds in NXPJoinModuleData" :key="ds.key" v-bind:value="ds.option.key">
                {{ ds.option.value.concept.name }}
              </option>
            </select>
          </div>
        </div>
        <div id="data-source-options" v-if="selectJoin.source.length > 1">
          <div class="data-select-item peerinput">1
            <label class="data-button">Select file to upload</label>
            <input class="data-button" type="file" @change="loadTextFromFile">
          </div>
          <div class="data-select-item peerinput">2
            <button class="data-button" id="networkdata" @click="askHOPDataNXP">Sync data</button>
          </div>
          <div class="data-select-item peerinput">3
            <div id="file-upload-interface" v-if="filebutton === true">
            <button class="data-button" id="uploadfile" @click="uploadFileNXP">Yes, add this file</button>
            </div>
          </div>
          <div class="data-select-item peerinput">4
            <div id="sync-progress-interface" v-if="askDataNXP === true">
              The data will be saved to this accounts datastore. Progress bar
            </div>
          </div>
        </div>
      </template>
      <template v-slot:compute>
        <header class="module-header">Compute</header>
        <div class="compute-selection" id="compute-selected" v-if="NXPJoinModuleCompute !== undefined">
          <div class="compute-type" id="compute-type-right">
            Computaton selected:
          </div>
          <div class="compute-type peerinput">
            {{ NXPJoinModuleCompute[0].option.value.computational.name }}
          </div>
        </div>
        <div class="compute-form-item peerinput">
          <div class="date-data-select">
            <div id="data-text-label">
              Select start date of data:
           </div>
          </div>
          <div class="date-data-select peerinput">
            <calendar-select></calendar-select>
          </div>
          <!--<label for="compute-add-source">Controls</label>
          <select class="select-compute-source" @change="controlsSave" v-model="newCompute.controls" id="">Please select
            <option value=true>YES</option>
            <option value=false>NO</option>
          </select>
          <label for="compute-add-source">Automation</label>
          <select class="select-compute-automation" @change="automationSave" v-model="newCompute.automation" id="">Please select
            <option value=true>YES</option>
            <option value=false>NO</option>
          </select> -->
        </div>
        <!-- preview visualisation -->
      </template>
      <template v-slot:dashboard-visualisation>
        <header class="module-header">Visualisation</header>
        <div id="vis-builder">
          <chart-builder class="vis-area" v-if="NXPJoinModuleVisualise" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData" ></chart-builder>
        </div>
      </template>
      <template v-slot:submit-join>
        <div id="termsofjoin">
          Terms: a private and autonomous set of contracts will be setup. This makes it possible to be compatible with others in the next work. To connect with peers in the next work needs further setup.
        </div>
        <button id="joinsaveNetworkExperiment" @click.prevent="joinNetworkBoard()">Join The Board</button>
        <div id="join-feedback" v-if="joinFeedbackActive === true">
          {{ joinFeedback }} --
        </div>
      </template>
    </join-experiment>
  </div>
</template>

<script>
import JoinExperiment from '@/components/bentoboard/JoinExperiment.vue'
import CalendarSelect from '@/components/visualise/tools/calendarSelect.vue'
import ChartBuilder from '@/components/bentoboard/setChartBuilder'
import axios from 'axios'

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
      visualRefCont: '',
      filebutton: false,
      askDataNXP: false,
      fileinputSeen: true,
      fileData: {},
      fileName: '',
      filepath: '',
      fileType: '',
      fileSummary: ''
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    uploadFileNXP () {
      // upload the file displath to peerlink, defautl ptop storage assumed
      let nxpFilebundle = {}
      // nxpFilebundle.filename = this.
      // nxpFilebundle.contract = this.
      this.$store.dispatch('actionFileupload', nxpFilebundle)
    },
    askHOPDataNXP () {
      this.askDataNXP = !this.askDataNXP
      let nxpSyncbundle = {}
      nxpSyncbundle.type = 'sync-data'
      nxpSyncbundle.contract = this.selectJoin.source
      console.log(nxpSyncbundle)
      this.$store.dispatch('actionSyncRequest', nxpSyncbundle)
    },
    loadTextFromFile (ev) {
      // prompt for Password
      this.sourceLocation = 'local'
      const localthis = this
      this.fileData = ev.target.files[0]
      this.fileName = this.fileData.name
      this.filepath = this.fileData.path
      this.fileType = this.fileData.type
      const reader = new FileReader()
      reader.onloadend = function () {
        // const fileData = reader.result
        const lines = reader.result.split(/\r\n|\n/)
        localthis.linesLimit = lines.slice(0, 40)
        /* function limit (string = '', limit = 0) {
          return string.substring(0, limit)
        }
        const shortText = limit(fileData, 3000)
        localthis.fileSummary = shortText */
        localthis.filebutton = !localthis.filebutton
      }
      reader.readAsText(this.fileData)
      const reader2 = new FileReader()
      reader2.readAsDataURL(this.fileData)
      reader2.onload = function (e) {
        localthis.filepath = e.target.result
      }
    },
    convertJSON () {
      // need to do this via peer peerLink
      const fileBund = {}
      fileBund.name = this.fileName
      fileBund.source = this.sourceLocation
      fileBund.websource = this.readRemotefile
      fileBund.web = 'weblocal'
      fileBund.path = this.filepath
      fileBund.type = this.fileType
      fileBund.info = this.lineBundle
      this.$store.dispatch('actionFileconvert', fileBund)
    },
    getRemotefile () {
      this.sourceLocation = 'web'
      const localthis = this
      axios.get(this.readRemotefile)
        .then(function (response) {
          // handle success
          // console.log(Object.keys(response))
          // console.log(response.data)
          const dataSource = response.data
          const lines = dataSource.split(/\r\n|\n/)
          localthis.linesLimit = lines.slice(0, 40)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    },
    actionExperiment (expCNRL, NXPcontract) {
      this.shellContract = expCNRL
      this.actionKBundle = NXPcontract
      if (NXPcontract.action === 'View') {
        console.log('hop first time')
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
        // this.isModalJoinVisible = true
      }
    },
    closeJoinList () {
      // this.$store.dispatch('actionLifeview', 'publicexperiments')
      this.$store.dispatch('actionSpaceList', 'public')
      this.$store.dispatch('actionSpaceJoinListShow')
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
    joinNetworkBoard () {
      console.log('join')
      this.shellID = null
      this.moduleCNRL = 'cnrl-001234543458'
      this.moduleType = 'vis'
      this.mData = '1'
      const peerChoices = {}
      peerChoices.genesis = this.actionKBundle.id
      peerChoices.question = this.actionKBundle.name
      this.$store.dispatch('actionJoinBoard', peerChoices)
      // this.closeModalJoin()
    },
    closeDashboard (dc) {
      this.$store.dispatch('actionCloseDashboard', dc)
    }
  }
}
</script>

<style scoped>
#join-toolbar {
  font-size: 1.2em;
  background-color: white;
}

.join-tools {
  display: inline;
}

#live-network-grid-join {
  border: 0px solid blue;
  margin: auto;
  text-align: center;
  z-index: 40;
}

#grid-template-join {
  max-height: 30em;
  overflow-y: scroll;
  border: 0px dashed red;
}

.data-select-item {
  width: 90%;
}

.data-select-datasource {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.data-button {
  font-size: 1.2em;
  margin-right: 1em;
}

.module-header {
  font-size: 1.4em;
}

.compute-form-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#compute-selected {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 1.2em;
}

.compute-type {
  font-size: 1.2em;
  font-style: bold;
}

.right {
  display: grid;
  justify-content: end;
  font-size: 1.2em;
}

.peerinput {
  background-color: white;
}

.date-data-select {
  font-size: 1.2em;
  align-self: start;
  margin-top: 1em;
}

#data-text-label {
  display: grid;
  justify-content: end;
  margin-right: 1em;
  font-size: 1.2em;
}

#compute-type-right {
  display: grid;
  justify-content: end;
}

#vis-builder {
  display: grid;
  grid-template-columns: 1fr;
}

.vis-area {
  display: grid;
  justify-self: center;
  width: 60%;
}

.data-data-source {
  font-size: 1.2em;
}

#data-source-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1em;
}

#termsofjoin {
  display: grid;
  justify-content: center;
  width: 80%;
}

.nxp-header {
  font-size: 1.6em;
}
</style>
