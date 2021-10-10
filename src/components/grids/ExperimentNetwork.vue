<template>
  <div id="live-network-grid">
    <!-- peer network experiment added -->
    <div id="grid-template">-- live --
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
      <div id="scale-tools">
        <button class="scale-space" v-bind:class="{ active: scaleSetting.active }" @click.prevent="setSpacescale()">{{ scaleSetting.text }}</button>
      </div>
      <div id="dashboard-placeholder" v-bind:style="{ transform: scaleZoom}" @wheel.prevent="wheelItBetter($event)">
        <ul id="zoom-dashboard" class="clear" v-for="dashi of dashLive" :key="dashi.id" >
          <li class="dashboard-place">
            <ul>
              <li>
                Left
              </li>
              <li>
                <header>Dashboard</header>
              </li>
              <li class="remove-controls">
                <div id="dashboard-controls">
                  <ul>
                    <li>
                      <button type="button" class="btn" @click="closeDashboard(dashi)">Close dashboard</button>
                    <li>
                    <li>
                      <a href="" id="remove-nxp" @click.prevent="removeDashboard(dashi)">remove</a>
                    </li>
                  </ul>
                </div>
                <div id="remove-message" v-if="messageRemove === true">
                  Are you sure you want to remove Network Experiment {{ removeNXPid }}?  <a href="#" id="confirm-remove" @click.prevent="removeConfirmDashboard">Y</a>  N
                </div>
              </li>
            </ul>
          </li>
          <li>
            feedback:
            <div v-if="ecsMessage" id="ecs-message">
              {{ ecsMessage }}
            </div>
          </li>
          <li class="dashboard-view">
            <!-- view the dashboard per network experiment -->
            <div id="module-list" v-if="NXPstatusData[dashi].length > 0">
              <progress-message :progressMessage="NXPprogress[dashi]"></progress-message>
              <div id="module-ready" v-if="NXPstatusData[dashi]">
                <ul v-for="modI in NXPstatusData[dashi]" :key="modI">
                  <dash-board v-if="isModalDashboardVisible === true" :expCNRL="dashi" :moduleCNRL="modI"></dash-board>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoard from '@/components/experiments/edashBoard.vue'
import ProgressMessage from '@/components/visualise/tools/inNXPprogress.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    DashBoard,
    ProgressMessage
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
      return this.$store.state.nxpModulelist
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
      return this.$store.state.nxpProgress
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
      moduleCNRL: '',
      moduleType: '',
      mData: '',
      visualRefCont: '',
      messageRemove: false,
      removeNXPid: '',
      zoomdashdata: 0,
      scaleZoom: '',
      scaleSetting:
      {
        text: 'scale off',
        active: false
      },
      zoomscaleStatus: false,
      zoomCalibrate: 1
    }
  },
  methods: {
    wheelItBetter (event) {
      // use mouse wheel to zoom in out
      if (this.zoomscaleStatus === true) {
        console.log('mouse zooming')
        if (event.deltaY < 0) {
          this.zoomdashdata += 1
          this.zoomCalibrate = this.zoomCalibrate + 0.1
        } else {
          this.zoomdashdata -= 1
          this.zoomCalibrate = this.zoomCalibrate - 0.1
        }
        console.log(this.zoomdashdata)
        console.log(this.zoomCalibrate)
        this.scaleZoom = 'scale(' + this.zoomCalibrate + ')'
      }
    },
    setSpacescale () {
      // set mouse scaling on or off  (add slider with time)
      this.scaleSetting.active = !this.scaleSetting.active
      if (this.scaleSetting.active === true) {
        this.scaleSetting.text = 'Scale On'
        this.zoomscaleStatus = true
      } else if (this.scaleSetting.active === false) {
        this.scaleSetting.text = 'Scale Off'
        this.zoomscaleStatus = false
      }
      console.log('scale space')
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    refContractLookup () {
      // create new temp shellID
      this.shellID = '7654321'
      this.mData = '8855332211'
    },
    actionExperiment (expCNRL, NXPcontract) {
      this.shellContract = expCNRL
      this.actionKBundle = NXPcontract
      if (NXPcontract.action === 'View') {
        this.$store.dispatch('actionDashboardState', expCNRL)
        this.isModalDashboardVisible = true
      } else {
        // preview network experiment
        this.$store.dispatch('actionJOINViewexperiment', expCNRL)
        this.refContractLookup()
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
    computeSelect () {
      this.$store.dispatch('sourceComputeExperiment', this.selectJoin.compute)
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
    closeDashboard (dc) {
      this.$store.dispatch('actionCloseDashboard', dc)
    },
    removeDashboard (dc) {
      this.messageRemove = !this.messageRemove
      this.removeNXPid = dc
      // this.$store.dispatch('actionRemoveDashboard', dc)
    },
    removeConfirmDashboard (dc) {
      this.$store.dispatch('actionRemoveDashboard', this.removeNXPid)
      this.messageRemove = !this.messageRemove
    }
  }
}
</script>

<style>

#live-network-grid {
  border: 0px solid blue;
  text-align: center;
}

#grid-template {
  border: 0px solid blue;
  text-align: center;
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

.dashboard-view {
  width: 100%;
}

.scale-space.active {
  background-color: #4CAF50; /* Green */
}

#module-list {
}

#dashboard-placeholder {
  width: 90%;
  transform: scale(1);
  display: block;
  border: 1px solid grey;
}

#zoom-dashboard {
  margin-top: 0px;
  border: 1px solid orange;
}

.dashboard-place {
  width: 98%;
  border: 0px solid green;

}

.remove-controls {
  float: right;
  margin-right: 2em;
}

#ecs-message {
  font-weight: bold;
}
.clear {
  clear: both;
}

</style>
