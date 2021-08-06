<template>
  <div id="k-toolkit"> toobar vis == {{ visToolbarStatusLive }}
    <button v-if="visToolbarStatusLive" type="button" class="btn" @click="visToolbarUpdate"></button> <!-- visToolbarStatusLive.text  -->
    <div id="diy-tools"> <!-- v-if="visToolbarStatusLive"> -->
      <div id="chart-type">
        <ul>
          <li>
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
            </div>
          <li>
            <calendar-tool :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></calendar-tool>
          </li>
          <li> opendata == {{ openDataLive }}
            <a href="#" id="opendata" @click.prevent="openData()">Open</a> <!-- state.nxpProgress -->
          </li>
        </ul>
      </div>
      <div v-if="openDataLive" id="open-knowledge">
        <opendata-tool v-if="openDataLive.active === true" :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData" :toolInfo="visToolbarStatusLive"></opendata-tool>
      </div>
    </div> <!-- live data -- {{ liveData }} -->
    <hsvisual v-if="liveData.data" :datacollection="liveData.data.chartPackage" :options="liveData.data.chartOptions"></hsvisual>
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
    visToolbarStatusLive: function () {
      if (this.moduleCNRL === 'start-1122335588' || this.moduleCNRL === '') {
        // console.log('yes toolbar set')
        if (this.$store.state.toolbarVisStatus['cnrl-001234543458']) {
          return { text: 'open tools', active: true, learn: true }
        } else if (this.$store.state.toolbarVisStatus['temp-001234543458']) {
          return { text: 'open tools', active: true, learn: true }
        } else {
          return {} // this.$store.state.toolbarVisStatus[this.moduleCNRL][this.mData]
        }
      } else {
        // console.log('no vis toolbar to display')
        return this.$store.state.toolbarVisStatus[this.moduleCNRL][this.mData]
      }
    },
    openDataLive: function () {
      // default settings?
      let defaultCheck = Object.keys(this.$store.state.opendataTools)
      if (!this.$store.state.opendataTools[this.moduleCNRL]) {
        // console.log('mod not set')
        if (defaultCheck[0] === 'default') {
          return this.$store.state.opendataTools.default
        } else {
          return false
        }
      } else {
        // console.log('modules data set toobar')
        // console.log(this.$store.state.opendataTools[this.moduleCNRL])
        return this.$store.state.opendataTools[this.moduleCNRL][this.mData]
      }
    },
    liveData: function () {
      if (!this.$store.state.NXPexperimentData[this.shellID]) {
        return {}
      } else if (!this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]) {
        return {}
      } else {
        return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]
      }
    }
  },
  data: () => ({
    timeSelect: true,
    kContext: {},
    saveStatusEK: {},
    openDataState: { 'active': true }
  }),
  methods: {
    chartSelect () {
      console.log('chart select type bar line mixed')
    },
    visToolbarUpdate () {
      let updateVisTools = {}
      updateVisTools.state = this.visToolbarStatusLive.active
      updateVisTools.module = this.moduleCNRL
      updateVisTools.dtid = this.mData
      this.$store.dispatch('actionVistoolsUpdate', updateVisTools)
    },
    openData (od) {
      let updateOpendata = {}
      updateOpendata.state = this.openDataLive.active
      updateOpendata.module = this.moduleCNRL
      updateOpendata.dtid = this.mData
      this.$store.dispatch('actionVisOpenData', updateOpendata)
    }
  }
}
</script>

<style>
#k-toolkit {
  border: 0px solid red;
}

#diy-tools {
  border: 1px solid #E9EDF0;
  background-color: #f0ece9; /*#E9EDF0;*/
}

.chart-style-tools {
  border-right: 3px solid white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
