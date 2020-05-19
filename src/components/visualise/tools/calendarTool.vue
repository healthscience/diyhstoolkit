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
                <button id="multi-day-chart" @click.prevent="chartMultiday($event)">Multi-chart</button>
              </li>
              <li>
                <button id="single-day-chart" @click.prevent="singlechartMultiday($event)">Single-chart</button>
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
            <li v-for="tv in navTime" :key='tv' class="context-time">
              <button class="button is-primary" @click.prevent="setTimeData(tv)">{{ tv.text.word }}</button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

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
    navTime: [{ 'text': { 'word': '-day', 'number': 8460000 } }, { 'text': { 'word': '+day', 'number': 8460000 } }],
    calendarTools:
    {
      name: 'Mulit Days',
      id: 'multi-days',
      active: false
    },
    displayTime: 'today',
    calendarList: [],
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
        this.$emit('updateLearn', bTime)
      } else if (this.calendarTools.active === true) {
        this.calendarList.push(this.value)
      }
    },
    setMultidays (md) {
      this.calendarTools.active = true
    },
    clearMultidays (md) {
      this.calendarList = []
      this.makeTimeBundles = []
    },
    chartMultiday (cm) {
      // prepare list of KnowledgeBundles to visualise
      let uSeg = {}
      uSeg.chart = 'multi'
      uSeg.text = 'timeList'
      uSeg.timelist = this.calendarList
      this.$emit('updateLearn', uSeg)
    },
    singlechartMultiday (cm) {
      // prepare list of KnowledgeBundles to visualise
      let uSeg = {}
      uSeg.chart = 'single'
      uSeg.text = 'timeList'
      uSeg.timelist = this.calendarList
      this.$emit('updateLearn', uSeg)
    },
    setTimeData (seg) {
      // back and forward and time
      console.log(this.shellID)
      console.log(this.moduleCNRL)
      console.log(this.moduleType)
      console.log(this.mData)
      let contextK = {}
      contextK.shellCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.startperiod = seg.text.number
      this.$store.dispatch('actionVisUpdate', contextK)
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
