<template>
  <div id="visual-future-view">FUTURE
    <div id="diy-future-science">
      <div id="visulation-select">
        <ul>
          <li id="tool-bar">
            <header>Tools</header>
            <a class="" href="" id="toolbarholder" @click.prevent="toolsSwitch(toolbar)" v-bind:class="{ 'active': toolbar.active}">{{ toolbar.text }}</a>
          </li>
        </ul>
      </div>
      <div v-if="visChartview" id="charts-live">
        <reactive :chartData="datacollection" :options="options" :width="1200" :height="600"></reactive>
      </div>
    </div>
    <div id="time-context">
      <div id="select-time">
        <ul>
          <li v-for="tv in navTime" class="context-time">
            <button class="button is-primary" @click.prevent="setTimeData(tv)">{{ tv.text }}</button>
          </li>
        </ul>
      </div>
      <div id="view-time">
        {{ displayTime }}
      </div>
      <div id="calendar-selector">
        <date-picker v-model="value" :lang="lang"></date-picker>
      </div>
    </div>
  </div>
</template>

<script>
// import SAFEflow from '../../safeflow/safeFlow.js'
// import LineChart from '@/components/charts/LineChart'
// import BarChart from '@/components/charts/BarChart'
// import BubbleChart from '@/components/charts/BubbleChart'
import Reactive from '@/components/visualise/charts/Reactive'
import Reactivestats from '@/components/visualise/charts/Reactivestats'
import ToolbarTools from '@/components/toolbar/statisticstools'
import DatePicker from 'vue2-datepicker'
// const moment = require('moment')

export default {
  name: 'visual-future-liveview',
  components: {
    Reactive,
    Reactivestats,
    ToolbarTools,
    DatePicker
  },
  props: {
    datacollection: {
      type: Object
    },
    options: {
      type: Object
    },
    navTime: {
      type: Array
    },
    displayTime: ,
    saveExpKid:
      {
        active: false,
        text: ''
      }
  },
  data () {
    return {
      toolbar:
        {
          active: false,
          text: 'off'
        },
      toolbarData: {},
      recoveryData: {},
      datastatistics: null,
      liveChartoptions: null,
      visChartview: true,
      liveTime: '',
      timeVis: [],
      selectedExperiment: '',
      confirmAddE: '---',
      value: '',
      lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Select Date Range'
        }
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    selectVis (visIN) {
      if (visIN.id === 'vis-sc-1') {
        if (visIN.active === true) {
          this.visChartview = false
          this.vis1.active = false
        } else {
          this.vis1.active = true
          this.visChartview = true
        }
      } else if (visIN.id === 'vis-sc-2') {
        if (visIN.active === true) {
          this.visTableview = false
          this.vis2.active = false
        } else {
          this.vis2.active = true
          this.visTableview = true
        }
      } else if (visIN.id === 'vis-sc-3') {
        if (visIN.active === true) {
          this.visSimview = false
          this.vis3.active = false
        } else {
          this.vis3.active = true
          this.visSimview = true
        }
      }
      // filter what visualisation is active and setToken
      this.filterVisualisation()
    },
    filterVisualisation () {
      let visLive = []
      if (this.vis1.active === true) {
        visLive.push(this.vis1.id)
      }
      if (this.vis2.active === true) {
        visLive.push(this.vis2.id)
      }
      if (this.vis3.active === true) {
        visLive.push(this.vis3.id)
      }
    },
    toolsSwitch (ts) {
      ts.active = !ts.active
      if (ts.active === true) {
        this.toolbar.text = 'on'
        // need to add annotation to chart OPTIONS
        // this.$emit('toolsStatus', true)
      } else {
        this.toolbar.text = 'off'
        // remove the annotation from the chart OPTIONS
        // this.$emit('toolsStatus', false)
      }
    },
    recoveryStatus () {
      this.toolbar.text = 'off'
    },
    closeAvgSummary () {
      this.averageSeen = false
    },
    setTimeData (seg) {
      // back and forward and time
      this.$emit('updateLearn', seg)
    }
  }
}
</script>

<style>
#visual-future-view {
  border: 2px solid orange;
  margin: 0.01em;
  width: 98%;
  background-color: #fff6e5;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

#heart-chart {
  width: 1200px;
}

#heart-chart ul li {
  font-size: 1.1em;
}

.is-primary {
  font-size: 1.6em;
  margin-left: 12px;
}

#time-context {
  min-margin: 40px;
  text-align: center;
}

#visulation-select {
    border: 1px solid green;
    margin-left: 1em;
}

#learn-button {
  font-size: 1.6em;
  padding: .25em;
}

#learn-type {
  float: right;
}

.is-now {
  font-size: 1.6em;
  margin-left: 12px;
  color: green;
}

.is-future {
  font-size: 1.6em;
  margin-left: 12px;
  color: orange;
}

#close-average {
  float: right;
}

.science-compute {
  font-size: 1.6em;
}

#view-time {
  margin-top: 10px;
  font-size: 1.4em;
}

#add-button {
  display: inline-block;
}

#add-exp-button {
  font-size: 1.4em;
  padding-left: 8px;
  padding-right: 8px;
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
