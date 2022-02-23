<template>
  <div id="live-network-grid">
    <grid-toolbar></grid-toolbar>
    <div id="dragwheel-space" v-dragscroll.noleft.noright="true">
      <div id="dashboard-placeholder" @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }"> <!-- @wheel.prevent="wheelScale($event)"> , transform: 'scale(' + scale + ')' -->
        <vue-draggable-resizable v-for="dashi of dashLive" v-bind:style="{ minWidth: '10%', height: 'auto'}" :key="dashi.id" :parent="true" @dragging="onDrag" @resizing="onResize" :grid="[60,60]" :x="0" :y="0"  drag-handle=".drag-handle">
          <div id="single-space">
            <div class="drag-handle" @click.prevent="setActiveSpace(dashi)" v-bind:class="{active: activeDrag[dashi].active === true }">
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
    zoomscaleStatus: function () {
      return this.$store.state.activeZoomscale
    },
    zoomscaleValue: function () {
      return this.$store.state.activeScalevalue
    },
    activeDrag: function () {
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
      isModalDashboardVisible: true,
      newCompute: {
        automation: false,
        controls: false,
        startperiod: null
      },
      shellID: null,
      moduleCNRL: '',
      mData: '',
      messageRemove: false,
      removeNXPid: '',
      zoomdashdata: 0,
      scaleZoom: '',
      zoomCalibrate: 1,
      width: 0,
      height: 0,
      x: 800,
      y: 0,
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
          this.$store.dispatch('actionScalewheel', 0.05)
        } else {
          this.$store.dispatch('actionScalewheel', -0.05)
        }
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

<style scoped>
#live-network-grid {
  display: grid;
  grid-template-columns: 1fr;
}

#ecs-message {
  font-weight: bold;
  margin-top: 10px;
}

#dragwheel-space {
  width: 99%;
  height: 99%;
  overflow:hidden;
}

#dashboard-placeholder {
  height: 8000px;
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
  display: block;
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
  display: block;
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

</style>
