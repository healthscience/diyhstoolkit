<template>
  <div id="time-context">
    <div id="calendar-selector">
      <date-picker v-model="calendarvalue" @change="calendarSelect($event)" :lang="lang" :range="rangeActive === true" ></date-picker>
      <div id="time-calendar-tools">
        <ul>
          <li>
            <select v-model="selectedTimeBundle" @change.prevent="setTimeBundle()">
              <option v-for="tb in optionTimeBundle" :key='tb.id' v-bind:value="tb.value" :selected="tb.value == selectedTimeBundle">
              {{ tb.text }}
              </option>
            </select>
          </li>
          <li>
            <button id="multi-day-clear" @click.prevent="clearMultidays($event)">Clear</button>
          </li>
          <li>
            <div id="select-time">
              <ul>
                <li v-for="tv in navTime" :key='tv.id' class="context-time">
                  <button class="button is-primary" @click.prevent="setTimeData(tv)">{{ tv.text.word }}</button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div id="calendar-list-view" >
        <ul>
          <li class="time-m-list" v-for="datesl in calendarList" :key='datesl.id' >
            {{ datesl }}
          </li>
        </ul>
      </div>
    </div>
    <div id="chart-options">
      <ul class="chart-update">
        <li>
          <select v-model="selectedTimeFormat" @change.prevent="setTimeFormat()">
            <option v-for="tfoption in timeformatoptions" v-bind:value="tfoption.value" :key='tfoption.id' :selected="tfoption.value == selectedChartnumber">
            {{ tfoption.text }}
            </option>
          </select>
        </li>
      </ul>
    </div>
    <div id="calendar-tools">
      <ul>
        <li>
          <button id="update-chart" @click.prevent="updateKbundle($event)">Update</button>
        </li>
      </ul>
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
      return this.$store.state.setTimerange
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
    calendarTools:
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
      { text: 'Range days', value: 'range', id: 2 }
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
    calendarSelect () {
      if (this.calendarTools.active !== true && this.rangeActive !== true) {
        console.log('timeLogic1')
        // convert to correct time format and update KBundle and build new visStyle
        let bTime = {}
        bTime.selectDate = this.calendarvalue
        bTime.text = 'selectd'
        let numberTimeformat = moment(this.calendarvalue).valueOf()
        this.$store.dispatch('singleDateUpdate', numberTimeformat)
        this.calendarListMS = []
        this.calendarListMS.push(numberTimeformat)
        this.$store.dispatch('actionSetTimerange', this.calendarListMS)
      } else if (this.rangeActive === true) {
        // reset the timeholder
        console.log('timeLogic2')
        this.calendarListMS = []
        let rangeSelected = moment.range(this.calendarvalue[0], this.calendarvalue[1])
        let segText = 'days'
        let sourceRangeTimes = Array.from(rangeSelected.by(segText))
        // loop over range and build date range format
        for (let dr of sourceRangeTimes) {
          this.calendarListMS.push(moment(dr).valueOf())
        }
        // set time range in store so other toolbars have access
        this.$store.dispatch('actionSetTimerange', this.calendarListMS)
      } else if (this.calendarTools.active === true) {
        console.log('timeLogic3')
        let formatTimeDisplay = moment(this.calendarvalue).format('LLll')
        this.calendarList.push(formatTimeDisplay)
        this.calendarListMS.push(moment(this.calendarvalue).valueOf())
        // set time range in store so other toolbars have access
        this.$store.dispatch('actionSetTimerange', this.calendarListMS)
      }
    },
    setTimeBundle () {
      // console.log('time bundle select format')
      // console.log(this.selectedTimeBundle)
      if (this.selectedTimeBundle === 'range') {
        this.rangeActive = !this.rangeActive
        this.calendarTools.active = false
      } else if (this.selectedTimeBundle === 'multi') {
        this.calendarTools.active = !this.calendarTools.active
        this.rangeActive = false
      } else {
        this.calendarTools.active = false
        this.rangeActive = false
      }
    },
    clearMultidays (md) {
      this.calendarList = []
      this.calendarListMS = []
      this.makeTimeBundles = []
      // this.calendarTools.active = false
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
      contextK.rangechange = this.timeRange
      // contextK.singlechart = true
      contextK.singlechart = this.selectedChartnumber
      contextK.timeformat = this.selectedTimeFormat
      /*
      contextK.opendata = 'updated'
      contextK.startperiod = this.calendarDate
      */
      // check that time is selected
      if (contextK.rangechange.length === 0) {
        console.log('no time present, prompt peer2')
      } else {
        this.$store.dispatch('actionVisUpdate', contextK)
      }
    },
    setTimeData (seg) {
      // first clear the range of existing
      this.$store.dispatch('actionSetTimerange', [])
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
    setTimeFormat () {
      // set in store so open data can pick up setting
      this.$store.dispatch('actionSetTimeFormat', this.selectedTimeFormat)
    },
    setChartNumber () {
    },
    setFuture () {
      let buildContext = {}
      buildContext.future = this.selectedFuture
      let refContracts = {}
      refContracts.shellCNRL = this.shellID
      refContracts.moduleCNRL = this.moduleCNRL
      refContracts.moduleType = this.moduleType
      refContracts.mData = this.mData
      buildContext.refs = refContracts
      this.$store.dispatch('actionFuture', buildContext)
    }
  }
}
</script>

<style>
#calendar-selector {
  display: inline-block;
  height: auto;
  border: 0px solid red;
}

#time-context {
  min-margin: 40px;
  text-align: center;
  border: 0px solid pink;
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
  display: inline-block;
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
  display: inline;
  margin: 1.2em;
}

#calendar-list-view {
  display: inline;
}

#chart-options {
  display: inline;
}
</style>
