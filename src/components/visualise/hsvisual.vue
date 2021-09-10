<template>
  <div id="visual-view">
    <div id="visual-container">
      <div id="charts-live" v-if="datacollection !== undefined">
        <reactive class="chartholder" :chartData="datacollection" :options="options" :width="1200" :height="600"></reactive>
      </div>
      <div id="future-tools">
        <ul>
          <li>
            <select v-model="selectedChartnumber" @change.prevent="setChartNumber()">
              <option v-for="cnoption in numbechartoptions" v-bind:value="cnoption.value" :key='cnoption.id' :selected="cnoption.id === selectedChartnumber">
              {{ cnoption.text }}
              </option>
            </select>
          </li>
          <li class="context-future">
            <!-- <button class="button is-primary" @click.prevent="setFuture('future')">{{ future.text }}</button> -->
            <select v-model="selectedFuture" @change.prevent="setFuture()">
              <option disabled value="">make future</option>
              <option v-for="foption in futureoptions" :key='foption.value'>
                  {{ foption.text }}
                </option>
            </select>
            <!-- <span>Selected: {{ selectedFuture }}</span> -->
          </li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
    <div id="social-graph">
      <header>Socialgraph</header>
      <ul>
        <li class="context-network">
          <button class="button is-primary" @click.prevent="setNetwork('networkview')">{{ network.text }}</button>
        </li>
      </ul>
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
      selectedFuture: '',
      network:
      {
        text: 'network',
        active: true
      },
      numbechartoptions: [
        { text: 'Single', value: 'singlechart', id: 0 },
        { text: 'Multiple', value: 'multiplechart', id: 1 }
      ],
      futureoptions: [
        { text: 'Repeat day', value: 'month' },
        { text: 'Self decide', value: 'self' },
        { text: 'Ask CALE', value: 'CALE' }
      ],
      selectedChartnumber: 0
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    setNetwork (nv) {
      console.log('is a network visualisation available?')
      console.log(nv)
    }
  }
}
</script>

<style>
#visual-view {
  border: 0px solid green;
}

#visual-container {
  display: block;
  border: 0px solid red;
  padding-bottom: 10px;
}

.chartholder {
  float: left;
  height: inherit;
  border: 0px solid black;
}

#future-tools {
  padding-top: 1em;
  width: 100px;
  height: inherit;
  float: right;
  border: 2px solid orange;
}

.clear {
  clear: both;
}

#social-graph {
  margin-top: 1em;
  display: block;
  border-top: 1px solid blue;
}

</style>
