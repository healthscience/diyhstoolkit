<template>
  <div id="time-context">
    <ul>
      <li>
        <div id="calendar-selector">
          <date-picker v-model="value" @change="calendarSelect($event)" :lang="lang"></date-picker>
          <div id="time-calendar-tools">
            <button id="multi-days" @click.prevent="setMultidays($event)">{{ calendarTools.name }}</button> {{ calendarTools.active }}
          </div>
          <div id="calendar-list-view" >
             <ul>
              <li>
                <ul>
                  <li v-for="datesl in calendarList" :key='datesl' class="time-m-list">
                    {{ datesl }}
                  </li>
                </ul>
              </li>
              <li>
                <button id="multi-day-chart" @click.prevent="chartMultiday($event)">Many-charts</button>
              </li>
              <li>
                <button id="single-day-chart" @click.prevent="singleChartday($event)">Single-chart</button>
              </li>
              <li>
                <button id="multi-day-clear" @click.prevent="clearMultidays($event)">Clear</button>
              </li>
            </ul>
          </div>
        </div>
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
      <li class="context-future">
        <!-- <button class="button is-primary" @click.prevent="setFuture('future')">{{ future.text }}</button> -->
        <select v-model="selectedFuture" @change.prevent="setFuture()">
          <option disabled value="">How to make future</option>
          <option v-for="foption in futureoptions" v-bind:value="foption.value" :key='foption.value'>
              {{ foption.text }}
            </option>
        </select>
        <!-- <span>Selected: {{ selectedFuture }}</span> -->
      </li>
      <li class="context-network">
        <button class="button is-primary" @click.prevent="setNetwork('networkview')">{{ network.text }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
const moment = require('moment')

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
  data: () => ({
    toolbar:
    {
      active: false,
      text: 'off'
    },
    navTime: [{ 'text': { 'word': '-day', 'number': -86400000 } }, { 'text': { 'word': '+day', 'number': 86400000 } }],
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
    futureoptions: [
      { text: 'Repeat day', value: 'month' },
      { text: 'Self decide', value: 'self' },
      { text: 'Ask CALE', value: 'CALE' }
    ],
    selectedFuture: '',
    calendarList: [],
    calendarListMS: [],
    time1: '',
    time2: '',
    time3: '',
    // custom lang
    value: '',
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
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    calendarSelect () {
      if (this.calendarTools.active !== true) {
        // convert to correct time format and update KBundle and build new visStyle
        let bTime = {}
        bTime.selectDate = this.value
        bTime.text = 'selectd'
        this.$store.dispatch('singleDateUpdate', moment(this.value).valueOf())
      } else if (this.calendarTools.active === true) {
        this.calendarList.push(this.value)
        this.calendarListMS.push(moment(this.value).valueOf())
      }
    },
    setMultidays (md) {
      this.calendarTools.active = true
    },
    clearMultidays (md) {
      this.calendarList = []
      this.calendarListMS = []
      this.makeTimeBundles = []
      this.calendarTools.active = false
    },
    chartMultiday (cm) {
      // prepare list of KnowledgeBundles to visualise
      // if single day selected use calendar list
      let timeRange = []
      if (this.calendarListMS.length === 0) {
        timeRange.push(moment(this.value).valueOf())
      } else {
        timeRange = this.calendarListMS
      }
      let contextK = {}
      contextK.nxpCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.startperiod = 0
      contextK.startperiodchange = 0
      contextK.rangechange = timeRange
      contextK.singlechart = false
      this.$store.dispatch('actionVisUpdate', contextK)
    },
    singleChartday (cm) {
      // prepare update for safeFLOW
      let contextK = {}
      contextK.nxpCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.startperiod = moment(this.value).valueOf()
      contextK.startperiodchange = 0
      contextK.rangechange = this.calendarListMS
      contextK.singlechart = true
      this.$store.dispatch('actionVisUpdate', contextK)
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
      contextK.rangechange = []
      this.$store.dispatch('actionVisUpdate', contextK)
    },
    setFuture () {
      console.log('make future?')
      let buildContext = {}
      buildContext.future = this.selectedFuture
      let refContracts = {}
      refContracts.shellCNRL = this.shellID
      refContracts.moduleCNRL = this.moduleCNRL
      refContracts.moduleType = this.moduleType
      refContracts.mData = this.mData
      buildContext.refs = refContracts
      console.log(buildContext)
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
  height: auto;
  border: 1px solid red;
}

#time-context {
  min-margin: 40px;
  text-align: center;
  border: 1px solid pink;
}

#view-time {
  margin-top: 10px;
  font-size: 1.4em;
}

#time-calendar-tools {
  display: inline-block;
}

.time-m-list {
  display: block;
  border: 1px solid purple;
}

</style>
