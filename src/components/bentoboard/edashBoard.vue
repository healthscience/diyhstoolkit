<template>
  <div id="dashboard-holder" v-if="moduleContent">
    <div id="dash-modules">
      <module-board>
        <template v-slot:header>
          <div id="dash-nametools">
            <div class="nametool-item" id="nxp-content" v-if="moduleContent.prime">
              {{ moduleContent.prime.text }}
            </div>
            <div class="nametool-item" id="module-toolbar">
              <div id="layouttools" v-if="moduleContent.prime.text !== 'Question'">
                <!-- <button @click='addItem'>Add an item</button> -->
                <input class="layout-controls" type='checkbox' v-model='draggable'/> Draggable
                <input class="layout-controls" type='checkbox' v-model='resizable'/> Resizable
                <!-- <button @click='decreaseWidth'>Decrease Width</button>
                <button @click='increaseWidth'>Increase Width</button> v-if="toolbarStatusLive.active" -->
              </div>
            </div>
          </div>
        </template>
        <template v-slot:body>
          <div id="zoom-holder"  v-if="moduleContent.prime.text !== 'Question'">
            <br/>
            <div class="grid-section" v-if="localGrid.length > 0">
              <grid-layout v-if="localGrid"
               :layout='localGrid'
               :col-num='12'
               :row-height='30'
               :is-draggable='draggable'
               :is-resizable='resizable'
               :responsive="responsive"
               :vertical-compact='true'
               :use-css-transforms='true'
              >
                <div class="scale-space">
                  <grid-item v-for='item in localGrid' :key='item.id'
                    :static='item.static'
                    :x='item.x'
                    :y='item.y'
                    :w='item.w'
                    :h='item.h'
                    :i='item.i'
                  >
                    <component v-bind:is="moduleContent.prime.vistype" :shellID="expCNRL" :moduleCNRL="moduleCNRL" :moduleType="moduleContent.prime.cnrl" :mData="item.i" class="module-placer"></component>
                  </grid-item>
                </div>
              </grid-layout>
            </div>
          </div>
          <div v-else>
            <component v-bind:is="'nxp-plain'" :shellID="expCNRL" :moduleCNRL="moduleCNRL" :moduleType="'cnrl-112'" :mData="9898989" class="module-placer"></component>
          </div>
        </template>
      </module-board>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import ModuleBoard from './moduleBoard.vue'
import VueGridLayout from 'vue-grid-layout'
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
    ModuleBoard,
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
      // console.log('mccmmc')
      // console.log(this.$store.state.NXPexperimentData[this.expCNRL])
      let contentModule = this.$store.state.NXPexperimentData[this.expCNRL]
      if (contentModule === undefined) {
        return false
      } else if (contentModule[this.moduleCNRL].data.length === 0) {
        return false
      } else {
        return contentModule[this.moduleCNRL]
      }
    },
    // ...mapState(['moduleGrid']),
    storeGrid () {
      this.setLocalGrid(this.$store.state.moduleGrid[this.moduleCNRL])
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
      localGrid: [],
      draggable: false,
      resizable: false,
      responsive: true,
      index: 0,
      zoomdata: 0
    }
  },
  mounted () {
  },
  methods: {
    setLocalGrid (grid) {
      this.localGrid = grid
    },
    toolbarUpdate (bp) {
      let updateToolbar = {}
      updateToolbar.state = this.toolbarStatusLive.active
      updateToolbar.module = this.moduleCNRL
      this.$store.dispatch('actionVisToolbar', updateToolbar)
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
    }
  }
}
</script>

<style scoped>
#dashboard-holder {
  border: 0px solid red;
}

#dash-modules {
  border: 1px solid grey;
  list-style: none;
}

#dash-nametools {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.nametool-item {
  border: 0px solid red;
}

#zoom-holder {
  border: 0px solid green;
}
#module-toolbar {
  border: 0px solid red;
}
.layout-controls {
  display: inline;
}
.grid-section {
  border: 0px solid grey;
  min-height: 200px;
}
.module-placer {
  border: 0px solid blue;
}
#nxp-content {
  font-size: 1.4em;
}
.vue-grid-layout {
  border: 0px solid red;
  /* transform: scale(0.3); */
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
/* :not(.vue-grid-placeholder)
transform: scale(0.25)
 */
.vue-grid-item {
  background: white;
  opacity: 0.99;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  border: 1px solid grey;
  width: 98% !important;
}
/*
.vue-grid-item {
  display: grid;
  grid-template-columns: 1fr;
  background: white;
  border: 10px solid red;
  width: 100%;
  overflow: scroll;
}
*/
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
    /* margin: auto;
    height: 100%;
    width: 100%; */
}
.vue-grid-item .no-drag {
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
