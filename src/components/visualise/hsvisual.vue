<template>
  <div id="visual-view" ref="visualView">
    <div id="visual-container">
      <div id="charts-live" v-if="datacollection !== undefined">
        <reactive :chartData="datacollection" :options="options"></reactive>
      </div>
      <div id="future-tools">
        <ul>
          <li class="context-future">
            <button id="new-visspace" @click.prevent="setChartNumber()">add Space</button>
            <!-- <select v-model="selectedChartnumber" @change.prevent="setChartNumber()">
              <option v-for="cnoption in numbechartoptions" v-bind:value="cnoption.value" :key='cnoption.id' :selected="cnoption.id === selectedChartnumber">
              {{ cnoption.text }}
              </option>
            </select> -->
          </li>
          <li class="context-future">
            <select v-model="selectedFuture" @change.prevent="setFuture()">
              <option disabled value="">make future</option>
              <option v-for="foption in futureoptions" :key='foption.value'>
                  {{ foption.text }}
                </option>
            </select>
            <div id="future-selected">Selected: {{ selectedFuture }}</div>
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
  computed: {
    spaceDimention: function () {
      let spaceSizes = 0
      if (this.isMounted !== false) {
        spaceSizes = this.spaceHeight()
      }
      return spaceSizes
    },
    scaleWidth: function () {
      return 1200
    },
    scaleHeight: function () {
      return 400
    }
  },
  created () {
  },
  mounted () {
    this.isMounted = true
    this.spaceHeight()
  },
  data () {
    return {
      dimentionH: 0,
      dimentionW: 0,
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
  methods: {
    spaceHeight () {
      console.log('spacehight')
      let spaceD = 0
      if (this.$refs.visualView !== undefined) {
        this.dimentionH = this.$refs.visualView.clientHeight
        this.dimentionW = this.$refs.visualView.clientWidth
        spaceD = this.$refs.visualView.clientWidth
      }
      return spaceD
    },
    setNetwork (nv) {
      console.log('is a network visualisation available?')
      console.log(nv)
    }
  }
}
</script>

<style>
#visual-view {
  height: 90%;
  width: 99%;
  border: 0px solid orange;
}

#visual-container {
  display: flex;
  border: 0px solid red;
}

#charts-live {
  flex-grow: 1; /* Set the middle element to grow and stretch */
  width: 100%;
  height: 100%;
  position: relative;
  border: 0px solid blue;
}

#future-tools {
  padding-top: 50px;
  flex-grow: 1; /* Set the middle element to grow and stretch */
  border-left: 1px solid orange;
}

.context-future {
  border: 0px solid purple;
}

#new-visspace {
  margin-bottom: 0em;
}

.clear {
  clear: both;
}

#social-graph {
  /* margin-top: 0em;
  border-top: 1px solid blue; */
}

</style>
