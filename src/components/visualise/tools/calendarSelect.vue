<template>
  <div id="time-context">
    <ul>
      <li>
        <div id="calendar-selector-list">
          <date-picker v-model="value" @change="calendarSelect($event)" :lang="lang"></date-picker>
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
      // set time selected
      console.log('calendard set')
      let bTime = {}
      bTime.selectDate = this.value
      bTime.text = 'data-start'
      this.$store.dispatch('actionCalendarDate', bTime)
    },
    setTimeData (seg) {
      // back and forward and time
      let contextK = {}
      contextK.shellCNRL = this.shellID
      contextK.moduleCNRL = this.moduleCNRL
      contextK.moduleType = this.moduleType
      contextK.mData = this.mData
      contextK.startperiodchange = seg.text.number
      contextK.startperiod = 0
      contextK.rangechange = []
      this.$store.dispatch('actionVisUpdate', contextK)
    }
  }
}
</script>

<style>
#calendar-selector-list {
  height: auto;
  border: 0px solid red;
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
