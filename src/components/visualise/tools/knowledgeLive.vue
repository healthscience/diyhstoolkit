<template>
  <div id="live-view-opendata">
    <div id="knowledge-selector">
      <div id="live-context-datatypes">
        <div id="context-devices" class="live-kelement">
          <header>Devices:</header>
          <ul>
            <li>
              <label for="devices-select"></label>
              <select class="select-device-id" id="device-mapping-build" v-model="deviceSettings.devices">
                <option value="none" >please select</option>
                <option v-for="dev in deviceList" :key="dev.device_mac" v-bind:value="dev.device_mac">
                  {{ dev.device_name + ' ' + dev.device_mac }}
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
              <select class="select-compute-id" id="compute-mapping-build" v-model="deviceSettings.compute">
                <option value="none" >please select</option>
                <option v-for="compL in refContractsComputeLive" :key="compL.key" v-bind:value="compL.key">
                  {{ compL.value.computational.name }}
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
              <li v-if="refContractPackage.xaxisSet.length > 0">
              <label for="xaxis-select"></label>
                <select class="select-xaxis-id" id="xaxis-mapping-build" v-model="deviceSettings.xaxis">
                  <option value="none" selected="">please select</option>
                  <option v-for="colpair in refContractPackage.xaxisSet" :key="colpair.refcontract" v-bind:value="colpair.key">
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
              <select multiple="true" class="select-yaxis-id" id="yaxis-mapping-build" v-model="deviceSettings.yaxis">
                <!-- <option value="none" selected="">please select</option> -->
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
      <div id="live-context-category" class="live-kelement">
        <header>Category</header>
          <ul>
            <li id="cat-items">
              <label for="category-select"></label>
              <select  multiple="true" class="select-category-id" id="category-mapping-build" v-model="deviceSettings.category">>
                <option value="please" selected="">Please select</option>
                <option v-for="catL in category" :key="catL.key" v-bind:value="catL.key">
                  {{ catL.name }}
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
              <select class="select-time-id" id="time-mapping-build" v-model="deviceSettings.timeperiod">
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
              <select class="select-resolution-id" id="resolution-mapping-build" v-model="deviceSettings.resolution">
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
export default {
  name: 'knowledge-live',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String,
    toolInfo: Object
  },
  beforeMount () {
    this.deviceList = this.devices
  },
  computed: {
    deviceSettings: function () {
      return this.$store.state.visModuleHolder[this.mData]
    },
    devices: function () {
      return this.$store.getters.deviceList[this.shellID]
    },
    refContractPackage: function () {
      // match ids to visualise contract
      let modulesMatch = this.$store.state.experimentStatus[this.shellID].modules
      let visContract = {}
      let dataContract = {}
      for (let modC of modulesMatch) {
        if (modC.key === this.moduleCNRL) {
          visContract = modC
        }
        if (modC.value.type === 'data') {
          dataContract = modC.value.info.data
        }
      }
      let datatypeMatcher = {}
      datatypeMatcher.xaxisSet = []
      datatypeMatcher.xaxisSet.push(visContract.value.info.settings.xaxis)
      // set timestamp  as default yaxis
      let buildDTlibrary = []
      for (let dtt of dataContract.value.concept.tablestructure) {
        let dtLibmatch = {}
        dtLibmatch.refcontract = dtt.refcontract
        for (let dtr of this.datatypesLive) {
          if (dtr.key === dtt.refcontract) {
            dtLibmatch.column = dtr.value.concept.name
          }
        }
        buildDTlibrary.push(dtLibmatch)
      }
      datatypeMatcher.yaxisSet = buildDTlibrary
      // now match datatype references to their contract
      let xDatatypeContracts = []
      // let yDatatypeContracts = []
      for (let dtKey of datatypeMatcher.xaxisSet) {
        let dtMatch = this.$store.state.liveRefContIndex.datatype.find(elem => elem.key === dtKey)
        let dtPair = {}
        if (typeof dtMatch === 'object') {
          dtPair.key = dtKey
          dtPair.column = dtMatch.value.concept.name
          xDatatypeContracts.push(dtPair)
        }
      }
      let datatypeHolder = {}
      datatypeHolder.xaxisSet = xDatatypeContracts
      datatypeHolder.yaxisSet = datatypeMatcher.yaxisSet
      return datatypeHolder
    },
    activeComputeContract: function () {
      let modulesMatch = this.$store.state.experimentStatus[this.shellID].modules
      let computeContract = {}
      for (let modC of modulesMatch) {
        if (modC.value.type === 'compute') {
          computeContract = modC
        }
      }
      // set defaults for opentool bar
      this.setDefaultXaxis(computeContract.value.info.settings.xaxis)
      this.setYaxisOptions(computeContract.value.info.settings.yaxis)
      this.setDefaultCategory(computeContract.value.info.settings.category)
      this.setDefaultTimeperiod(computeContract.value.info.settings.timeperiod)
      this.setDefaultResolution(computeContract.value.info.settings.resolution)
      return computeContract.value.info.compute
    },
    refContractsComputeLive: function () {
      let computesLive = this.$store.state.liveRefContIndex.compute
      return computesLive
    },
    datatypesLive: function () {
      return this.$store.state.liveRefContIndex.datatype
    },
    category: function () {
      let catDisplay = []
      let modulesMatch = this.$store.state.experimentStatus[this.shellID].modules
      let visContract = {}
      for (let modC of modulesMatch) {
        if (modC.key === this.moduleCNRL) {
          visContract = modC
        }
      }
      // default settings from data contract
      let catSetup = []
      if (visContract.value.info.settings.category.length === 0) {
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
        for (let ncat of visContract.value.info.settings.category) {
          let defaultCatOptions = {}
          defaultCatOptions.key = ncat.key
          defaultCatOptions.name = this.convertReftoText(ncat.key, this.$store.state.liveRefContIndex.datatype)
          defaultCatOptions.rule = ncat.rule
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
    resolution: function () {
      // mock units refContract
      let resList = []
      const resItem = { text: 'minute', id: 'cnrl-t11', active: false }
      resList.push(resItem)
      return resList
    }
  },
  data () {
    return {
      deviceList: [],
      feedback:
      {
        devices: false,
        datatypes: false,
        categories: false,
        time: false,
        visulisation: false,
        resolution: false
      },
      observataionDts: []
    }
  },
  created () {
  },
  mounted () {
    this.setDefaultDevice()
    this.setComputeContract()
  },
  methods: {
    clearKnowledgeBox () {
      // set defaults
    },
    onlyUnique (value, index, self) {
      return self.indexOf(value) === index
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
    setDefaultDevice () {
      this.deviceSettings.devices = this.mData
    },
    setComputeContract () {
      this.deviceSettings.compute = this.activeComputeContract.key
    },
    setDefaultXaxis (xdefault) {
      this.deviceSettings.xaxis = xdefault
    },
    setYaxisOptions (startYdts) {
      let buildDTlibrary = []
      for (let dtt of startYdts) {
        let dtLibmatch = {}
        dtLibmatch.refcontract = dtt.refcontract
        for (let dtr of this.datatypesLive) {
          if (dtr.key === dtt.refcontract) {
            dtLibmatch.column = dtr.value.concept.name
          }
        }
        buildDTlibrary.push(dtLibmatch)
      }
      this.deviceSettings.yaxis = buildDTlibrary
    },
    setDefaultCategory (cat) {
      this.deviceSettings.category = cat
    },
    setDefaultTimeperiod (tperiod) {
      this.deviceSettings.timeperiod = tperiod
    },
    setDefaultResolution (res) {
      this.deviceSettings.resolution = res
    },
    setYaxis (computeContractMatch) {
      // form the y axis options
      let newDatatypes = []
      for (let dt of this.refContractPackage.yaxisSet) {
        let combinComputeDT = dt
        // lookup datatype contract
        let dtCombine = {}
        dtCombine.refcontract = combinComputeDT.refcontract + '-' + computeContractMatch.value.computational.dtprefix
        dtCombine.column = combinComputeDT.column + '-' + computeContractMatch.value.computational.name
        newDatatypes.push(dtCombine)
      }
      this.refContractPackage.yaxisSet = newDatatypes
    },
    deviceSelect (ev) {
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = ev.target.value
      this.$store.dispatch('actionNewVisDevice', visSetContext)
    },
    computeSelect () {
      // match to computeContract
      let computeContractMatch = {}
      for (let compC of this.refContractsComputeLive) {
        if (compC.key === this.toolbarHolder[this.mData].compute) {
          computeContractMatch = compC
        }
      }
      if (computeContractMatch.key !== 'f020a98b100ac40c109a1488220e9874cfa3f43a') {
        this.observataionDts = this.refContractPackage.yaxisSet
        // this.setYaxis(computeContractMatch)
      } else {
        // restore observation datatypes
        if (this.observataionDts.length !== 0) {
          this.refContractPackage.yaxisSet = this.observataionDts
        }
      }
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = this.toolbarHolder[this.mData].compute
      this.$store.dispatch('actionNewVisCompute', visSetContext)
    },
    xaxisSelect () {
      // set default x-axis chart setting
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = this.toolbarHolder[this.mData].xaxis
      this.$store.dispatch('actionNewVisXaxis', visSetContext)
    },
    yaxisSelect () {
      // set default y-axis chart setting
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = this.toolbarHolder[this.mData].yaxis
      this.$store.dispatch('actionNewVisYaxis', visSetContext)
    },
    categorySelect () {
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = this.toolbarHolder[this.mData].category
      this.$store.dispatch('actionNewVisCategory', visSetContext)
    },
    timeSelect () {
      // set default time chart setting
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = this.toolbarHolder[this.mData].time
      this.$store.dispatch('actionNewVisTime', visSetContext)
    },
    resolutionSelect () {
      // set default resolution chart setting
      let visSetContext = {}
      visSetContext.device = this.mData
      visSetContext.setting = this.toolbarHolder[this.mData].resolution
      this.$store.dispatch('actionNewVisResolution', visSetContext)
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
