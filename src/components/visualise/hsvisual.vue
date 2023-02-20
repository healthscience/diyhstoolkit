<template>
  <div id="visual-view" ref="visualView">
    <div id="grid-visual">
      <div class="visual-item" id="bentobox-space">
        <div id="grid-bentobox">
          <div class="grid-item-chart" v-if="networkcollection !== undefined && networkcollection.active !== false">
            <reactive :chartData="networkcollection" :options="options"></reactive>
          </div>
          <div class="grid-item-chart" v-if="futurenetworkcollection !== undefined && futurenetworkcollection.active !== false">
            <reactive :chartData="futurenetworkcollection" :options="options"></reactive>
          </div>
        </div>
        <div id="grid-bentobox">
          <div class="grid-item-chart" v-if="datacollection !== undefined">
            <reactive :chartData="datacollection" :options="options"></reactive>
          </div>
          <div class="grid-item-chart" v-if="futurecollection !== undefined && futurecollection.active !== false">
            <reactive :chartData="futurecollection" :options="options"></reactive>
          </div>
        </div>
      </div>
      <div class="visual-item" id="future-tools">
          <div class="context-future">
            <!-- <div class="lifeboard-item">
              Lifeboard:
            </div>
            <div class="lifeboard-item">
              <form id="lifeboard_form" name="lifeboard_addform" method="post" action="#">
                <label for="lifeboard-select"></label>
                <select class="select-lifeboard-id" id="lifeboard-list" @change="lifeboardSelect" v-model="lifeboardRef">
                  <option v-for="lb in lifeboardList[0].data" :key="lb.id" v-bind:value="lb.id">
                    {{ lb.name }}
                  </option>
                </select>
              </form>
            </div>
            <button id="add-lifeboard" @click.prevent="addLifeboard()">add to lifeBoard</button> -->
          </div>
          <div class="context-future">
            <button id="new-visspace" @click.prevent="setChartSpace()">copy BBox</button>
            <!-- <select v-model="selectedChartnumber" @change.prevent="setChartNumber()">
              <option v-for="cnoption in numbechartoptions" v-bind:value="cnoption.value" :key='cnoption.id' :selected="cnoption.id === selectedChartnumber">
              {{ cnoption.text }}
              </option>
            </select> -->
          </div>
          <!-- <div class="context-future">
            <select v-model="selectedFuture" @change.prevent="setFuture()">
              <option disabled value="">make future</option>
              <option v-for="foption in futureoptions" :key='foption.value' v-bind:value="foption.value">
                  {{ foption.text }}
                </option>
            </select>
            <div id="future-selected">Selected: {{ selectedFuture }}</div>
          </div>
          <div class="context-future">
            <button class="new-viscombine" v-bind:class="{ active: combineSetting.active }" @click.prevent="setCombine()">{{ combineSetting.text }}</button>
          </div> -->
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
// import LineChart from '@/components/charts/LineChart'
// import BarChart from '@/components/charts/BarChart'
// import BubbleChart from '@/components/charts/BubbleChart'
import Reactive from '@/components/visualise/charts/Reactive'

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
    lifeboardList: function () {
      return this.$store.state.joinedLifeboard
    },
    futurecollection: function () {
      let futureData = this.$store.state.aiInterface.liveFutureCollection
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
      dimentionH: 0,
      dimentionW: 0,
      selectedFuture: '',
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
      },
      lifeboardName: '',
      lifeboardRef: ''
    }
  },
  methods: {
    lifeboardSelect () {
      console.log(this.lifeboardRef)
    },
    setChartSpace () {
      let spaceContext = {}
      spaceContext.nxpCNRL = this.shellID
      spaceContext.moduleCNRL = this.moduleCNRL
      spaceContext.moduleType = this.moduleType
      spaceContext.mData = this.mData
      this.$store.dispatch('actionVisSpaceAdd', spaceContext)
    },
    addLifeboard () {
      let lifeBoardHolder = {}
      lifeBoardHolder.type = 'add'
      lifeBoardHolder.lifeboard = this.lifeboardRef
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
    setCombine () {
      // switch on and off button
      this.combineSetting.active = !this.combineSetting.active
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

<style scoped>
#visual-view {
  border: 0px solid blue;
}

#grid-visual {
  display: grid;
  grid-template-columns: 5fr 1fr;
  border: 2px solid red;
}

.visual-item {
  border: 0px solid pink;
}

#grid-bentobox {
  display: grid;
  grid-template-columns: 1fr auto; /* repeat(content-fill minmax(50% 50%)); 50% 50%; repeat(50% - calc(100% - 2fr)); */
  border: 1px solid blue;
}

.grid-item-chart {
  border: 2px dashed green;
}

#future-tools {
  display: grid;
  grid-template-columns: 1fr;
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
