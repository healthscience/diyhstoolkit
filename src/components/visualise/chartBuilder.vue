<template>
  <div id="k-toolkit">
    <button v-if="visToolbarStatusLive" type="button" class="btn" @click="visToolbarUpdate">{{ visToolbarStatusLive.text }}</button>
    <div id="diy-tools" v-if="visToolbarStatusLive.active">
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
          <li>
            <a href="#" id="opendata" @click.prevent="openData()">{{ openDataLive.text }}</a>
          </li>
        </ul>
      </div>
      <div v-if="openDataLive.active === true" id="open-knowledge">
        <opendata-tool :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></opendata-tool>
      </div>
    </div>
    <hsvisual :datacollection="liveData.chartPackage" :options="liveData.chartOptions" ></hsvisual>
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
      // console.log('visToolbarstatuslive')
      // console.log(this.$store.state.toolbarVisStatus)
      // console.log(this.moduleCNRL)
      // console.log(this.mData)
      let objectKeys = Object.keys(this.$store.state.toolbarVisStatus)
      if (objectKeys.length === 0) {
        return 'notset'
      } else {
        return this.$store.state.toolbarVisStatus[this.moduleCNRL][this.mData]
      }
    },
    openDataLive: function () {
      if (this.$store.state.opendataTools === undefined) {
        return {}
      } else {
        return this.$store.state.opendataTools[this.moduleCNRL][this.mData]
      }
    },
    liveData: function () {
      console.log('chart builder')
      console.log(this.$store.state.NXPexperimentData[this.shellID])
      if (!this.$store.state.NXPexperimentData[this.shellID]) {
        return {}
      } else {
        return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData].data
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
  height: 100%;
  overflow: visible;
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
