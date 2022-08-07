<template>
  <div class="timeline" id="live-timeline">
    TIME LINE COMING SOON
    <date-picker v-model="value" @change="calendarSelect($event)" :lang="lang" :open="true"></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
// import 'vue2-datepicker/index.css'
// const moment = require('moment')

export default {
  name: 'LiveTimeline',
  components: {
    DatePicker
  },
  created () {
    this.open = true
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
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
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
