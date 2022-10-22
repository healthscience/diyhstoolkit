<template>
  <div id="time-context">
    <ul>
      <li>
        <!-- <div id="calendar-selector">
          <date-picker v-model="calendarvalue" @change="calendarSelect($event)" :lang="lang" :range="rangeActive === true" ></date-picker>
          <div id="time-calendar-tools">
            <ul>
              <li>
                <button id="range-days" @click.prevent="setRangedays($event)">
                {{ calendarRangeTools.name }}</button> {{ calendarRangeTools.active }}
              </li>
              <li>
                <button id="multi-days" @click.prevent="setMultidays($event)">
                {{ calendarTools.name }}</button> {{ calendarTools.active }}
              </li>
              <li>
                <button id="multi-day-clear" @click.prevent="clearMultidays($event)">Clear</button>
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
        </div> -->
        <div id="calendar-tools">
          <ul>
            <li>
              <ul class="chart-update">
                <li>
                  <select v-model="selectedTimeFormat" @change.prevent="setTimeFormat()">
                    <option v-for="tfoption in timeformatoptions" v-bind:value="tfoption.value" :key='tfoption.id' :selected="tfoption.value == selectedChartnumber">
                    {{ tfoption.text }}
                    </option>
                  </select>
                </li>
                <li>
                  <select v-model="selectedChartnumber" @change.prevent="setChartNumber()">
                    <option v-for="cnoption in numbechartoptions" v-bind:value="cnoption.value" :key='cnoption.id' :selected="cnoption.id === selectedChartnumber">
                    {{ cnoption.text }}
                    </option>
                  </select>
                </li>
              </ul>
            </li>
            <li>
              <button id="update-chart" @click.prevent="singleChartday($event)">Chart</button>
            </li>
          </ul>
        <li>
          <div id="select-time">
            <ul>
              <li v-for="tv in navTime" :key='tv.id' class="context-time">
                <button class="button is-primary" @click.prevent="setTimeData(tv)">{{ tv.text.word }}</button>
              </li>
            </ul>
          </div>
        </li>
        <li class="context-future">
          <!-- <button class="button is-primary" @click.prevent="setFuture('future')">{{ future.text }}</button> -->
          <select v-model="selectedFuture" @change.prevent="setFuture()">
            <option disabled value="">How to make future</option>
            <option v-for="foption in futureoptions" :key='foption.value'>
                {{ foption.text }}
              </option>
          </select>
          <!-- <span>Selected: {{ selectedFuture }}</span> -->
        </li>
        <li class="context-network">
          <button class="button is-primary" @click.prevent="setNetwork('networkview')">{{ network.text }}</button>
        </li>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
// import { extendMoment } from 'moment-range'
// const moment = require('moment')
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

export default {
  name: 'calendar-tool',
  components: {
    // DatePicker
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
    network:
    {
      text: 'network',
      active: true
    },
    timeformatoptions: [
      { text: 'Time series', value: 'timeseries', id: 0 },
      { text: 'Overlay', value: 'overlay', id: 1 }
    ],
    numbechartoptions: [
      { text: 'Single', value: 'singlechart', id: 0 },
      { text: 'Multiple', value: 'multiplechart', id: 1 }
    ],
    futureoptions: [
      { text: 'Repeat day', value: 'month' },
      { text: 'Self decide', value: 'self' },
      { text: 'Ask CALE', value: 'CALE' }
    ],
    selectedTimeFormat: 'timeseries',
    selectedChartnumber: 'singlechart',
    selectedFuture: '',
    calendarList: [],
    calendarListMS: [],
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
      console.log('calenar value chosen')
      if (this.calendarTools.active !== true && this.calendarRangeTools.active !== true) {
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
      } else if (this.calendarRangeTools.active === true) {
        // reset the timeholder
        this.calendarListMS = []
        let rangeSelected = moment.range(this.calendarvalue[0], this.calendarvalue[1])
        let segText = 'days'
        let sourceRangeTimes = Array.from(rangeSelected.by(segText))
        // loop over range and build date range format
        for (let dr of sourceRangeTimes) {
          this.calendarListMS.push(moment(dr).valueOf())
        }
      } else if (this.calendarTools.active === true) {
        this.calendarList.push(this.calendarvalue)
        this.calendarListMS.push(moment(this.calendarvalue).valueOf())
      }
      // set time range in store so other toolbars have access
      let timeContext = {}
      timeContext.device = this.mData
      timeContext.timerange = this.calendarListMS
      this.$store.dispatch('actionSetTimerange', timeContext)
    },
    setRangedays (md) {
      this.rangeActive = !this.rangeActive
      this.calendarRangeTools.active = !this.calendarRangeTools.active
      if (this.calendarRangeTools.active === false) {
        // set store value to empty
        this.calendarListMS = []
        let timeContext = {}
        timeContext.device = this.mData
        timeContext.timerange = this.calendarListMS
        this.$store.dispatch('actionClearTimerange', timeContext)
      }
    },
    setTimerangeStart (timerange) {
      let timeContext = {}
      timeContext.device = this.mData
      timeContext.timerange = timerange
      this.$store.dispatch('actionSetTimerange', timeContext)
    },
    setMultidays (md) {
      this.calendarTools.active = !this.calendarTools.active
    },
    clearMultidays (md) {
      this.calendarList = []
      this.calendarListMS = []
      this.makeTimeBundles = []
      this.calendarTools.active = false
    },
    singleChartday (cm) {
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
      // check that time is selected
      if (contextK.rangechange.length === 0) {
        console.log('no time present, prompt peer2')
      } else {
        this.$store.dispatch('actionVisUpdate', contextK)
      }
    },
    setTimeData (seg) {
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
        console.log('plus or minus one day')
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
    },
    setNetwork (nv) {
      console.log('is a network visualisation available?')
      console.log(nv)
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
  border: 1px solid purple;
}

#update-chart {
  font-size: 1.4em;
}

.chart-update {
  margin: 1.2em;
}
</style>
