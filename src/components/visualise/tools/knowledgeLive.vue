<template>
  <div id="live-view">
    dddd
    <!-- <div id="live-context-datatypes" class="live-kelement">
      <header>X-axis fixed </header>
        <ul>
          <li id="bmp-data-sensor">
            <div class="live-item">Timestamp</div>
          </li>
        </ul>
      <header>Y-axis</header>
        <ul>
          <li id="bmp-data-sensor" v-for="dts in buidContextLive" :key='dts'>
            <div class="live-item">{{ dts }}</div>
          </li>
        </ul>
        <div v-if="feedback.datatypes" class="feedback">---</div>
    </div> -->
  </div>
</template>

<script>
// import KnowledgeContext from '@/components/visualise/tools/knowledgeContext'
const moment = require('moment')

export default {
  name: 'knowledge-live',
  components: {
    // KnowledgeContext
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String
  },
  computed: {
    buidContextLive: function () {
      console.log(this.shellID)
      console.log(this.moduleCNRL)
      console.log(this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data)
      return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data
    }
  },
  data () {
    return {
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
    setTimeBundle () {
      const nowTime = moment()
      let realTime = moment.utc(nowTime)
      let startPeriodTime = moment.utc(nowTime).startOf('day')
      let updateTbundle = {}
      updateTbundle.realtime = realTime
      updateTbundle.timeseg = this.openDataLive.timeLive
      updateTbundle.startperiod = startPeriodTime
      updateTbundle.timevis = this.openDataLive.timeLive
      return updateTbundle
    },
    saveLearnHistory (lBundle) {
      this.historyData.push(lBundle)
    },
    setKnowledgtBox (liveKbid) {
      // first clear existing knowledge in box
      this.clearKnowledgeBox()
      this.languageStatus(liveKbid.language)
      this.deviceStatus(liveKbid.startStatus)
      for (let dI of liveKbid.devices) {
        this.liveDevice(dI)
      }
      for (let dtI of liveKbid.datatypes) {
        this.datatypeStatus(dtI)
      }
      this.scienceStatus(liveKbid.science)
      let timeBuild = {}
      timeBuild.active = true
      timeBuild.text = liveKbid.time.timeseg[0]
      this.timeStatus(timeBuild)
      let resolutionBuild = {}
      resolutionBuild.active = true
      resolutionBuild.text = liveKbid.resolution
      this.resolutionStatus(resolutionBuild)
      let categoriesBuild = {}
      categoriesBuild.active = true
      categoriesBuild.cnrl = liveKbid.categories[0].cnrl
      categoriesBuild.text = liveKbid.categories[0].text
      this.categoryStatus(categoriesBuild)
      // pass on info to open knowledge
      this.$emit('newLiveKBundle', liveKbid)
    },
    clearKnowledgeBox () {
      // but set category and compute variables
      this.openDataLive.languageLive = ''
      this.openDataLive.devicesLive = []
      this.openDataLive.datatypesLive = []
      this.openDataLive.scienceLive = ''
      this.openDataLive.resolutionLive = ''
      this.openDataLive.timeLive = []
      this.openDataLive.categoryLive = []
      // set defaults
      let sciStartEmpty = {}
      sciStartEmpty.prime = { 'text': 'empty' }
      this.openDataLive.scienceLive = sciStartEmpty
      this.openDataLive.categoryLive.push({ 'active': false, 'cnrl': 'none', 'text': 'none' }) // categoryEmpty
    },
    languageStatus (lIN) {
      this.openDataLive.languageLive = lIN
    },
    deviceStatus (dIN) {
      this.liveDevice(dIN)
    },
    liveDevice (liveD) {
      let deviceLive = []
      if (liveD.active === true) {
        deviceLive.push(liveD)
      } else if (liveD.active === false) {
        // remove device
        this.removeLiveElement(liveD.device_mac)
      }
      this.openDataLive.devicesLive = deviceLive
    },
    removeLiveElement (remove) {
      let array = this.openDataLive.devicesLive
      function arrayRemove (arr, value) {
        return arr.filter(function (ele) {
          return ele.device_mac !== value
        })
      }
      arrayRemove(array, remove)
      return true
    },
    datatypeStatus (ldt) {
      this.openDataLiveTypes(ldt)
    },
    openDataLiveTypes (liveDT) {
      if (liveDT.active === true) {
        this.openDataLive.datatypesLive.push(liveDT)
      } else if (liveDT.active === false) {
        // remove device
        this.removeLiveDT(liveDT.text)
      }
    },
    removeLiveDT (remove) {
      let array = this.openDataLive.datatypesLive
      function arrayRemove (arr, value) {
        return arr.filter(function (ele) {
          return ele.text !== value
        })
      }
      let result = arrayRemove(array, remove)
      this.openDataLive.datatypesLive = result
      return true
    },
    scienceStatus (sIN) {
      this.openDataLive.scienceLive = sIN
    },
    timeStatus (tIN) {
      if (tIN.active === true) {
        this.openDataLive.timeLive = []
        this.openDataLive.timeLive.push(tIN.text)
      } else if (tIN.active === false) {
        // remove device
        this.removeLiveTime(tIN)
      }
    },
    removeLiveTime (trIN) {
      let removeTimeArr = this.openDataLive.timeLive.filter(item => item !== trIN.text)
      this.openDataLive.timeLive = removeTimeArr
    },
    resolutionStatus (rIN) {
      if (rIN.active === true) {
        this.openDataLive.resolutionLive = rIN.text
      } else if (rIN.active === false) {
        // remove device
        this.openDataLive.resolutionLive = ''
      }
    },
    categoryStatus (catIN) {
      // this.openDataLive.categoryLive = catIN
      this.openDataLive.categoryLive = []
      if (catIN.active === true) {
        this.openDataLive.categoryLive = []
        this.openDataLive.categoryLive.push(catIN)
      } else if (catIN.active === false) {
        // remove device
        this.removeLiveCat(catIN.text)
      }
    },
    removeLiveCat (remove) {
      let array = this.openDataLive.categoryLive
      function arrayRemove (arr, value) {
        return arr.filter(function (ele) {
          return ele.text !== value
        })
      }
      let result = arrayRemove(array, remove)
      if (result.length === 0) {
        result.push({ 'active': false, 'cnrl': 'none', 'text': 'none' })
      }
      this.openDataLive.categoryLive = result
      return true
    },
    setNaveTime () {
      // this.liveNavTime = this.timeNav('datatime-index')
    },
    startStatusSave (se) {
      // change start status and save or delete settings
      this.$store.dispatch('actionUpdateBundleItem', this.activeEntity)
      let updateBundle = this.$store.getters.startBundlesList
      for (let iB of updateBundle) {
        if (iB.kbid === this.activeEntity) {
          this.saveStartBundle(iB)
        }
      }
    },
    filterDeviceActive () {
      if (this.device1.active === true) {
        this.activedevice = this.device1.id
      } else if (this.device2.active === true) {
        this.activedevice = this.device2.id
      }
    },
    filterSensorActive () {
      if (this.sensor1.active === true) {
        this.activesensor = this.sensor1.id
      } else if (this.sensor2.active === true) {
        this.activesensor = this.sensor2.id
      }
    },
    filterScienceActive () {
      if (this.compute1.active === true) {
        this.activecompute = this.compute1.id
      } else if (this.compute2.active === true) {
        this.activecompute = this.compute2.id
      } else if (this.compute3.active === true) {
        this.activecompute = this.compute3.id
      } else if (this.compute4.active === true) {
        this.activecompute = this.compute4.id
      }
    },
    filterVisActive () {
      if (this.vis1.active === true) {
        this.activevis = this.vis1.id
      } else if (this.vis2.active === true) {
        this.activevis = this.vis2.id
      }
    }
  }
}
</script>

<style>
#live-view {
  height: 100%;
  overflow: visible;
  border: 2px solid lightgrey;
  margin-left: 1em;
}

#learn-close {
  clear:both;
}

#history {
  border-top: 1px solid grey;
  margin-top: 2em;
}

#live-context-datatypes li {
  display: block;
  border: 0px solid pink;
}

#live-knowledge-elements {
  border: 0px solid blue;
  background-color: #eae6ed;
}

#live-knowledge-holder {
  float: left;
  border: 1px solid purple;
  background-color: white;
  margin: 6px;
}

.live-kelement {
  display: inline-block;
  vertical-align: top;
  border: 0px solid red;
  margin-left: 20px;
  width: 180px;
}

.live-dtresults {
  display: inline-block;
  vertical-align: top;
  border: 0px solid red;
  margin-left: 20px;
  width: 180px;
}

.live-kelement header {
  background-color: #d7e6f5;
  border-bottom: 2px dotted #6F6B63;
  margin: 4px;
  font-weight: normal;
}

.live-item {
  font-weight: bold;
  border: 0px solid black;
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
