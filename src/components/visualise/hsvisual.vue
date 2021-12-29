<template>
  <div id="visual-view" ref="visualView">
    <div id="grid-visual">
      <div class="visual-item" id="bentobox-space">
        <div id="grid-bentobox">
          <div class="grid-item" v-if="datacollection !== undefined">
            <reactive :chartData="datacollection" :options="options"></reactive>
          </div>
          <div class="grid-item" v-if="futurecollection !== undefined && futurecollection.active !== false">
            <reactive :chartData="futurecollection" :options="options"></reactive>
          </div>
        </div>
        <div id="grid-bentobox">
          <div class="grid-item" v-if="networkcollection !== undefined && networkcollection.active !== false">
            <reactive :chartData="networkcollection" :options="options"></reactive>
          </div>
          <div class="grid-item" v-if="futurenetworkcollection !== undefined && futurenetworkcollection.active !== false">
            <reactive :chartData="futurenetworkcollection" :options="options"></reactive>
          </div>
        </div>
      </div>
      <div class="visual-item" id="future-tools">
        <ul>
          <li class="context-future">
            <button id="add-lifeboard" @click.prevent="addLifeboard()">add lifeBoard</button>
          </li>
          <li class="context-future">
            <button id="new-visspace" @click.prevent="setChartSpace()">add BBox</button>
            <!-- <select v-model="selectedChartnumber" @change.prevent="setChartNumber()">
              <option v-for="cnoption in numbechartoptions" v-bind:value="cnoption.value" :key='cnoption.id' :selected="cnoption.id === selectedChartnumber">
              {{ cnoption.text }}
              </option>
            </select> -->
          </li>
          <li class="context-future">
            <select v-model="selectedFuture" @change.prevent="setFuture()">
              <option disabled value="">make future</option>
              <option v-for="foption in futureoptions" :key='foption.value' v-bind:value="foption.value">
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
      <ul>
        <li class="context-network">
          <button class="button is-primary" @click.prevent="setNetworkgraph('networkview')">{{ network.text }}</button>
        </li>
      </ul>
      <div id="social-network" v-if="socialState === true && socialgraphActive !== undefined && socialgraphActive.length > 0">
        <ul class="graph-peer" v-for="sg in socialgraphActive" :key="sg.key" v-bind:value="sg.key">
          <li>
            {{ sg }}
          </li>
        </ul>
        <button class="button-past" @click.prevent="setPastNetwork()">Now</button>
        <button class="button-future" @click.prevent="setFutureNetwork()">Future</button>
      </div>
    </div>
    <div id="map-network">
      <ul>
        <li class="context-network">
          <button class="button is-primary" @click.prevent="setNetworkmap('mapview')">{{ mapButton.text }}</button>
        </li>
      </ul>
      <div id="open-map" v-if="mapState === true && networkMap !== undefined && networkMap.length > 0">
        <ul  v-for="map in networkMap" :key="map.key" v-bind:value="map.key">
          <li class="map-peer">
            {{ map }}
          </li>
        </ul>
      </div>
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
    socialgraphActive: function () {
      return this.$store.state.lifeBoard.liveSocialGraph
    },
    networkMap: function () {
      return this.$store.state.lifeBoard.liveMapNetwork
    },
    futurecollection: function () {
      let futureData = this.$store.state.lifeBoard.liveFutureCollection
      return futureData
    },
    networkcollection: function () {
      let aggData = this.$store.state.lifeBoard.liveNetworkcollection
      return aggData
    },
    futurenetworkcollection: function () {
      let futureaggData = this.$store.state.lifeBoard.liveFutureNetworkcollection
      return futureaggData
    }
  },
  created () {
  },
  mounted () {
  },
  data () {
    return {
      socialState: false,
      mapState: false,
      dimentionH: 0,
      dimentionW: 0,
      selectedFuture: '',
      network:
      {
        text: 'show social graph',
        active: true
      },
      mapButton:
      {
        text: 'show map',
        active: true
      },
      numbechartoptions: [
        { text: 'Single', value: 'singlechart', id: 0 },
        { text: 'Multiple', value: 'multiplechart', id: 1 }
      ],
      futureoptions: [
        { text: 'Remove', value: 'remove' },
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
    setNetworkgraph (nv) {
      console.log('is a network visualisation available?')
      console.log(nv)
      this.socialState = !this.socialState
      /* let spaceContext = {}
      spaceContext.nxpCNRL = this.shellID
      spaceContext.moduleCNRL = this.moduleCNRL
      spaceContext.moduleType = this.moduleType
      spaceContext.mData = this.mData
      this.$store.dispatch('actionSocialgraph', spaceContext) */
    },
    setNetworkmap (m) {
      console.log('map')
      console.log(m)
      this.mapState = !this.mapState
      let spaceContext = {}
      spaceContext.nxpCNRL = this.shellID
      spaceContext.moduleCNRL = this.moduleCNRL
      spaceContext.moduleType = this.moduleType
      spaceContext.mData = this.mData
      this.$store.dispatch('actionMap', spaceContext)
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
    addLifeboard () {
      console.log('add to lifeboard')
      let lifeBoardHolder = {}
      lifeBoardHolder.type = 'add'
      lifeBoardHolder.shellID = this.shellID
      lifeBoardHolder.moduleCNRL = this.moduleCNRL
      lifeBoardHolder.moduleType = this.moduleType
      lifeBoardHolder.mData = this.mData
      this.$store.dispatch('actionLifeboardAdd', lifeBoardHolder)
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
    setPastNetwork () {
      console.log('past of socail graph agg')
      let pastContext = {}
      pastContext.shellCNRL = this.shellID
      pastContext.moduleCNRL = this.moduleCNRL
      pastContext.moduleType = this.moduleType
      pastContext.mData = this.mData
      pastContext.data = 'socailgrapharry'
      this.$store.dispatch('actionPastGraph', pastContext)
    },
    setFutureNetwork () {
      console.log('future of socail graph agg')
      let futureContext = {}
      futureContext.shellCNRL = this.shellID
      futureContext.moduleCNRL = this.moduleCNRL
      futureContext.moduleType = this.moduleType
      futureContext.mData = this.mData
      futureContext.data = 'socialgraphlist'
      this.$store.dispatch('actionFutureGraph', futureContext)
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

#grid-visual {
  display: grid;
  grid-template-columns: 5fr 1fr;
  width: 100%;
  border: 0px solid green;
}

.visual-item {
  width: 100%;
  border: 0px solid pink;
}

#grid-bentobox {
  display: grid;
  grid-template-columns: 50% 50%;/* repeat(50% - calc(100% - 2fr)); */
  border: 0px solid blue;
}

.grid-item {
  border: 0px solid red;
  width: 100%;
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

.graph-peer {
  display: inline-block;
  padding: 0.8em;
}

.map-peer {
  display: inline-block;
}
</style>
