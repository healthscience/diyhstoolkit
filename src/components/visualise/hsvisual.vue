<template>
  <div id="visual-view">
    <div id="charts-live" v-if="datacollection !== undefined">
      <reactive class="chartholder" :chartData="datacollection" :options="options" :width="1200" :height="600"></reactive>
    </div>
  </div>
</template>

<script>
// import LineChart from '@/components/charts/LineChart'
// import BarChart from '@/components/charts/BarChart'
// import BubbleChart from '@/components/charts/BubbleChart'
import Reactive from '@/components/visualise/charts/Reactive'
// import Reactivestats from '@/components/visualise/charts/Reactivestats'
// import multiChart from '@/components/visualise/multiChart'
// const moment = require('moment')

export default {
  name: 'visual-liveview',
  components: {
    Reactive
  },
  props: {
    datacollection: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
#visual-view {
  border: 0px solid green;
}

.chartholder {
  height: inherit;
  border: 0px solid black;
}
</style>
