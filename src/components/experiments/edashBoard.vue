<template>
  <div id="dashboard-holder" v-if="moduleContent.prime.active === true">
    <div id="dash-modules">
      <module-board @close="closeModule">
        <template v-slot:header>
        <!-- The code below goes into the header slot -->
          {{ moduleContent.prime.text }}
          <progress-vismessage v-if="visPrepareStatus.active === true" :progressMessage="visPrepareStatus" ></progress-vismessage>
        </template>
        <template v-slot:body>
        <!-- The code below goes into the header slot -->
          <div id="module-toolbar">
            <header>Toolbar--
              <button type="button" class="btn" @click="toolbarUpdate">{{ toolbarStatusLive.text }}</button>
            </header>
            <!-- <button @click='decreaseWidth'>Decrease Width</button>
            <button @click='increaseWidth'>Increase Width</button> -->
            <div id="layouttools" v-if="toolbarStatusLive.active">
              <button @click='addItem'>Add an item</button>
              <input type='checkbox' v-model='draggable'/> Draggable
              <input type='checkbox' v-model='resizable'/> Resizable
            </div>
            <br/>
            <div class="grid-section">
              <grid-layout v-if="localGrid"
                           :layout='localGrid'
                           :col-num='12'
                           :row-height='30'
                           :is-draggable='draggable'
                           :is-resizable='resizable'
                           :vertical-compact='true'
                           :use-css-transforms='true'
              >
                <grid-item v-for='item in localGrid' :key='item.id'
                           :static='item.static'
                           :x='item.x'
                           :y='item.y'
                           :w='item.w'
                           :h='item.h'
                           :i='item.i'
                        >
                    <!-- <span class='text'>box{{itemTitle(item)}}</span> -->
                    <component v-bind:is="moduleContent.prime.vistype" :shellID="expCNRL" :moduleCNRL="moduleCNRL" :moduleType="moduleContent.prime.cnrl" :mData="item.i"></component>
                </grid-item>
              </grid-layout>
            </div>
          </div>
        </template>
      </module-board>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import ModuleBoard from './moduleBoard.vue'
import VueGridLayout from 'vue-grid-layout'
// need to dynamically plug in modules required into toolkit see https://itnext.io/create-a-vue-js-component-library-part-2-c92a42af84e9
import nxpDevice from '@/components/visualise/nxpDevice.vue'
import nxpDapp from '@/components/visualise/nxpDapp.vue'
import nxpPlain from '@/components/visualise/plainBoard.vue'
import nxpCompute from '@/components/visualise/nxpCompute.vue'
import nxpVisualise from '@/components/visualise/nxpVisualise.vue'
// import ProgressMessage from '@/components/visualise/tools/inProgress.vue'
import ProgressVismessage from '@/components/visualise/tools/inProgress.vue'
// import learnReport from '@/components/reports/LearnReport'
// import learnAction from '@/components/reports/LearnAction'
// const moment = require('moment')

export default {
  name: 'visual-dashview',
  components: {
    // learnReport,
    // learnAction
    ModuleBoard,
    ProgressVismessage,
    // ProgressMessage,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
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
    dashState: function () {
      let dashStateNXP = this.$store.state.experimentStatus
      return dashStateNXP[this.expCNRL]
    },
    toolbarStatusLive: function () {
      return this.$store.state.toolbarStatus[this.moduleCNRL]
    },
    visPrepareStatus: function () {
      // let visProgressState = {}
      // visProgressState = { text: 'Preparing visualisation', active: false }
      /* if (this.$store.state.visProgress[this.moduleCNRL][this.mData] !== undefined) {
        visProgressState = this.$store.state.visProgress[this.moduleCNRL][this.mData]
      } else {
        visProgressState = { text: 'Preparing visualisation', active: false }
      } */
      // return visProgressState
      return this.$store.state.visProgress[this.moduleCNRL]
    },
    moduleContent: function () {
      // console.log('module content data')
      // console.log(this.expCNRL)
      // console.log(this.moduleCNRL)
      // console.log(this.$store.state.NXPexperimentData[this.expCNRL])
      let contentModule = this.$store.state.NXPexperimentData[this.expCNRL]
      if (contentModule === undefined) {
        return false
      } else {
        return contentModule[this.moduleCNRL]
      }
    },
    ...mapState(['moduleGrid']),
    storeGrid () {
      return _.cloneDeep(this.$store.state.moduleGrid[this.moduleCNRL])
    }
  },
  watch: {
    storeGrid (newValue) {
      this.localGrid = newValue
    }
  },
  data () {
    return {
      moduleType: 'nxp-visualise',
      localGrid: _.cloneDeep(this.$store.state.moduleGrid),
      draggable: false,
      resizable: false,
      index: 0
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['actionLocalGrid']),
    toolbarUpdate (bp) {
      let updateToolbar = {}
      updateToolbar.state = this.toolbarStatusLive.active
      updateToolbar.module = this.moduleCNRL
      this.$store.dispatch('actionVisToolbar', updateToolbar)
    },
    closeModule () {
      console.log('close module')
    },
    itemTitle (item) {
      var result = item.i
      if (item.static) {
        result += ' - Static'
      }
      return result
    },
    /*
    increaseWidth: function (item) {
        var width = document.getElementById('content').offsetWidth;
        width += 20;
        document.getElementById('content').style.width = width+'px';
    },
    decreaseWidth: function (item) {

        var width = document.getElementById('content').offsetWidth;
        width -= 20;
        document.getElementById('content').style.width = width+'px';
    },
    removeItem: function(item) {
        //console.log('### REMOVE ' + item.i);
        this.layout.splice(this.layout.indexOf(item), 1);
    }, */
    addItem () {
      // console.log('### LENGTH: ' + this.layout.length);
      var item = { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': this.index + '', whatever: 'bbb' }
      this.index++
      // this.layout.push(item)
      this.$store.dispatch('actionGrideupdateItem', item)
    },
    setDashTime () {
      // call action to update state
      this.updateChartOptions()
    },
    updateChartOptions () {
      let optState = {}
      optState.syncOptions = []
      optState.expCNRL = this.moduleCNRL
    }
  }
}
</script>

<style>
#dashboard-holder {
  border: 0px solid red;
}
#dashboard-view {
  border: 1px solid white;
  margin: 2em;
  width: 98%;
}

header {
  margin-bottom: 12px;
  font-weight: bold;
}

.summary-item {
  display: inline-block;
  margin-left: 20px;
  font-weight: bold;
  font-size: 1.4em;
}

#progess {
  margin-left: 2em;
}

.grid-section {
  border: 0px solid orange;
}

.vue-grid-layout {
    border: 0px solid black;
    background: #eee;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

/*.vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
}*/

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 0px solid red;
}

.vue-grid-item.resizing {
    opacity: 1;
}

.vue-grid-item.static {
    background: #E9EDF0;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}

#dash-modules ul {
  border: 1px solid grey;
  margin: 1em;
  list-style: none;
}
</style>
