<template>
  <div id="live-view">
    <div id="knowledge-selector">
      <div id="live-context-datatypes">
        <div id="context-devices" class="live-kelement">
          <header>Devices:</header>
          <ul>
            <li>
              <label for="devices-select"></label>
              <select class="select-device-id" id="device-mapping-build" @change="deviceSelect" v-model="visualsettings.device">
                <option value="none" selected="">please select</option>
                <option v-for="dev in devices" :key="dev.device_mac" v-bind:value="dev.device_mac">
                  {{ dev.device_name }}
                </option>
              </select>
            </li>
          </ul>
        </div>
        <div id="context-compute" class="live-kelement">
          <header>Compute:</header>
          <ul>
            <li>
              <label for="compute-select"></label>
              <select class="select-compute-id" id="compute-mapping-build" @change="computeSelect" v-model="visualsettings.compute">
                <option value="none" selected="">please select</option>
                <option v-for="comp in refContractCompute" :key="comp.option.key" v-bind:value="comp.option.key">
                {{ comp.option.value.computational.name }}
                </option>
                <option v-for="compL in refContractComputeLive" :key="compL.key" v-bind:value="compL.key">
                {{ compL.value.computational.name }}
                </option>
              </select>
            </li>
          </ul>
        </div>
        <div id="context-results" class="live-kelement">
          <header>Results:</header>
          <ul>
            <li>
              <label for="results-select"></label>
              <select class="select-results-id" id="results-mapping-build" @change="resultsSelect" v-model="visualsettings.results">
                <option value="none" selected="">please select</option>
                <option v-for="rDT in resultsDTs" :key="rDT.refcont" v-bind:value="rDT.key">
                {{ rDT.text }}
                </option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div id="live-context-datatypes">
        <ul>
          <li class="live-dtitem">
            <header>X-axis</header>
            <ul>
              <li v-if="refContractPackage.length > 0">
                <label for="xaxis-select"></label>
                <select class="select-xaxis-id" id="xaxis-mapping-build" @change="xaxisSelect" v-model="visualsettings.xaxis">
                  <option value="none" selected="">please select</option>
                  <option v-for="colpair in refContractPackage" :key="colpair.refcontract" v-bind:value="colpair.refcontract">
                  {{ colpair.column }}
                  </option>
                </select>
              </li>
            </ul>
          </li>
          <li class="live-item">
            <header>Y-axis</header>
            <ul v-if="refContractPackage.length > 0">
              <label for="yaxis-select"></label>
              <select multiple="true" class="select-yaxis-id" id="yaxis-mapping-build" @change="yaxisSelect" v-model="visualsettings.yaxis">
                <option value="none" selected="">please select</option>
                <option v-for="colpairy in refContractPackage" :key="colpairy.refcontract" v-bind:value="colpairy.refcontract">
                {{ colpairy.column }}
                </option>
              </select>
            </ul>
            <div v-if="feedback.datatypes" class="feedback">
              ---
            </div>
          </li>
        </ul>
      </div>
      <div id="live-context-category" class="live-kelement">
        <header>Category</header>
          <ul>
            <li id="cat-items">
              <label for="category-select"></label>
              <select class="select-category-id" id="category-mapping-build" @change="categorySelect" v-model="visualsettings.category">
                <option value="none" selected="">none</option>
                <option v-for="catL in category" :key="catL" v-bind:value="catL.key">
                  {{ catL }}
                </option>
              </select>
            </li>
          </ul>
          <div v-if="feedback.categories" class="feedback">---</div>
      </div>
      <div id="context-time" class="live-kelement">
        <header>Time Period:</header>
          <ul>
            <li id="time-items">
              <label for="time-select"></label>
              <select class="select-time-id" id="time-mapping-build" @change="timeSelect" v-model="visualsettings.time">
                <option value="none" selected="">please select</option>
                <option v-for="t in time" :key="t.id" v-bind:value="t.id">
                  {{ t.text }}
                </option>
              </select>
            </li>
          </ul>
          <div v-if="feedback.time" class="feedback">---</div>
      </div>
      <div id="context-resolution" class="live-kelement">
        <header>Resolution:</header>
          <div class="live-item"></div>
            <li id="resolution-items">
              <label for="resolution-select"></label>
              <select class="select-resolution-id" id="resolution-mapping-build" @change="resolutionSelect" v-model="visualsettings.resolution">
                <option value="none" selected="">please select</option>
                <option v-for="rs in resolution" :key="rs.id" v-bind:value="rs.id">
                  {{ rs.text }}
                </option>
              </select>
            </li>
          <div v-if="feedback.resolution" class="feedback">---</div>
      </div>
      <div id="context-learn" class="live-kelement">
        <li>
          <button id="learn-update" @click.prevent="learnUpdate($event)">Learn</button>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'knowledge-live',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String
  },
  computed: {
    dataSource: function () {
      return this.$store.state.datasourceCount
    },
    refContractCompute: function () {
      let computeLive = this.$store.state.joinNXPlive.compute
      return computeLive
    },
    refContractComputeLive: function () {
      let computeLive = this.$store.state.liveRefContIndex.compute
      return computeLive
    },
    resultsDTs: function () {
      return []
    },
    refContractPackage: function () {
      if (this.$store.state.refcontractPackaging.length === 0) {
        return []
      } else {
        return this.$store.state.refcontractPackaging[this.dataSource].value.concept.tablestructure
      }
    },
    category: function () {
      if (this.$store.state.refcontractPackaging.length === 0) {
        return []
      } else {
        const catLive = this.$store.state.refcontractPackaging[this.dataSource].value.concept.category
        const catIndex = Object.keys(catLive)
        let catList = []
        for (let cat of catIndex) {
          if (catLive[cat].category !== undefined) {
            catList.push(catLive[cat].category)
          }
        }
        // usage example:
        let unique = catList.filter(this.onlyUnique)
        return unique
      }
    },
    time: function () {
      // mock time unit refContracts
      let timeList = []
      const timeItem = { text: 'day', id: 'cnrl-t1', active: false }
      timeList.push(timeItem)
      const timeItem2 = { text: 'week', id: 'cnrl-t2', active: false }
      timeList.push(timeItem2)
      const timeItem3 = { text: 'month', id: 'cnrl-t3', active: false }
      timeList.push(timeItem3)
      return timeList
    },
    resolution: function () {
      // mock units refContract
      let resList = []
      const resItem = { text: 'minute', id: 'cnrl-t11', active: false }
      resList.push(resItem)
      return resList
    },
    results: function () {
      return this.$store.state.refContractPackaging
    },
    devices: function () {
      return this.$store.state.devicesLive
    }
  },
  data () {
    return {
      selectChange: {
        'xaxis': false
      },
      visualsettings: {
        xaxis: null,
        yaxis: null
      },
      feedback:
      {
        devices: false,
        datatypes: false,
        categories: false,
        time: false,
        visulisation: false,
        resolution: false
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    clearKnowledgeBox () {
      // set defaults
    },
    onlyUnique (value, index, self) {
      return self.indexOf(value) === index
    },
    xaxisSelect () {
      // set default x-axis chart setting
      this.$store.dispatch('actionNewVisXaxis', this.visualsettings.xaxis)
    },
    yaxisSelect () {
      // set default y-axis chart setting
      this.$store.dispatch('actionNewVisYaxis', this.visualsettings.yaxis)
    },
    categorySelect () {
      this.$store.dispatch('actionNewVisCategory', this.visualsettings.category)
    },
    timeSelect () {
      // set default time chart setting
      this.$store.dispatch('actionNewVisTime', this.visualsettings.time)
    },
    resolutionSelect () {
      // set default resolution chart setting
      this.$store.dispatch('actionNewVisResolution', this.visualsettings.resolution)
    },
    deviceSelect () {
      console.log(this.visualsettings.device)
      this.$store.dispatch('actionNewVisDevice', this.visualsettings.device)
    },
    computeSelect () {
      this.$store.dispatch('actionNewVisCompute', this.visualsettings.compute)
    },
    resultsSelect () {
      this.$store.dispatch('actionNewVisResults', this.visualsettings.results)
    },
    learnUpdate () {
      console.log('learn update from open data')
      // this.$store.dispatch('actionDisplayLearn')
      let contextK = {}
      contextK.nxpCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.opendata = 'updated'
      // contextK.startperiodchange = seg.text.number
      // contextK.startperiod = 0
      // contextK.rangechange = []
      this.$store.dispatch('actionVisUpdate', contextK)
    }
  }
}
</script>

<style>
#live-view {
  height: 100%;
  overflow: visible;
  border: 4px solid lightgrey;
  margin-left: 1em;
}

#learn-close {
  clear:both;
}

#live-context-datatypes {
  display: block;
  margin-bottom: 30px;
  border-bottom: 1px dashed grey;
}

.live-kelement {
  display: inline-block;
  vertical-align: top;
  border: 3px solid white;
  margin-left: 20px;
  width: 180px;
}

.live-kelement header {
  background-color: #d7e6f5;
  /* border-bottom: 2px dotted #6F6B63; */
  margin: 4px;
  font-weight: normal;
}

.live-item {
  font-weight: bold;
  border: 0px solid black;
}

.live-dtitem {
  font-weight: bold;
  border: 0px solid black;
}

#learn-update {
  font-size: 2em;
}

.context-selecttime {
  display: inline;
  margin: 1em;
  min-height: 40px;
}

#k-toolkit {
  border: 2px solid grey;
}

#add-exp-button {
  font-size: 1.4em;
  padding-left: 8px;
  padding-right: 8px;
}

#add-experiment,#time-select,#save-component {
  display: inline-block;
}

.feedback {
  background-color: red;
  vertical-align: bottom;
}

.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{width:40px;font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
