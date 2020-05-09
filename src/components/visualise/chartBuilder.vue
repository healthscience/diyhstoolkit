<template>
  <div id="k-toolkit">
    Charts: {{ mData }}
    <div id="chart-type">
      <ul>
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
      </ul>
    </div>
    <hsvisual :datacollection="liveData.chartPackage" :options="liveData.chartOptions" ></hsvisual>
    <!--:displayTime="liveData.TimeV" :navTime="liveData.NavTime" :makeTimeBundles="liveData.buildTimeBundles" -->
    <!-- <div id="add-experiment">
      <div v-if="timeSelect" id="time-select" >
        <div id="start-point" class="context-selecttime">Start: {{ kContext.analysisStart }}</div>
        <div id="end-point" class="context-selecttime">End: {{ kContext.analysisEnd }}</div>
      </div>
      <div id="save-component">
          <button @click.prevent="startStatusSave()">SAVE</button>
          <transition name="fade" >
            <div v-if="saveStatusEK.active === true" id="confirm-add-experiment">{{ saveStatusEK.text }}</div>
          </transition>
      </div>
    </div> -->
  </div>
</template>

<script>
import hsvisual from '@/components/visualise/hsvisual'
// import hsfuturevisual from '@/components/visualise/hsfuturevisual'

export default {
  name: 'module-visualise',
  components: {
    hsvisual
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
    liveData: function () {
      return this.$store.state.NXPexperimentData[this.shellID].modules[this.moduleCNRL].data[this.mData]
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
</style>
