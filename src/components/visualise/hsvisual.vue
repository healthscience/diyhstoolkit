<template>
  <div id="visual-view" ref="visualView">
    <div id="grid-visual">
      <div class="visual-item" id="bentobox-space">
        <div id="grid-bentobox">
          <div class="grid-item" v-if="networkcollection !== undefined && networkcollection.active !== false">
            <reactive :chartData="networkcollection" :options="options"></reactive>
          </div>
          <div class="grid-item" v-if="futurenetworkcollection !== undefined && futurenetworkcollection.active !== false">
            <reactive :chartData="futurenetworkcollection" :options="options"></reactive>
          </div>
        </div>
        <div id="grid-bentobox">
          <div class="grid-item" v-if="datacollection !== undefined">
            <reactive :chartData="datacollection" :options="options"></reactive>
          </div>
          <div class="grid-item" v-if="futurecollection !== undefined && futurecollection.active !== false">
            <reactive :chartData="futurecollection" :options="options"></reactive>
          </div>
        </div>
      </div>
      <div class="visual-item" id="future-tools">
        <ul>
          <li class="context-future">
            <div class="scale-item">
              Lifeboard:
            </div>
            <div class="scale-item">
              <form id="lifeboard_form" name="lifeboard_addform" method="post" action="#">
                <label for="lifeboard-select"></label>
                <select class="select-lifeboard-id" id="lifeboard-list" @change="lifeboardSelect" v-model="lifeboardRef">
                  <option v-for="lb in lifeboardList" :key="lb.id" v-bind:value="lb">
                    {{ lb }}
                  </option>
                </select>
                <!-- <button id="add-lifeboard-button" type="button" class="btn" @click="addLifeboard()">add</button> -->
              </form>
            </div>
            <!-- <div class="scale-item">
              New <input name="query" v-model="lifeboardName">
              <button class="new-lifeboard" @click.prevent="saveLifeboard()">save</button>
            </div> -->
            <button id="add-lifeboard" @click.prevent="addLifeboard()">add to lifeBoard</button>
          </li>
          <li class="context-future">
            <button id="new-visspace" @click.prevent="setChartSpace()">copy BBox</button>
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
      return this.$store.state.lifeBoard.peerLifeboards
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
    saveLifeboard () {
      console.log('save new lifeboard')
      console.log(this.lifeboardName)
      this.$store.dispatch('actionSaveLifeboard', this.lifeboardName)
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

<style scoped>
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
  grid-template-columns: 1fr auto; /* repeat(content-fill minmax(50% 50%)); 50% 50%; repeat(50% - calc(100% - 2fr)); */
  border: 0px solid blue;
  width: 100%;
}

.grid-item {
  border: 0px solid red;
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
