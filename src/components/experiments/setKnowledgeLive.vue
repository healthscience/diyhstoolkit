<template>
  <div id="live-view-opendata">
    <div id="knowledge-selector">
      <div id="live-context-datatypes">
        <!-- <div id="context-devices" class="live-kelement">
          <header>Devices:</header>
          <ul>
            <li>
              <label for="devices-select"></label>
              <select class="select-device-id" id="device-mapping-build" @change="deviceSelect" v-model="visualsettings.device">
                <option value="none" selected="">please select</option>
                <option v-for="dev in devices" :key="dev.device_mac" v-bind:value="dev.device_mac">
                  {{ dev.device_name + ' ' + dev.device_mac }}
                </option>
              </select>
            </li>
          </ul>
        </div> -->
        <!-- <div id="context-compute" class="live-kelement">
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
        </div> -->
        <!-- <div id="context-results" class="live-kelement">
          <header>Datatype-Results:</header>
          <ul>
            <li>
              <label for="results-select"></label>
              <select class="select-results-id" id="results-mapping-build" @change="resultsSelect" v-model="visualsettings.results">
                <option value="none" selected="">please select</option>
                <option v-for="rDT in datatypeResults" :key="rDT.refcontract" v-bind:value="rDT">
                {{ rDT.column }}
                </option>
              </select>
            </li>
          </ul>
        </div> -->
      </div>
      <div id="live-context-datatypes">
        <ul>
          <li class="live-dtitem">
            <header>X-axis</header>
            <ul>
              <li v-if="refContractPackage.xaxisSet.length > 0">
                <label for="xaxis-select"></label>
                <select class="select-xaxis-id" id="xaxis-mapping-build" @change="xaxisSelect" v-model="visualsettings.xaxis">
                  <option value="none" selected="">please select</option>
                  <option v-for="colpair in refContractPackage.xaxisSet" :key="colpair.refcontract" v-bind:value="colpair.refcontract">
                  {{ colpair.column }}
                  </option>
                </select>
              </li>
            </ul>
          </li>
          <li class="live-item">
            <header>Y-axis</header>
            <ul v-if="refContractPackage.yaxisSet.length > 0">
              <label for="yaxis-select"></label>
              <select multiple="true" class="select-yaxis-id" id="yaxis-mapping-build" @change="yaxisSelect" v-model="visualsettings.yaxis">
                <option value="none" selected="">please select</option>
                <option v-for="colpairy in refContractPackage.yaxisSet" :key="colpairy.refcontract" v-bind:value="colpairy.refcontract">
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
    </div>
  </div>
</template>

<script>
// import hashObject from 'object-hash'

export default {
  name: 'set-knowledge-live',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String,
    toolInfo: Object
  },
  computed: {
    refContractCompute: function () {
      let computeLive = this.$store.state.joinNXPlive.compute
      return computeLive
    },
    refContractComputeLive: function () {
      console.log('refContractComputeLive')
      let liveCompute = []
      if (this.$store.state.refcontractCompute.length !== 0) {
        liveCompute = this.$store.state.refcontractCompute
      } else {
        liveCompute = []
      }
      console.log(liveCompute)
      return liveCompute
    },
    datatypesLive: function () {
      return this.$store.state.liveRefContIndex.datatype
    },
    resultsDTs: function () {
      return []
    },
    refContractPackage: function () {
      // match ids to visualise contract
      let setupDataPackage = {}
      if (this.$store.state.refcontractPackaging[0] !== undefined) {
        setupDataPackage = this.$store.state.refcontractPackaging[0]
      } else {
        setupDataPackage = {}
      }
      let datatypeMatcher = {}
      datatypeMatcher.xaxisSet = []
      datatypeMatcher.xaxisSet = [ { column: 'timestamp', refcontract: '209d8d2e4127b14d1503a2169733e52306a38dc8' } ]
      // observation or computation require in compute contract?
      // need to create new units based on compute and source datatype
      let newDatatypes = []
      let activeContractStage = {}
      let liveComputeRefcontractID = ''
      if (this.refContractComputeLive[0] === undefined) {
        liveComputeRefcontractID = '9fa74bc282591f401470c6e3523197997e96702c'
      } else {
        if (this.refContractComputeLive[0].option === undefined) {
          liveComputeRefcontractID = this.refContractComputeLive[0].key
          activeContractStage = this.refContractComputeLive[0]
        } else {
          liveComputeRefcontractID = this.refContractComputeLive[0].option.key
          activeContractStage = this.refContractComputeLive[0].option
        }
      }
      if (liveComputeRefcontractID !== '9fa74bc282591f401470c6e3523197997e96702c') {
        let computeDTprefix = {}
        for (let dt of setupDataPackage.value.concept.tablestructure) {
          let combinComputeDT = dt
          for (let dtr of this.datatypesLive) {
            if (dtr.key === activeContractStage.value.computational.dtprefix) {
              // console.log('match dt')
              // console.log(dtr)
              computeDTprefix = dtr
            }
          }
          // lookup datatype contract
          let dtCombine = {}
          dtCombine.refcontract = combinComputeDT.refcontract + '-' + computeDTprefix.key
          dtCombine.column = combinComputeDT.column + '-' + computeDTprefix.value.concept.name
          newDatatypes.push(dtCombine)
        }
      } else {
        // observation use source datatypes
        newDatatypes = setupDataPackage.value.concept.tablestructure
      }
      datatypeMatcher.yaxisSet = newDatatypes
      let datatypeHolder = {}
      datatypeHolder.xaxisSet = datatypeMatcher.xaxisSet
      datatypeHolder.yaxisSet = datatypeMatcher.yaxisSet
      return datatypeHolder
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
        // need to look up each datatype id to get text name
        let catDisplay = []
        for (let uc of unique) {
          for (let dtl of this.$store.state.liveRefContIndex.datatype) {
            if (uc === dtl.key) {
              // build pair
              let catPair = {}
              catPair.key = uc
              catPair.name = dtl.value.concept.name
              catDisplay.push(catPair)
            }
          }
        }
        return catDisplay
      }
    },
    calendarDate: function () {
      return this.$store.state.liveDate
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
    timeRange: function () {
      return this.$store.state.setTimerange
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
      return this.$store.state.devicesLive[this.shellID]
    },
    selectedTimeFormat: function () {
      return this.$store.state.setTimeFormat
    }
  },
  data () {
    return {
      selectChange: {
        'xaxis': false
      },
      xaxisSet: '',
      yaxisSet: '',
      visualsettings: {
        xaxis: null,
        yaxis: []
      },
      feedback:
      {
        devices: false,
        datatypes: false,
        categories: false,
        time: false,
        visulisation: false,
        resolution: false
      },
      datatypeResults: []
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
      this.$store.dispatch('actionNewVisDevice', this.visualsettings.device)
    },
    computeSelect () {
      // prepare the results datatype
      this.datatypeResults = []
      for (let scomp of this.refContractComputeLive) {
        if (scomp.key === this.visualsettings.compute) {
          // extract compute dtprefix and add to all datatype active in toolbar
          // need to build new datatypes for results
          /* for (let updateRDTS of this.refContractPackage) {
            // console.log(updateRDTS)
            let buildDTR = {}
            buildDTR.column = scomp.value.computational.name + updateRDTS.column
            let sourceComputeDT = {}
            sourceComputeDT.computedt = scomp.key
            sourceComputeDT.computerefcontract = updateRDTS.refcontract
            // make hash of combined
            let combineDThash = hashObject(sourceComputeDT)
            buildDTR.refcontract = combineDThash // scomp.key + '-' + updateRDTS.refcontract
            this.datatypeResults.push(buildDTR)
          } */
        }
      }
      this.$store.dispatch('actionNewVisCompute', this.visualsettings.compute)
    },
    resultsSelect () {
      // transfer this result type to chart y axis
      this.$store.dispatch('actionNewVisResults', this.visualsettings.results)
      this.refContractPackage.push(this.visualsettings.results)
    },
    learnUpdate () {
      let contextK = {}
      contextK.nxpCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.opendata = 'updated'
      contextK.startperiodchange = ''
      contextK.startperiod = this.calendarDate
      contextK.rangechange = this.timeRange
      contextK.timeformat = this.selectedTimeFormat
      this.$store.dispatch('actionVisUpdate', contextK)
    }
  }
}
</script>

<style>
#live-view-opendata {
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

#context-devices {
  min-width: 300px;
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
