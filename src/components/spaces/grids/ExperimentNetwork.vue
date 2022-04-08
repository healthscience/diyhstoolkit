<template>
  <div id="live-network-grid">
    <grid-toolbar></grid-toolbar>
    <mininav-map></mininav-map>
    <div id="space-shaper">
      <div id="dragwheel-space" v-dragscroll.noleft.noright="true" @click="whereMinmap($event)">
        <div id="dashboard-placeholder"  @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }"> <!--  v-bind:style="{ width: '100%', height: '100%'}" -->
          <!--loop over live dashboards -->
          <vue-draggable-resizable v-for="dashi of dashLive" :key="dashi.id" id="dashispace" data-no-dragscroll  v-bind:style="{ minWidth: '1100px', height: 'auto'}" :parent="true" @activated="onDragStartCallback(dashi)" @dragging="onDrag" @dragstop="onDragStop" @resizing="onResize" :grid="[60,60]" :x=spaceCoord[dashi].x :y=spaceCoord[dashi].y  drag-handle=".drag-handle">
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
                    <div class="dash-top-master">
                      -
                    </div>
                    <div class="dash-top-master">
                      <header>-</header>
                    </div>
                    <div class="remove-controls">
                      <div id="dashboard-controls">
                        <div class="dash-controls-master">
                          <button type="button" class="btn" @click="closeDashboard(dashi)">Close dashboard</button>
                        </div>
                        <div class="dash-controls-master">
                          <a href="" id="remove-nxp" @click.prevent="removeDashboard(dashi)">remove</a>
                        </div>
                      </div>
                      <div id="remove-message" v-if="messageRemove === true">
                        Are you sure you want to remove Network Experiment {{ removeNXPid }}?  <a href="#" id="confirm-remove" @click.prevent="removeConfirmDashboard">Yes</a>  No
                      </div>
                    </div>
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
                        <nxp-board v-if="isModalDashboardVisible === true" :expCNRL="dashi" :moduleCNRL="modI"></nxp-board>
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
      bentospace END END
  </div>
</template>

<script>
import GridToolbar from './gridToolbar'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import MininavMap from './minimap/mininavMap.vue'
import NxpBoard from '@/components/experiments/edashBoard.vue'
import ProgressMessage from '@/components/visualise/tools/inNXPprogress.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    GridToolbar,
    MininavMap,
    NxpBoard,
    ProgressMessage,
    VueDraggableResizable
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  props: {
  },
  computed: {
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    liveDashNXP: function () {
      if (this.$store.state.liveNXP === undefined) {
        return ''
      } else {
        return this.$store.state.liveNXP
      }
    },
    NXPstatusData: function () {
      return this.$store.state.nxpModulelist
    },
    dashLive: function () {
      return this.$store.state.liveDashList
    },
    spaceCoord: function () {
      if (this.$store.state.positionSpace.liveSpaceCoord === undefined) {
        console.log('not est')
        return {}
      } else {
        return this.$store.state.positionSpace.liveSpaceCoord
      }
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
      return this.$store.state.activeDragList
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
      x: 0,
      y: 0,
      mouseLive:
      {
        x: 10,
        y: 10
      },
      c: {},
      ctx: {},
      firstClick: true
    }
  },
  methods: {
    navMover: function () {
      console.log('scholl in space0000000')
    },
    whereMinmap (mo) {
      this.mouseLive.x = mo.offsetX
      this.mouseLive.y = mo.offsetY
      // if click on minimap do not send
      if (mo.target.id !== 'minimap') {
        this.$store.dispatch('actionPostionCoordMouse', this.mouseLive)
      }
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDragStartCallback (ev) {
      this.$store.dispatch('actionActiveNXP', ev)
    },
    onDrag: function (x, y) {
      this.x = x * (1 / this.zoomCalibrate)
      this.y = y
    },
    onDragStop: function (x, y) {
      let dbmove = {}
      dbmove.x = x
      dbmove.y = y
      dbmove.nxp = this.liveDashNXP
      this.$store.dispatch('actionDashBmove', dbmove)
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
      this.$store.dispatch('actionActiveDashSelect', nxpID)
      this.dragDashmove = nxpID
      // set this NXP as live
      this.$store.dispatch('actionActiveNXP', nxpID)
    },
    closeDashboard (dc) {
      this.$store.dispatch('actionCloseDashboard', dc)
    },
    removeDashboard (dc) {
      this.messageRemove = !this.messageRemove
      this.removeNXPid = dc
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
  border: 0px dashed black;
  height: 100%;
}

#space-shaper {
  position: static;
}

#dragwheel-space {
  height: 5000px;
  width: 1000%;
  overflow: scroll;
  border: 0px dashed blue;
}

#dashboard-placeholder {
  height: 10000px;
  width: 1000%;
  padding-top: 50px;
  margin: auto;
  transform-origin: left top;
  border: 1px solid orange;
  background-color: #fff4f4;
  background: linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
}

#dashispace {
  border: 0px solid red;
}

#single-space {
  display: grid;
  grid-template-columns: 1fr;
  width: 99%;
  height: 99%;
  /* min-width: 1200px; */
  border: 1px solid grey;
}

#spaceitem-controls {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

#dashboard-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.dashboard-space {
  width: auto;
  height: auto;
  border: 0px solid blue;
}

/* .dash-holder {
  border: 3px solid red;
  height: auto;
  min-width: 1200px;
} */

#module-list {
  width: 100%;
  height: 100%;
}

#module-ready {
  width: 100%;
  height: 100%;
}

#ecs-message {
  font-weight: bold;
  margin-top: 10px;
}

.vis-spaceitem {
  border: 0px solid red;
}

.drag-handle {
  display: grid;
  background-color: lightgrey;
  height: 50px;
}

.drag-handle.active {
  display: grid;
  background-color: #4CAF50; /* Green */
  height: 50px;
}

.remove-controls {
  float: right;
  margin-right: 2em;
}
</style>
