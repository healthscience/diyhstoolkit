<template>
  <div id="k-toolkit"> toobar vis == {{ visToolbarStatusLive }}
    <button v-if="visToolbarStatusLive" type="button" class="btn" @click="visToolbarUpdate">{{ visToolbarStatusLive.text }}</button>
    <div id="diy-tools"> <!-- v-if="visToolbarStatusLive"> -->
      <div id="chart-type">
        <ul>
          <li>
            <div class="style-tools">
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
            <a href="#" id="opendata" @click.prevent="openData()">{{ openDataLive.text }}</a>
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
      console.log('vis toolbar status chart builder==')
      console.log(this.$store.state.toolbarVisStatus)
      console.log(this.moduleCNRL)
      console.log(this.mData)
      // let objectKeys = Object.keys(this.$store.state.toolbarVisStatus)
      if (this.moduleCNRL === 'start-1122335588' || this.moduleCNRL === '') {
        console.log('yes toolbar set')
        if (this.$store.state.toolbarVisStatus['cnrl-001234543458']) {
          // this.$store.state.toolbarVisStatus['cnrl-001234543458'][1].active === true
          console.log('temp toolbar')
          return { text: 'open tools', active: true, learn: true }
        } else if (this.$store.state.toolbarVisStatus['temp-001234543458']) {
          console.log('temp preview')
          // this.$store.state.toolbarVisStatus['temp-001234543458'][98889].active === true
          return { text: 'open tools', active: true, learn: true }
        } else {
          console.log('nothing')
          return {} // this.$store.state.toolbarVisStatus[this.moduleCNRL][this.mData]
        }
      } else {
        // console.log('no vis toolbar to display')
        console.log('nomraml view')
        return this.$store.state.toolbarVisStatus[this.moduleCNRL][this.mData]
      }
    },
    openDataLive: function () {
      // console.log('open data')
      // console.log(this.$store.state.opendataTools)
      // console.log(this.moduleCNRL)
      // console.log(this.mData)
      // default settings?
      let defaultCheck = Object.keys(this.$store.state.opendataTools)
      if (!this.$store.state.opendataTools[this.moduleCNRL]) {
        console.log('mod not set')
        if (defaultCheck[0] === 'default') {
          return this.$store.state.opendataTools.default
        } else {
          return false
        }
      } else {
        console.log('modules data set toobar')
        console.log(this.$store.state.opendataTools[this.moduleCNRL])
        return this.$store.state.opendataTools[this.moduleCNRL][this.mData]
      }
    },
    liveData: function () {
      console.log('live data for chart')
      console.log(this.shellID)
      console.log(this.moduleCNRL)
      console.log(this.mData)
      console.log(this.$store.state.NXPexperimentData[this.shellID])
      if (!this.$store.state.NXPexperimentData[this.shellID]) {
        console.log('no live data for this experiment')
        return {}
      } else if (!this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]) {
        console.log('no live data for this device placer')
        return {}
      } else {
        console.log('chart vue')
        console.log(this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData])
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
