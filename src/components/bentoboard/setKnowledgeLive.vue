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
          <li  class="live-item">
            <div id="live-context-category">
              <header>Category</header>
                <ul>
                  <li v-if="category.length > 0" id="cat-items">
                    <label for="category-select"></label>
                    <select  multiple="true" class="select-category-id" id="category-mapping-build" @change="categorySelect" v-model="visualsettings.category">
                      <option value="please" selected="">please select</option>
                      <option v-for="catL in category" :key="catL.key" v-bind:value="catL.key">
                        {{ catL.name }}
                      </option>
                    </select>
                  </li>
                </ul>
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
      let liveCompute = []
      if (this.$store.state.refcontractCompute.length !== 0) {
        liveCompute = this.$store.state.refcontractCompute
      } else {
        liveCompute = []
      }
      return liveCompute
    },
    datatypesLive: function () {
      return this.$store.state.liveRefContIndex.datatype
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
      datatypeMatcher.xaxisSet = [ { column: 'timestamp', refcontract: 'd76d9c3db7f2212335373873805b54dd1f903a06' } ] // '2d11318841f43034df41de9b38ab5e77b6b01bcf' } ]
      // observation or computation require in compute contract? // f3d388ebd946007626ee1d6ce0642710d550eb6d
      // need to create new units based on compute and source datatype
      let newDatatypes = []
      let activeContractStage = {}
      let liveComputeRefcontractID = ''
      if (this.refContractComputeLive[0] === undefined) {
        liveComputeRefcontractID = '47a7292b0115fc1f35f3d3da6342ab19abbd14b4' // 9a23c342893348879e71a75c45e48914787445f6
      } else {
        if (this.refContractComputeLive[0].option === undefined) {
          liveComputeRefcontractID = this.refContractComputeLive[0].key
          activeContractStage = this.refContractComputeLive[0]
        } else {
          liveComputeRefcontractID = this.refContractComputeLive[0].option.key
          activeContractStage = this.refContractComputeLive[0].option
        }
      }
      if (liveComputeRefcontractID !== '47a7292b0115fc1f35f3d3da6342ab19abbd14b4') {
        let computeDTprefix = {}
        for (let dt of setupDataPackage.value.concept.tablestructure) {
          let combinComputeDT = dt
          for (let dtr of this.datatypesLive) {
            if (dtr.key === activeContractStage.value.computational.dtprefix) {
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
        let buildDTlibrary = []
        for (let dtt of setupDataPackage.value.concept.tablestructure) {
          let dtLibmatch = {}
          dtLibmatch.refcontract = dtt.refcontract
          for (let dtr of this.datatypesLive) {
            if (dtr.key === dtt.refcontract) {
              dtLibmatch.column = dtr.value.concept.name
            }
          }
          buildDTlibrary.push(dtLibmatch)
        }
        newDatatypes = buildDTlibrary
      }
      datatypeMatcher.yaxisSet = newDatatypes
      let datatypeHolder = {}
      datatypeHolder.xaxisSet = datatypeMatcher.xaxisSet
      datatypeHolder.yaxisSet = this.filterEmptycol(datatypeMatcher.yaxisSet)
      return datatypeHolder
    },
    category: function () {
      let catDisplay = []
      let setupDataPackage = {}
      if (this.$store.state.refcontractPackaging[0] !== undefined) {
        setupDataPackage = this.$store.state.refcontractPackaging[0]
      } else {
        setupDataPackage = {}
      }
      // default settings from data contract
      let catSetup = []
      let anyCategoryset = Object.keys(setupDataPackage.value.concept.category)
      if (anyCategoryset.length === 0) {
        let defaultCatOptions = {}
        defaultCatOptions.key = 'none'
        defaultCatOptions.name = 'none'
        defaultCatOptions.rule = 'none'
        catSetup.push(defaultCatOptions)
      } else {
        // set default none & from contract
        let ndefautCatOptions = {}
        ndefautCatOptions.key = 'none'
        ndefautCatOptions.name = 'none'
        ndefautCatOptions.rule = 'none'
        catSetup.push(ndefautCatOptions)
        let catKeys = Object.keys(setupDataPackage.value.concept.category)
        for (let ncat of catKeys) {
          let defaultCatOptions = {}
          defaultCatOptions.key = setupDataPackage.value.concept.category[ncat].category
          defaultCatOptions.name = this.convertReftoText(setupDataPackage.value.concept.category[ncat].category, this.$store.state.liveRefContIndex.datatype)
          defaultCatOptions.rule = setupDataPackage.value.concept.category[ncat].category.rule
          catSetup.push(defaultCatOptions)
        }
        // catSetup = [...new Set(catSetup)]
      }
      catDisplay = catSetup
      return catDisplay
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
      return this.$store.state.setTimerange[this.mData]
    },
    resolution: function () {
      // mock units refContract
      let resList = []
      const resItem = { text: 'minute', id: 'cnrl-t11', active: false }
      resList.push(resItem)
      return resList
    },
    devices: function () {
      return this.$store.state.devicesLive[this.shellID]
    },
    selectedTimeFormat: function () {
      return this.$store.state.setTimeFormat
    }
  },
  filters: {
    noBlanks (value) {
      let allowed = ''
      if (value !== undefined) {
        allowed = value
        return allowed
      } else {
        return 'empty'
      }
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
        device: null,
        compute: null,
        xaxis: 'd76d9c3db7f2212335373873805b54dd1f903a06', // null,
        yaxis: [], // ['c4369332b824d237ba65303af949c7b2a79c8603'], // [],
        category: [],
        time: 'cnrl-t1',
        resolution: 'cnrl-t11'
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
    filterEmptycol (colArr) {
      let tidyArr = []
      for (let cm of colArr) {
        if (cm.refcontract !== null && cm.refcontract !== '47a7292b0115fc1f35f3d3da6342ab19abbd14b4') {
          tidyArr.push(cm)
        }
      }
      return tidyArr
    },
    convertReftoText (cat, dtList) {
      let nameText = ''
      for (let dtref of dtList) {
        if (dtref.key === cat) {
          nameText = dtref.value.concept.name
        }
      }
      return nameText
    },
    computeSelect () {
      // prepare the results datatype
      this.datatypeResults = []
      for (let scomp of this.refContractComputeLive) {
        if (scomp.key === this.visualsettings.compute) {
        }
      }
      this.$store.dispatch('actionSetVisCompute', this.visualsettings.compute)
    },
    onlyUnique (value, index, self) {
      return self.indexOf(value) === index
    },
    xaxisSelect () {
      // set default x-axis chart setting
      this.$store.dispatch('actionSetVisXaxis', this.visualsettings.xaxis)
    },
    yaxisSelect () {
      // set default y-axis chart setting
      this.$store.dispatch('actionSetVisYaxis', this.visualsettings.yaxis)
    },
    categorySelect () {
      this.$store.dispatch('actionSetVisCategory', this.visualsettings.category)
    },
    timeSelect () {
      // set default time chart setting
      this.$store.dispatch('actionSetVisTime', this.visualsettings.time)
    },
    resolutionSelect () {
      // set default resolution chart setting
      this.$store.dispatch('actionSetVisResolution', this.visualsettings.resolution)
    },
    deviceSelect () {
      this.$store.dispatch('actionSetVisDevice', this.visualsettings.device)
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
