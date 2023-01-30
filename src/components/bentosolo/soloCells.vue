<template>
  <div id="cells-holder">
    <div id="cells-pmodulde" v-for="imod of this.localGrid" :key="imod.id">
      <vue-draggable-resizable id="soloispace" data-no-dragscroll :min-width="900" :w="1000" h="auto" :parent="true" @activated="onDragSolostartCallback(moduleCNRL)" @dragging="onDrag" @dragstop="onDragStop" @resizing="onResize" :grid="[60,60]" :drag-handle="'.drag-handle'" :x=imod.x :y=imod.y>
        <div class="drag-handle" @click.prevent="setActiveSolo(moduleCNRL)" v-bind:class="{active: soloActivedrag === true }">
        -- ACTIVATION BAR --- {{ imod }}
        </div>
        <component v-bind:is="moduleContent.prime.vistype" :shellID="expCNRL" :moduleCNRL="moduleCNRL" :moduleType="moduleContent.prime.cnrl" :mData="imod.i" class="module-placer"></component>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import _ from 'lodash'
// import ModuleBoard from './moduleBoard.vue'
// need to dynamically plug in modules required into toolkit see https://itnext.io/create-a-vue-js-component-library-part-2-c92a42af84e9
import nxpDevice from '@/components/visualise/nxpDevice.vue'
import nxpDapp from '@/components/visualise/nxpDapp.vue'
import nxpPlain from '@/components/visualise/plainBoard.vue'
import nxpCompute from '@/components/visualise/nxpCompute.vue'
import nxpVisualise from '@/components/visualise/nxpVisualise.vue'
// import learnReport from '@/components/reports/LearnReport'
// import learnAction from '@/components/reports/LearnAction'

export default {
  name: 'visual-dashview',
  components: {
    VueDraggableResizable,
    // learnReport,
    // learnAction
    // ModuleBoard,
    nxpDevice,
    nxpDapp,
    nxpCompute,
    nxpVisualise,
    nxpPlain
  },
  created: function () {
  },
  props: {
    expCNRL: String,
    moduleCNRL: String
  },
  computed: {
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
    moduleContent: function () {
      let contentModule = this.$store.state.NXPexperimentData[this.expCNRL]
      if (contentModule === undefined) {
        return false
      } else if (contentModule[this.moduleCNRL].data.length === 0) {
        return false
      } else {
        return contentModule[this.moduleCNRL]
      }
    },
    spaceCoord: function () {
      if (this.$store.state.solopositionSpace.liveSpaceCoord === undefined) {
        return {}
      } else {
        return this.$store.state.solopositionSpace.liveSpaceCoord
      }
    },
    storeGrid () {
      this.setLocalGrid(this.$store.state.moduleGrid[this.moduleCNRL])
      return _.cloneDeep(this.$store.state.moduleGrid[this.moduleCNRL])
    }
  },
  watch: {
    storeGrid (newValue) {
      this.localGrid = newValue
    },
    spaceCoord: {
      deep: true,
      // immediate: true,
      handler: function (newVal, oldVal) {
        console.log('solo space coor dupdated')
        console.log(newVal)
      }
    }
  },
  data () {
    return {
      localGrid: [],
      moduleType: 'solo-cells',
      index: 0,
      zoomdata: 0
    }
  },
  mounted () {
  },
  methods: {
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
    setLocalGrid (grid) {
      this.localGrid = grid
    },
    setActiveSolo (nxpID) {
      // only one active at a time
      this.$store.dispatch('actionActiveSoloSelect', nxpID)
      this.dragDashmove = nxpID
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
      this.$store.dispatch('actionSoloactiveNXP', ev)
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
      dbmove.nxp = this.bboard
      this.$store.dispatch('actionSoloBmove', dbmove)
    },
    soloActivedrag: function () {
      return true
    }
  }
}
</script>

<style scoped>
#cell-holder {
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

</style>
