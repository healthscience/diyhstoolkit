<template>
  <div id="live-network-grid">
    <grid-toolbar></grid-toolbar>
    <div id="dashboard-placeholder" @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + scale + ')' }"> <!-- @wheel.prevent="wheelScale($event)"> , transform: 'scale(' + scale + ')' -->
      <vue-draggable-resizable v-for="dashi of dashLive" v-bind:style="{ minWidth: 'auto', height: 'auto'}" :key="dashi.id" :parent="true" @dragging="onDrag" @resizing="onResize" :grid="[60,60]" :x="0" :y="0" drag-handle=".drag-handle">
        <div id="single-space">
          <div class="drag-handle" @click.prevent="setActiveSpace(dashi)" v-bind:class="{ active: activeDrag[dashi].active === true }">
            --- Activation Bar ---
          </div>
          <div class="dashboard-space">
            <div class="vis-spaceitem">
              <!-- <div id="test-content">
                Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
                X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
              </div> -->
              <div id="spaceitem-controls">
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
              </div>
            </div>
            <div class="vis-spaceitem">
              feedback:
              <div v-if="ecsMessage" id="ecs-message">
                {{ ecsMessage }}
              </div>
            </div>
            <div class="vis-spaceitem">
              <!-- view the dashboard per network experiment -->
              <div id="module-list" v-if="NXPstatusData[dashi].length > 0">
                <progress-message :progressMessage="NXPprogress[dashi]"></progress-message>
                <div id="module-ready" v-if="NXPstatusData[dashi]">
                  <ul v-for="modI in NXPstatusData[dashi]" :key="modI">
                    <dash-board v-if="isModalDashboardVisible === true" :expCNRL="dashi" :moduleCNRL="modI"></dash-board>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import GridToolbar from './gridToolbar'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import DashBoard from '@/components/experiments/edashBoard.vue'
import ProgressMessage from '@/components/visualise/tools/inNXPprogress.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    GridToolbar,
    DashBoard,
    ProgressMessage,
    VueDraggableResizable
  },
  beforeMount () {
    this.dragLocal = this.activeDrag
  },
  created () {
  },
  mounted () {
  },
  props: {
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
    NXPprogress: function () {
      return this.$store.state.nxpProgress
    },
    ecsMessage: function () {
      return this.$store.state.ecsMessageLive
    },
    filteredExperimentsList: function () {
      return this.$store.state.activeXNPFilterlist
    },
    activeDrag: function () {
      console.log('drag')
      console.log(this.filteredExperimentsList)
      console.log('after drag')
      let activeBarStatus = {}
      for (let lnxp of this.filteredExperimentsList) {
        activeBarStatus[lnxp.id] = {}
        activeBarStatus[lnxp.id].active = false
      }
      return activeBarStatus
    }
  },
  data: function () {
    return {
      shellContract: '',
      isModalDashboardVisible: true,
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
      zoomCalibrate: 1,
      width: 0,
      height: 0,
      x: 800,
      y: 0,
      scale: 1,
      dragLocal: {}
    }
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x * (1 / this.zoomCalibrate)
      this.y = y
    },
    onDragStop: function (x, y) {
      // this.dragging = false
    },
    wheelItBetter (event) {
      // use mouse wheel to zoom in out
      if (this.zoomscaleStatus === true) {
        if (event.deltaY < 0) {
          this.zoomdashdata += 1
          this.zoomCalibrate = this.zoomCalibrate + 0.1
        } else {
          this.zoomdashdata -= 1
          this.zoomCalibrate = this.zoomCalibrate - 0.1
        }
        this.scaleZoom = 'scale(' + this.zoomCalibrate + ')'
      }
    },
    wheelScale (event) {
      // use mouse wheel to zoom in out
      if (this.zoomscaleStatus === true) {
        if (event.deltaY < 0) {
          this.scale = this.scale + 0.05
        } else {
          this.scale = this.scale - 0.05
        }
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
    },
    setActiveSpace (nxpID) {
      // only one active at a time
      let activeListKeys = Object.keys(this.activeDrag)
      for (let ak of activeListKeys) {
        this.activeDrag[ak].active = false
      }
      // set the active one clicked
      this.activeDrag[nxpID].active = !this.activeDrag[nxpID].active
      // set this NXP as live
      this.$store.dispatch('actionActiveNXP', nxpID)
    },
    refContractLookup () {
      // create new temp shellID
      this.shellID = '7654321'
      this.mData = '8855332211'
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
  position: relative;
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

.scale-space.active {
  background-color: #4CAF50; /* Green */
}

#scale-tools {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  align-content: center;
  gap: 40px;
  /* grid-auto-flow: column; */
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  border: 0px solid brown;
  background-color: white;
  padding: .1em;
  z-index: 2;
}

.scale-item {
  border: 0px solid red;
}

#ecs-message {
  font-weight: bold;
  margin-top: 10px;
}

#dashboard-placeholder {
  min-height: 4000px;
  width: 500%;
  padding-top: 20px;
  margin: auto;
  transform-origin: left top;
  border: 1px solid orange;
  position: relative;
  background-color: #fff4f4;
  background: linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
}

#single-space {
  width: 98%;
  height: 96%;
  /* min-width: 1200px; */
  border: 0px solid black;
}

.dashboard-space {
  width: auto;
  height: auto;
  border: 0px solid blue;
}

#module-list {
  width: 100%;
  height: 100%;
}

#module-ready {
  width: 100%;
  height: 100%;
}

.vis-spaceitem {
  border: 0px solid red;
}

.drag-handle {
  background-color: lightgrey;
  height: 50px;
}

.drag-handle.active {
  background-color: #4CAF50; /* Green */
  height: 50px;
}

.remove-controls {
  float: right;
  margin-right: 2em;
}

.clear {
  clear: both;
}

</style>
