<template>
  <div id="k-toolkit">
    <div id="diy-tools" v-if="toolbarStatusLive.active">
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
              <li>
                <button @click.prevent="chartSelect()">Tools</button>
              </li>
            </div>
          <li>
            <calendar-tool :shellID="shellID" :moduleCNRL="moduleCNRL" :moduleType="moduleType" :mData="mData"></calendar-tool>
          </li>
        </ul>
      </div>
    </div>
    <hsvisual :datacollection="liveData.chartPackage" :options="liveData.chartOptions" ></hsvisual>
  </div>
</template>

<script>
import CalendarTool from '@/components/visualise/tools/calendarTool'
import hsvisual from '@/components/visualise/hsvisual'
// import hsfuturevisual from '@/components/visualise/hsfuturevisual'

export default {
  name: 'module-visualise',
  components: {
    hsvisual,
    CalendarTool
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
    toolbarStatusLive: function () {
      return this.$store.state.toolbarStatus[this.moduleCNRL]
    },
    liveData: function () {
      return this.$store.state.NXPexperimentData[this.shellID][this.moduleCNRL].data[this.mData]
    }
  },
  data: () => ({
    timeSelect: true,
    kContext: {},
    saveStatusEK: {}
  }),
  methods: {
    chartSelect () {
      console.log('chart select type bar line mixed')
    }
  }
}
</script>

<style>
#k-toolkit {
  border: 0px solid red;
  height: 100%;
  overflow: hidden;
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
