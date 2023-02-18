<template>
  <div id="cell-holder">
      <component v-bind:is="moduleContent.prime.vistype" :shellID="board" :moduleCNRL="moduleCNRL" :moduleType="moduleContent.prime.cnrl" :mData="order" class="module-placer"></component>
  </div>
</template>

<script>
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
    board: String,
    moduleCNRL: String,
    cellposition: null,
    order: String
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
      let contentModule = this.$store.state.NXPexperimentData[this.board]
      if (contentModule === undefined) {
        return false
      } else if (contentModule[this.moduleCNRL].data.length === 0) {
        return false
      } else {
        return contentModule[this.moduleCNRL]
      }
    },
    BoardstatusData: function () {
      if (this.$store.state.nxpModulelist === undefined) {
        return {}
      } else {
        return this.$store.state.nxpModulelist
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
  data () {
    return {
      localGrid: [],
      moduleType: 'solo-cells',
      index: 0,
      zoomdata: 0,
      startCountPos: 0,
      startCountPosY: 0
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
      console.log('on drag')
      console.log(x)
      console.log(y)
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
#cell-holder {
  border: 2px solid blue;
  height: 100%;
}

</style>
