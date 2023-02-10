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
          <div id="dragwheel-space" v-dragscroll.noleft.noright="true" @click="whereMinmap($event)">
            <div id="dashboard-placeholder"  @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }">
              <div v-for="soloi of BoardstatusData[sbboard]" :key="soloi.id" id="soloispace">
                <div v-if="BoardstatusData[sbboard]">
                  <div v-for="cell of startPostions[soloi]" :key="cell.id" id="cellholder">
                    <solo-cells :board="sbboard" :moduleCNRL="soloi" :cellposition="cell" :order="cell.cell.i"></solo-cells>
                  </div>
                </div>
                <div v-else>
                  data not arrived
                </div>
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
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import MinisoloMap from './minisoloMap.vue'
import SoloCells from '@/components/bentosolo/soloCells.vue'

export default {
  name: 'solo-space',
  components: {
    SoloModal,
    GridToolbar,
    MinisoloMap,
    SoloCells
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
      if (this.$store.state.nxpModulelist === undefined) {
        return {}
      } else {
        return this.$store.state.nxpModulelist
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
      cellindex: []
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
    }
  }
}
</script>

<style scoped>
#solo-grid {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px dashed black;
  height: 100%;
}
.solo-space {
  border: 1px solid red;
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

#solo-toolbar {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 31;
  border: 0px dashed red;
  width: 640px;
}

</style>
