<template>
  <div class="solo-space">
    <solo-modal v-show="solospaceStatus.active === true" @close="closeModal">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        <button
          type="button"
          class="btn-green"
          @click="closeModal"
          aria-label="Close modal"
        >
          Close
        </button>
        <a href="#" id="return-bentospace" @click="returnBentospace">return</a>
      </template>
      <template v-slot:solospace>
        <div id="solo-grid">
          <div id="solo-toolbar">
            <grid-toolbar></grid-toolbar>
          </div>
          <minisolo-map></minisolo-map>
          <div id="spacesolo-shaper">
            <div id="dragwheelsolo-space" v-dragscroll.noleft.noright="true" @click="whereMinmap($event)">
              <div id="solo-placeholder"  @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }">
                <vue-draggable-resizable v-for="soloi of BoardstatusData" :key="soloi.id" id="solocellspace" data-no-dragscroll w="auto" h="auto" :parent="true" @activated="onDragSolostartCallback(soloi)" @dragging="onDrag" @dragstop="onDragStop" @resizing="onResize" :grid="[60,60]" :drag-handle="'.drag-handlesolo'" :x=soloi.x :y=soloi.y>
                <div class="drag-handlesolo" @click.prevent="setActiveSolo(soloi)" v-bind:class="{active: soloActivedrag === true }">
                ---- CELL BAR ----
                </div>
                <solo-cells :board="sbboard" :moduleCNRL="soloi.mod" :cellposition="soloi.cell" :order="soloi.cell.i"></solo-cells>
              </vue-draggable-resizable>
              </div>
            </div>
          </div>
        </div>
      </template>
    </solo-modal>
  </div>
</template>

<script>
import SoloModal from '@/components/bentosolo/soloModal.vue'
import GridToolbar from './soloToolbar.vue'
import MinisoloMap from './minisoloMap.vue'
import SoloCells from '@/components/bentosolo/soloCells.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'solo-space',
  components: {
    SoloModal,
    GridToolbar,
    MinisoloMap,
    SoloCells,
    VueDraggableResizable
  },
  computed: {
    solospaceStatus: function () {
      return this.$store.state.solospace.soloState
    },
    soloboardLive: function () {
      if (this.$store.state.liveDashList === undefined) {
        return {}
      } else {
        return this.$store.state.liveDashList
      }
    },
    BoardstatusData: function () {
      // need to prepare into single array for drag drop to work
      if (this.$store.state.nxpModulelist === undefined) {
        return {}
      } else {
        let liveListCells = []
        if (this.$store.state.nxpModulelist[this.sbboard]?.length > 0) {
          for (let soloi of this.$store.state.nxpModulelist[this.sbboard]) {
            if (this.$store.state.nxpModulelist[this.sbboard]) {
              for (let cell of this.soloPosition[soloi]) {
                console.log(cell)
                let newCellinfo = {}
                newCellinfo = cell
                newCellinfo.mod = soloi
                liveListCells.push(newCellinfo)
              }
            }
          }
        } else {
          console.log('no modues')
        }
        return liveListCells
      }
    },
    startPostions: function () {
      if (this.$store.state.solopositionSpace.initialGrid === undefined) {
        return {}
      } else {
        return this.$store.state.solopositionSpace.initialGrid
      }
    },
    cellspaceCoord: function () {
      if (this.$store.state.solopositionSpace.liveSpaceCoord === undefined) {
        return {}
      } else {
        return this.$store.state.solopositionSpace.liveSpaceCoord
      }
    },
    zoomscaleValue: function () {
      return this.$store.state.activeScalevalue
    },
    toolbarStatusLive: function () {
      if (!this.$store.state.toolbarStatus) {
        return { active: false, text: '' }
      } else {
        return this.$store.state.toolbarStatus[this.moduleCNRL]
      }
    },
    nxpPrepareStatus: function () {
      if (!this.$store.state.nxpProgress) {
        return { active: false, text: '' }
      } else {
        return this.$store.state.nxpProgress[this.moduleCNRL]
      }
    },
    solospaceCoord: function () {
      if (this.$store.state.solopositionSpace.liveSpaceCoord === undefined) {
        return {}
      } else {
        return this.$store.state.solopositionSpace.liveSpaceCoord
      }
    },
    soloStoreGrid () {
      return this.$store.state.solopositionSpace.soloGrid
    }
  },
  props: {
    sbboard: String
  },
  data () {
    return {
      isModalVisible: false,
      solospace: {
        active: false
      },
      soloPosition: {},
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
      cellindex: [],
      localGrid: [],
      moduleType: 'solo-cells',
      index: 0,
      zoomdata: 0,
      startCountPos: 0,
      startCountPosY: 0
    }
  },
  watch: {
    startPostions: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        this.soloPosition = val
      }
    }
  },
  methods: {
    setActiveSpace (nxpID) {
      // only one active at a time
      // this.$store.dispatch('actionActiveDashSelect', nxpID)
      // this.dragDashmove = nxpID
      // set this NXP as live
      // this.$store.dispatch('actionActiveNXP', nxpID)
    },
    setCellindex (solo) {
      this.cellindex = this.cellspaceCoord[solo]
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
    returnBentospace () {
      this.$store.dispatch('actionSolospace', this.bboard)
    },
    closeModal () {
      this.$store.dispatch('actionSolospace', this.bboard)
    },
    closeModule () {
      console.log('close module')
    },
    wheelItBetter (event) {
      // use mouse wheel to zoom in out
      if (event.deltaY < 0) {
        this.zoomdata += 1
      } else {
        this.zoomdata -= 1
      }
    },
    setActiveSolo (nxpID) {
      console.log('move cell bar')
      // only one active at a time
      // this.$store.dispatch('actionActiveSoloSelect', nxpID)
      // this.dragDashmove = nxpID
      // set this NXP as live
      // this.$store.dispatch('actionActiveCell', nxpID)
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDragSolostartCallback (ev) {
      // this.$store.dispatch('actionSoloactiveNXP', ev)
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
      console.log('drag stop-----------------')
      console.log(x)
      console.log(y)
      let dbmove = {}
      dbmove.x = x
      dbmove.y = y
      let cellContext = {}
      cellContext.board = this.board
      cellContext.moduleCNRL = this.moduleCNRL
      cellContext.order = this.order
      dbmove.cell = cellContext
      console.log(dbmove)
      // this.$store.dispatch('actionSoloBmove', dbmove)
    },
    soloActivedrag: function () {
      return true
    }
  }
}
</script>

<style scoped>
.solo-space {
  position: relative;
  border: 3px solid red;
}

#solo-grid {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px dashed black;
}

#spacesolo-shaper {
  position: static;
}

#dragwheelsolo-space {
  height: 16000px;
  width: 1000%;
  overflow: hidden;
  border: 0px dashed blue;
}

#solo-placeholder {
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

.soloispace {
}

#solo-toolbar {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 31;
  border: 0px dashed red;
  width: 640px;
}

#solocellspace {
  border: 1px solid grey;
  height: 100%;
  min-width: 400px;
}

.drag-handlesolo {
  display: grid;
  background-color: lightgrey;
  height: 50px;
  border: 2px dashed red;
}

.drag-handlesolo.active {
  display: grid;
  background-color: #4CAF50; /* Green */
  height: 50px;
}

</style>
