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
          <grid-toolbar></grid-toolbar>
          <mininav-map></mininav-map>
          <div id="dragwheel-space" v-dragscroll.noleft.noright="true" @click="whereMinmap($event)">
            <div id="dashboard-placeholder"  @wheel="wheelScale($event)" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }">
              <div v-for="soloi of BoardstatusData[sbboard]" :key="soloi.id" id="soloispace">
              <!--<vue-draggable-resizable v-for="soloi of BoardstatusData[sbboard]" :key="soloi.id" id="soloispace" data-no-dragscroll :min-width="900" :w="1000" h="auto" :parent="true" @activated="onDragSolostartCallback(soloi)" @dragging="onDrag" @dragstop="onDragStop" @resizing="onResize" :grid="[60,60]" :drag-handle="'.drag-handle'" :x=130 :y=130>
                <div class="drag-handle" @click.prevent="setActiveSpace(soloi)" v-bind:class="{active: soloActivedrag === true }">-->
                <solo-cells :expCNRL="sbboard" :moduleCNRL="soloi"></solo-cells>
                <!--  :x=spaceCoord[soloi].x :y=spaceCoord[soloi].y   -->
                <!-- <div id="single-space" v-if="activeDrag[soloi]">
                  <div class="drag-handle" @click.prevent="setActiveSpace(soloi)" v-bind:class="{active: soloActivedrag[soloi].active === true }">
                    --- Activation Bar ---
                  </div>
                </div> -->
              <!-- </vue-draggable-resizable>-->
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
import GridToolbar from '@/components/spaces/grids/gridToolbar.vue'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import MininavMap from '@/components/spaces/grids/minimap/mininavMap.vue'
import SoloCells from '@/components/bentosolo/soloCells.vue'

export default {
  name: 'solo-space',
  components: {
    SoloModal,
    GridToolbar,
    MininavMap,
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
    spaceCoord: function () {
      return [ 1, 2 ]
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
      console.log(this.bboard)
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
  border: 4px dashed black;
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

</style>
