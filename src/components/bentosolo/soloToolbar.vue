<template>
  <div id="toolbar-master" v-if="peerauth === true">
    <div id="scale-tools">
      <div class="scale-item">
        SoloSpace
      </div>
      <div id="story-life">
          <button @click.prevent="viewStorytools" id="story-button">Story</button>
      </div>
      <div id="routine-life">
          <button @click.prevent="viewRoutines" href="" id="routine-button">Routines</button>
      </div>
      <div id="combine-list">
        <button class="save-space" @click.prevent="combineSelected()">+  +</button>
      </div>
      <div id="space-save">
        <button class="save-space" @click.prevent="saveSpaceLayout()">save layout</button>
      </div>
      <div id="replicate-status" v-if="replicataStatus === true">
        <div class="rep-status">Replication in progess</div>
      </div>
      <div class="scale-item">
       <button class="scale-space" v-bind:class="{ active: scaleSetting.active }" @click.prevent="setSpacescale()">{{ scaleSetting.text }}</button>
      </div>
      <div class="scale-item scalebuttons">
        <label>Scale</label>
        <!--<input type="range" min="0.1" max="2" step="0.1" v-model.number="scalelocal" @change="setzoomScale">-->
        <button class="point-change" @click="setzoomScale(-0.05)">-</button>
        {{ scalespace }} %
        <button class="point-change" @click="setzoomScale(0.05)">+</button>
      </div>
    </div>
    <div v-if="storyspaceStatus.active === true" id="story-board">
      <story-tools :solospace="board"></story-tools>
    </div>
  </div>
</template>

<script>
import StoryTools from '@/components/bentosolo/story/storyTools.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    StoryTools
  },
  created () {
  },
  mounted () {
  },
  props: {
    board: String
  },
  computed: {
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    scalespace: function () {
      let roundNumber = this.$store.state.solopositionSpace.soloZoom
      let scalePercent = roundNumber * 100
      return scalePercent.toFixed(0)
    },
    storyspaceStatus: function () {
      return this.$store.state.solospace.storyState
    },
    combinedList: function () {
      return this.$store.state.combineSpaceList
    },
    replicataStatus: function () {
      return this.$store.state.replicatDataStatus
    }
  },
  data: function () {
    return {
      scalelocal: 1,
      scaleSetting:
      {
        text: 'mouse',
        active: false
      },
      zoomscaleStatus: false,
      // scale: 1,
      liveStorytools: true,
      replicateDataStatus: false
    }
  },
  methods: {
    setSpacescale () {
      console.log('mousezoooooom')
      // set mouse scaling on or off  (add slider with time)
      this.scaleSetting.active = !this.scaleSetting.active
      if (this.scaleSetting.active === true) {
        this.scaleSetting.text = 'Mouse'
        this.zoomscaleStatus = true
        this.$store.dispatch('actionSoloZoomscale', true)
      } else if (this.scaleSetting.active === false) {
        this.scaleSetting.text = 'Mouse'
        this.zoomscaleStatus = false
        this.$store.dispatch('actionSoloZoomscale', false)
      }
    },
    setzoomScale (amount) {
      this.$store.dispatch('actionSoloScalevalue', amount)
    },
    viewStorytools (ev) {
      // this.liveStorytools = !this.liveStorytools
      this.$store.dispatch('actionStoryspace', this.board)
    },
    viewRoutines () {
      console.log('rounte patterns / reminders')
    },
    saveSpaceLayout () {
      this.$store.dispatch('actionSaveSoloSpaceCells', this.board)
    },
    combineSelected () {
      console.log('look at combine list and merage to one chart')
      console.log(this.combinedList)
    }
  }
}
</script>

<style scoped>
#toolbar-master {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px dashed purple;
  height: 100%;
  width: 100%;
  position: sticky;
  top: 8em;
  z-index: 16;
}

#scale-tools {
  position: fixed;
  top: 30px;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: left;
  align-content: left;
  gap: 10px;
  width: 100%;
  height: 60px;
  border-bottom: 1px dashed orange;
  background-color: white;
  padding: .1em;
}

.scale-space.active {
  background-color: #4CAF50; /* Green */
}

.scale-item {
  display: inline-block;
  border: 0px solid red;
}

.rep-status {
  background-color: green;
  animation: blinkingBackground 2s infinite;
}

@keyframes blinkingBackground {
  0% { background-color: #10c018;}
  25% { background-color: #1056c0;}
  50% { background-color: #ef0a1a;}
  75% { background-color: #254878;}
  100% { background-color: #04a1d5;}
}

.point-change {
  cursor: pointer;
}

.scale-item.scalebuttons {
  height: 1.8em;
  border: 1px solid lightgrey;
}

/*
#space-map {
  right: 20px;
  position: absolute;
  z-index: 16;
  opacity: 60%;
  background-color: lightgrey;
  width: 200px;
  height: 200px;
} */
</style>
