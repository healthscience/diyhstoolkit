<template>
  <div id="visual-view" ref="visualView">
    <div id="visual-container">
      <div id="charts-live" v-if="datacollection !== undefined">
        <reactive :chartData="datacollection" :options="options"></reactive>
      </div>
      <div id="future-tools">
        <ul>
          <li class="context-future">
            <button id="new-visspace" @click.prevent="setChartSpace()">add Space</button>
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
          <li class="context-future">
            <button class="new-viscombine" v-bind:class="{ active: combineSetting.active }" @click.prevent="setCombine()">{{ combineSetting.text }}</button>
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
    },
    shellID: String,
    moduleCNRL: String,
    moduleType: String,
    mData: String
  },
  computed: {
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
      selectedChartnumber: 0,
      combineSetting:
      {
        text: 'combine',
        active: false
      }
    }
  },
  methods: {
    setNetwork (nv) {
      console.log('is a network visualisation available?')
      console.log(nv)
    },
    setChartSpace () {
      console.log('set up a new vis chart space')
      let spaceContext = {}
      spaceContext.nxpCNRL = this.shellID
      spaceContext.moduleCNRL = this.moduleCNRL
      spaceContext.moduleType = this.moduleType
      spaceContext.mData = this.mData
      this.$store.dispatch('actionVisSpaceAdd', spaceContext)
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
    setCombine () {
      console.log('combine two or more chart???')
      // switch on and off button
      this.combineSetting.active = !this.combineSetting.active
      console.log(this.combineSetting.active)
      let combineContext = {}
      combineContext.shellCNRL = this.shellID
      combineContext.moduleCNRL = this.moduleCNRL
      combineContext.moduleType = this.moduleType
      combineContext.mData = this.mData
      combineContext.active = this.combineSetting.active
      this.$store.dispatch('actionCombineSpace', combineContext)
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
  width: 88%;
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
  display: block;
  margin-bottom: 16px;
  border: 0px solid purple;
}

#new-visspace {
  margin-bottom: 0em;
}

.new-viscombine.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  text-align: center;
}

.clear {
  clear: both;
}

#social-graph {
  /* margin-top: 0em;
  border-top: 1px solid blue; */
}

</style>
