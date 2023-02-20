<template>
  <div id="time-context">
    <div id="time-control-update">
      <div id="time-options" class="series-style">
        <div id="calendar-selector">
          <date-picker class="select-caldate" v-model="calendarvalue" @change="calendarSelect()" :lang="lang" :range="rangeActive === true" ></date-picker>
          <div id="time-calendar-tools">
            <div class="time-tools" id="select-range-type">
              <select v-model="selectedTimeBundle" @change.prevent="setTimeBundle()">
                <option v-for="tb in optionTimeBundle" :key='tb.id' v-bind:value="tb.value" :selected="tb.value == selectedTimeBundle">
                {{ tb.text }}
                </option>
              </select>
            </div>
            <div class="time-tools">
              <button id="multi-day-clear" @click.prevent="clearMultidays($event)">Clear</button>
            </div>
            <div class="time-tools">
              <div id="select-time">
                <div v-for="tv in navTime" :key='tv.id' class="context-time">
                  <button class="button is-primary" @click.prevent="setShiftTimeData(tv)">{{ tv.text.word }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="calendar-list-view" >
          <div class="time-m-list" v-for="datesl in calendarList" :key='datesl.id' >
            {{ datesl }}
          </div>
        </div>
      </div>
      <div class="series-style">
        <div id="chart-options">
          <div class="chart-update">
            <select v-model="selectedTimeFormat" @change.prevent="setTimeFormat()">
              <option v-for="tfoption in timeformatoptions" v-bind:value="tfoption.value" :key='tfoption.id' :selected="tfoption.value == selectedChartnumber">
              {{ tfoption.text }}
              </option>
            </select>
          </div>
          <div>
            <button @click.prevent="labelsSelect()">Labels</button>
          </div>
        </div>
      </div>
    </div>
    <div id="calendar-tools">
      <button id="update-chart" @click.prevent="updateKbundle($event)">Update</button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
// import { extendMoment } from 'moment-range'
// const moment = require('moment')
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

export default {
  name: 'calendar-tool',
  components: {
    DatePicker
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String
  },
  computed: {
    timeRange: function () {
      return this.$store.state.setTimerange[this.mData]
    },
    activeComputeContract: function () {
      let modulesMatch = this.$store.state.experimentStatus[this.shellID].modules
      let computeContract = {}
      for (let modC of modulesMatch) {
        if (modC.value.type === 'compute') {
          computeContract = modC
        }
      }
      // set default last time set
      // console.log('compute calandar tools')
      // console.log(computeContract.value.info.controls)
      // this.setDefaultTime(computeContract.value.info.controls.rangedate)
      return computeContract.value.info.compute
    }
  },
  created () {
  },
  mounted () {
  },
  data: () => ({
    toolbar:
    {
      active: false,
      text: 'off'
    },
    navTime: [{ 'text': { 'word': '-day', 'number': -86400000 } }, { 'text': { 'word': '+day', 'number': 86400000 } }],
    calendarRangeTools:
    {
      name: 'Range',
      id: 'range-days',
      active: false
    },
    calendarToolMulti:
    {
      name: 'Mulit Days',
      id: 'multi-days',
      active: false
    },
    displayTime: 'today',
    future:
    {
      text: 'future',
      active: true
    },
    timeformatoptions: [
      { text: 'Time series', value: 'timeseries', id: 0 },
      { text: 'Overlay', value: 'overlay', id: 1 }
    ],
    selectedTimeFormat: 'timeseries',
    selectedChartnumber: 'singlechart',
    calendarList: [],
    calendarListMS: [],
    optionTimeBundle: [
      { text: 'Single day', value: 'single', id: 0 },
      { text: 'Pick days', value: 'multi', id: 1 },
      { text: 'Range days', value: 'range', id: 2 },
      { text: 'Ask BB', value: 'natlang', id: 3 }
    ],
    selectedTimeBundle: 'single',
    time1: '',
    time2: '',
    time3: '',
    // custom lang
    calendarvalue: '',
    rangeActive: false,
    lang: {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
      placeholder: {
        date: 'Select Date',
        dateRange: 'Select Date Range'
      }
    },
    // custom range shortcuts
    shortcuts: [
      {
        text: 'Today',
        onClick: () => {
          this.time3 = [ new Date(), new Date() ]
        }
      }
    ],
    timePickerOptions: {
      start: '00:00',
      step: '00:30',
      end: '23:30'
    }
  }),
  methods: {
    setDefaultTime (dtime) {
      this.calendarvalue = dtime
    },
    calendarSelect () {
      // clear feedback if required
      let feedbackTime = {}
      feedbackTime.device = this.mData
      feedbackTime.message = 'clear'
      feedbackTime.active = false
      this.$store.dispatch('actionFeeback', feedbackTime)
      if (this.calendarToolMulti.active !== true && this.rangeActive !== true) {
        // convert to correct time format and update KBundle and build new visStyle
        let bTime = {}
        bTime.selectDate = this.calendarvalue
        bTime.text = 'selectd'
        let numberTimeformat = moment(this.calendarvalue).valueOf()
        this.$store.dispatch('singleDateUpdate', numberTimeformat)
        this.calendarListMS = []
        this.calendarListMS.push(numberTimeformat)
        let timeContext = {}
        timeContext.device = this.mData
        timeContext.timerange = this.calendarListMS
        this.$store.dispatch('actionSetTimerange', timeContext)
      } else if (this.rangeActive === true) {
        // reset the timeholder
        this.calendarListMS = []
        let rangeSelected = moment.range(this.calendarvalue[0], this.calendarvalue[1])
        let segText = 'days'
        let sourceRangeTimes = Array.from(rangeSelected.by(segText))
        // loop over range and build date range format
        for (let dr of sourceRangeTimes) {
          this.calendarListMS.push(moment(dr).valueOf())
        }
        // set time range in store so other toolbars have access
        let timeContext = {}
        timeContext.device = this.mData
        timeContext.timerange = this.calendarListMS
        this.$store.dispatch('actionSetTimerange', timeContext)
      } else if (this.calendarToolMulti.active === true) {
        let formatTimeDisplay = moment(this.calendarvalue).format('LLll')
        this.calendarList.push(formatTimeDisplay)
        this.calendarListMS.push(moment(this.calendarvalue).valueOf())
        // set time range in store so other toolbars have access
        let timeContext = {}
        timeContext.device = this.mData
        timeContext.timerange = this.calendarListMS
        this.$store.dispatch('actionSetTimerange', timeContext)
      }
    },
    setTimeBundle () {
      // console.log('time bundle select format')
      if (this.selectedTimeBundle === 'range') {
        this.rangeActive = !this.rangeActive
        this.calendarToolMulti.active = false
      } else if (this.selectedTimeBundle === 'multi') {
        // clear the timerange for this device
        // set time range in store so other toolbars have access
        this.calendarListMS = []
        let timeContext = {}
        timeContext.device = this.mData
        timeContext.timerange = []
        this.$store.dispatch('actionSetTimerange', timeContext)
        this.calendarToolMulti.active = !this.calendarToolMulti.active
        this.rangeActive = false
      } else if (this.selectedTimeBundle === 'natlang') {
        // natural language ask CALE
        this.$store.dispatch('actionAskBB', 'askBB')
      } else {
        this.calendarToolMulti.active = false
        this.rangeActive = false
      }
    },
    clearMultidays (md) {
      this.calendarList = []
      this.calendarListMS = []
      this.makeTimeBundles = []
    },
    setTimeFormat () {
      // set in store so open data can pick up setting
      this.$store.dispatch('actionSetTimeFormat', this.selectedTimeFormat)
    },
    setShiftTimeData (seg) {
      // first clear the range of existing
      let timeContext = {}
      timeContext.device = this.mData
      timeContext.timerange = []
      this.$store.dispatch('actionSetTimerange', timeContext)
      // back and forward and time
      let contextK = {}
      contextK.nxpCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.startperiodchange = seg.text.number
      contextK.startperiod = 0
      contextK.rangechange = [] // this.timeRange
      // check that time is selected
      if (contextK.startperiod !== 0) {
        console.log('no time present, prompt peer1')
      } else {
        this.$store.dispatch('actionVisUpdate', contextK)
      }
    },
    labelsSelect () {
      // this.liveData.data.chartOptions.legend.display = !this.liveData.data.chartOptions.legend.display
      let legendContext = {}
      legendContext.shellID = this.shellID
      legendContext.moduleCNRL = this.moduleCNRL
      legendContext.moduleType = this.moduleType
      legendContext.mData = this.mData
      this.$store.dispatch('actionLegendStatus', legendContext)
    },
    updateKbundle (cm) {
      // prepare update for safeFLOW
      let contextK = {}
      contextK.nxpCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.startperiod = moment(this.calendarvalue).valueOf()
      contextK.startperiodchange = 0
      let rangeSet = []
      if (this.timeRange === undefined) {
        rangeSet = []
      } else {
        rangeSet = this.timeRange
      }
      contextK.rangechange = rangeSet
      // contextK.singlechart = true
      contextK.singlechart = this.selectedChartnumber
      contextK.timeformat = this.selectedTimeFormat
      // check that time is selected
      if (contextK.rangechange.length === undefined || contextK.rangechange.length === 0) {
        console.log('no time present, prompt peer2')
        let feedbackDevice = {}
        feedbackDevice.device = this.mData
        feedbackDevice.message = 'please select a date'
        this.$store.dispatch('actionFeeback', feedbackDevice)
      } else {
        this.$store.dispatch('actionVisUpdate', contextK)
      }
    }
  }
}
</script>

<style>
#time-context {
  display: grid;
  grid-template-columns: 5fr 1fr;
  border: 0px solid pink;
}

#time-control-update {
  display: grid;
  grid-template-columns: 4fr 1fr;
  border: 0px solid black;
}

#calendar-selector {
  display: grid;
  grid-template-columns: 8fr 2fr 1fr;
}

.select-caldate {
  min-width: 340px;
}

.time-tools {
  border: 0px solid blue;
}

#select-range-type {
  margin-top: .2em;
  margin-left: .5em;
  margin-right: .5em;
  margin-bottom: 0.5em;
}

.context-time {
  display: inline-block;
  margin: 0em;
}

#view-time {
  margin-top: 10px;
  font-size: 1.4em;
}

#calendar-tools {
  display: inline-block;
  padding: 0.4em;
  border: 2px solid white;
}

#time-calendar-tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#select-time {
  border: 0px solid orange;
}

.time-m-list {
  display: block;
  text-align: left;
  border: 0px solid purple;
}

#update-chart {
  font-size: 1.4em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 12px 28px;
  text-align: center;
}

.chart-update {
  margin-top: .1em;
  margin-bottom: .5em;
}

#calendar-list-view {
  display: inline;
}

#chart-options {
  border: 0px solid green;
}
</style>
