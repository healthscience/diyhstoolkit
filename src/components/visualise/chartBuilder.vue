<template>
  <div id="vis-toolkit"> Device: {{ mData }}
    <div id="diy-tools">
      <div id="chart-type">
        <!-- <div class="network-tools">
          <div class="context-network">
            <button @click.prevent="setNetworkgraph('networkview')">{{ network.text }}</button>
          </div>
          <div class="context-network">
            <button @click.prevent="setNetworkmap('mapview')">{{ mapButton.text }}</button>
          </div>
        </div> -->
        <div class="network-tools">
          <calendar-tool :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></calendar-tool>
        </div>
        <!-- <div class="network-tools">
          <div class="chart-style-tools">
            <li>
              <button @click.prevent="chartSelect()">Bar</button>
            </li>
            <li>
              <button @click.prevent="chartSelect()">Line</button>
            </li>
            <li>
              <button @click.prevent="chartSelect()">Mixed</button>
            </li>
            <div>
              <button @click.prevent="labelsSelect()">Labels</button>
            </div>
          </div>
        </div> -->
        <div class="network-tools" v-if="openDataLive[mData] !== undefined">
          <a href="#" id="opendata-space" @click.prevent="openDataToolbar()">{{ openDataLive[mData].text }}</a>
        </div>
      </div>
      <div v-if="openDataLive[mData] !== undefined" id="open-knowledge">
        <opendata-tool v-if="openDataLive[mData].active === true" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData" :toolInfo="visToolbarStatusLive"></opendata-tool>
      </div>
      <!-- <div id="social-graph">
        <div id="social-network" v-if="socialState === true && socialgraphActive !== undefined && socialgraphActive.length > 0">
          <div id="network-graph-container">
            <header>SOCAIL GRAPH</header>
            Select Peers
            <ul class="graph-peer" v-for="sg in socialgraphActive" :key="sg.key" v-bind:value="sg.key">
              <li>
                {{ sg }}
              </li>
            </ul>
            <button class="button-past" @click.prevent="setPastNetwork()">Now</button>
            <button class="button-future" @click.prevent="setFutureNetwork()">Future</button>
          </div>
        </div>
      </div>
      <div id="map-network">
        <div id="open-map" v-if="mapState === true && networkMap !== undefined && networkMap.length > 0">
          <div id="network-graph-container">
            <header>MAP</header>
            <ul  v-for="map in networkMap" :key="map.key" v-bind:value="map.key">
              <li class="map-peer">
                {{ map }}
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
    <div id="feedback-time" v-if="feedbackmessage !== 'clear'" v-bind:class="{ active: feedbackActive }">
      {{ feedbackmessage }}
    </div>
    <hsvisual v-if="liveData.data" :datacollection="liveData.data.chartPackage" :options="liveData.data.chartOptions" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData">
    </hsvisual>
  </div>
</template>

<script>
import CalendarTool from '@/components/visualise/tools/calendarTool'
import OpendataTool from '@/components/visualise/tools/knowledgeLive'
import hsvisual from '@/components/visualise/hsvisual'

export default {
  name: 'module-chartbuilder',
  components: {
    hsvisual,
    CalendarTool,
    OpendataTool
  },
  created () {
  },
  mounted () {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String
  },
  computed: {
    socialgraphActive: function () {
      return this.$store.state.lifeBoard.liveSocialGraph
    },
    networkMap: function () {
      return this.$store.state.lifeBoard.liveMapNetwork
    },
    futurecollection: function () {
      let futureData = this.$store.state.lifeBoard.liveFutureCollection
      return futureData
    },
    networkcollection: function () {
      let aggData = this.$store.state.lifeBoard.liveNetworkcollection
      return aggData
    },
    futurenetworkcollection: function () {
      let futureaggData = this.$store.state.lifeBoard.liveFutureNetworkcollection
      return futureaggData
    },
    visToolbarStatusLive: function () {
      if (this.moduleCNRL === 'start-1122335588' || this.moduleCNRL === '') {
        if (this.$store.state.toolbarVisStatus['cnrl-001234543458']) {
          return { text: 'open tools', active: true, learn: true }
        } else if (this.$store.state.toolbarVisStatus['temp-001234543458']) {
          return { text: 'open tools', active: true, learn: true }
        } else {
          return {}
        }
      } else {
        return this.$store.state.toolbarVisStatus[this.moduleCNRL][this.mData]
      }
    },
    openDataLive: function () {
      let defaultCheck = Object.keys(this.$store.state.opendataTools)
      if (!this.$store.state.opendataTools[this.moduleCNRL]) {
        if (defaultCheck[0] === 'default') {
          return this.$store.state.opendataTools['default']
        } else {
          console.log('false')
          return false
        }
      } else {
        return this.$store.state.opendataTools[this.moduleCNRL]
      }
    },
    liveData: function () {
      if (!this.$store.state.NXPexperimentData[this.shellID]) {
        return {}
      } else if (!this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]) {
        return {}
      } else {
        console.log('live data ')
        return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]
      }
    },
    feedbackmessage: function () {
      this.setFeedbackstyle(this.$store.state.feedbackMessage[this.mData])
      return this.$store.state.feedbackMessage[this.mData]
    }
  },
  data: () => ({
    timeSelect: true,
    kContext: {},
    saveStatusEK: {},
    openDataState: { 'active': true },
    feedbackActive: false,
    socialState: false,
    mapState: false,
    network:
    {
      text: 'social graph',
      active: true
    },
    mapButton:
    {
      text: 'map',
      active: true
    }
  }),
  methods: {
    chartSelect () {
      console.log('chart select type bar line mixed')
    },
    setNetworkgraph (nv) {
      this.socialState = !this.socialState
      /* let spaceContext = {}
      spaceContext.nxpCNRL = this.shellID
      spaceContext.moduleCNRL = this.moduleCNRL
      spaceContext.moduleType = this.moduleType
      spaceContext.mData = this.mData
      this.$store.dispatch('actionSocialgraph', spaceContext) */
    },
    setPastNetwork () {
      let pastContext = {}
      pastContext.shellCNRL = this.shellID
      pastContext.moduleCNRL = this.moduleCNRL
      pastContext.moduleType = this.moduleType
      pastContext.mData = this.mData
      pastContext.data = 'socailgrapharry'
      this.$store.dispatch('actionPastGraph', pastContext)
    },
    setFutureNetwork () {
      let futureContext = {}
      futureContext.shellCNRL = this.shellID
      futureContext.moduleCNRL = this.moduleCNRL
      futureContext.moduleType = this.moduleType
      futureContext.mData = this.mData
      futureContext.data = 'socialgraphlist'
      this.$store.dispatch('actionFutureGraph', futureContext)
    },
    setNetworkmap (m) {
      this.mapState = !this.mapState
      let spaceContext = {}
      spaceContext.nxpCNRL = this.shellID
      spaceContext.moduleCNRL = this.moduleCNRL
      spaceContext.moduleType = this.moduleType
      spaceContext.mData = this.mData
      this.$store.dispatch('actionMap', spaceContext)
    },
    setFeedbackstyle (message) {
      if (message !== 'clear') {
        this.feedbackActive = true
      } else {
        this.feedbackActive = false
      }
    },
    /* labelsSelect () {
      // this.liveData.data.chartOptions.legend.display = !this.liveData.data.chartOptions.legend.display
      let legendContext = {}
      legendContext.shellID = this.shellID
      legendContext.moduleCNRL = this.moduleCNRL
      legendContext.moduleType = this.moduleType
      legendContext.mData = this.mData
      this.$store.dispatch('actionLegendStatus', legendContext)
    }, */
    visToolbarUpdate () {
      let updateVisTools = {}
      updateVisTools.state = this.visToolbarStatusLive.active
      updateVisTools.module = this.moduleCNRL
      updateVisTools.dtid = this.mData
      this.$store.dispatch('actionVistoolsUpdate', updateVisTools)
    },
    openDataToolbar () {
      let updateOpendata = {}
      updateOpendata.state = this.openDataLive[this.mData].active
      updateOpendata.module = this.moduleCNRL
      updateOpendata.dtid = this.mData
      this.$store.dispatch('actionVisOpenData', updateOpendata)
    }
  }
}
</script>

<style scoped>
#vis-toolkit {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px solid purple;
}

#diy-tools {
  border: 0px solid blue; /* #E9EDF0; */
  background-color: #f0ece9; /*#E9EDF0;*/
}

#chart-type {
  display: grid;
  grid-template-columns: 4fr 1fr;
  border: 0px solid red;
}

.network-tools {
  border: 0px dashed red;
}

.context-network {
  display: block;
  padding: .4em;
  border: 0px solid pink;
}

.chart-style-tools {
  border-right: 3px solid white;
}

#feedback-time {
  font-size: 1.4em;
  background-color: yellow;
}

#network-graph-container header {
  padding-top: .6em;
}

</style>
