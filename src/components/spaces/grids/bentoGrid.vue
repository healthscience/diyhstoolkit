<template>
  <div id="live-network-grid">
    <grid-toolbar></grid-toolbar>
    <mininav-map></mininav-map>
    <div id="space-shaper">
      <div id="dragwheel-space" v-dragscroll.noleft.noright="true" @click="whereMinmap($event)">
        <div id="dashboard-placeholder"  @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }"> <!-- v-bind:style="{ minWidth: '1100px', height: 'auto'}"   v-bind:style="{ width: '100%', height: '100%'}" drag-handle=".drag-handle" -->
          <!--loop over live dashboards -->
          <vue-draggable-resizable v-for="dashi of dashLive" :key="dashi.id" id="dashispace" data-no-dragscroll :min-width="900" :w="1000" h="auto" :parent="true" @activated="onDragStartCallback(dashi)" @dragging="onDrag" @dragstop="onDragStop" @resizing="onResize" :grid="[60,60]" :drag-handle="'.drag-handle'" :x=spaceCoord[dashi].x :y=spaceCoord[dashi].y  >
            <div id="single-space" v-if="activeDrag[dashi]">
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
                          <button type="button" class="btn" @click="soloSpaceOpen(dashi)">SoloSpace</button>
                        </div>
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
                      <div id="dash-main" v-for="modI in NXPstatusData[dashi]" :key="modI">
                        <bento-board v-if="isModalDashboardVisible === true" :expCNRL="dashi" :moduleCNRL="modI"></bento-board>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vue-draggable-resizable>
        </div>
      </div>
    </div>
    <solo-space :sbboard="solospaceLive"></solo-space>
  </div>
</template>

<script>
import _ from 'lodash'
import GridToolbar from './gridToolbar'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import MininavMap from './minimap/mininavMap.vue'
import BentoBoard from '@/components/bentoboard/edashBoard.vue'
import ProgressMessage from '@/components/visualise/tools/inNXPprogress.vue'
// import NewLifeboardVue from '../../lifeboard/NewLifeboard.vue'
import SoloSpace from '@/components/bentosolo/soloTemplate.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    GridToolbar,
    MininavMap,
    BentoBoard,
    ProgressMessage,
    VueDraggableResizable,
    SoloSpace
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
      if (this.$store.state.nxpModulelist === undefined) {
        return {}
      } else {
        return this.$store.state.nxpModulelist
      }
    },
    dashLive: function () {
      if (this.$store.state.liveDashList === undefined) {
        return {}
      } else {
        return this.$store.state.liveDashList
      }
    },
    spaceCoord: function () {
      if (this.$store.state.positionSpace.liveSpaceCoord === undefined) {
        return {}
      } else {
        return this.$store.state.positionSpace.liveSpaceCoord
      }
    },
    NXPprogress: function () {
      if (this.$store.state.nxpProgress === undefined) {
        return {}
      } else {
        return this.$store.state.nxpProgress
      }
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
      if (this.$store.state.activeDragList === undefined) {
        return {}
      } else {
        return this.$store.state.activeDragList
      }
    },
    postionGrid: function () {
      return this.$store.state.moduleGrid
    },
    activeGrid () {
      this.setLocalGrid(this.$store.state.moduleGrid)
      return _.cloneDeep(this.$store.state.moduleGrid)
    },
    solospaceStatus: function () {
      return this.$store.state.solospace.soloState
    }
  },
  watch: {
    activeGrid (newValue) {
      this.localGrid = newValue
    }
  },
  data: function () {
    return {
      isModalDashboardVisible: true,
      localGrid: [],
      newCompute: {
        automation: false,
        controls: false,
        startperiod: null
      },
      bboardLive: '',
      solospaceLive: '',
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
    setLocalGrid (grid) {
      this.localGrid = grid
    },
    navMover: function () {
      console.log('scroll in space')
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
      let dragScale = 1
      let smallz = 0.2
      if (this.zoomscaleValue <= smallz) {
        dragScale = (1 / (this.zoomscaleValue * 0.001))
      } else {
        dragScale = (1 / this.zoomscaleValue)
      }
      this.x = x * (dragScale)
      this.y = y
    },
    onDragStop: function (x, y) {
      let dbmove = {}
      dbmove.x = x
      dbmove.y = y
      dbmove.nxp = this.liveDashNXP
      this.$store.dispatch('actionDashBmove', dbmove)
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
    soloSpaceOpen (bs) {
      this.solospaceLive = bs
      this.$store.dispatch('actionSolospace', bs)
      this.$store.dispatch('actionAllSoloCells', this.postionGrid)
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
  height: 16000px;
  width: 1000%;
  overflow: hidden;
  border: 0px dashed blue;
}

#dashboard-placeholder {
  height: 16000px;
  width: 1000%;
  padding-top: 60px;
  margin: auto;
  transform-origin: left top;
  border: 1px solid orange;
  background-color: #fff4f4;
  background: linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
}

#dashispace {
  border: 0px solid red;
  height: 100%;
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
  grid-template-columns: 1fr 1fr 1fr;
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
