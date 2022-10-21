<template>
  <div id="toolbar-master" v-if="peerauth === true">
    <div id="scale-tools">
      <div class="scale-item">
        BentoSpace
      </div>
      <div class="scale-item">
       <button class="scale-space" v-bind:class="{ active: scaleSetting.active }" @click.prevent="setSpacescale()">{{ scaleSetting.text }}</button>
      </div>
      <div class="scale-item">
        <label>Scale</label>
        <input type="range" min="0.1" max="2" step="0.1" v-model.number="scalelocal" @change="setzoomScale">
          {{ scalespace }} %
      </div>
      <div id="story-life">-
          <!-- <a @click.prevent="viewStorytools" href="" id="story-button">Story</a> -->
      </div>
      <div id="routine-life"> -
          <!-- <a @click.prevent="viewRoutines" href="" id="routine-button">Routines</a> -->
      </div>
      <div id="space-save">
        <button class="save-space" @click.prevent="saveSpaceLayout()">save layout</button>
      </div>
      <div id="combine-list">
        <!--<button class="save-space" @click.prevent="combineSelected()">combine</button>-->
      </div>
      <div id="replicate-status" v-if="replicataStatus === true">
        <div class="rep-status">Replication in progess</div>
      </div>
    </div>
    <div v-if="liveStorytools === true" id="story-board">
      <story-tools></story-tools>
    </div>
  </div>
</template>

<script>
import StoryTools from '@/components/spaces/grids/story/storyTools.vue'

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
  },
  computed: {
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    scalespace: function () {
      let roundNumber = this.$store.state.activeScalevalue.toFixed(2)
      let scalePercent = roundNumber * 100
      return scalePercent.toFixed(0)
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
        text: 'mouse scale off',
        active: false
      },
      zoomscaleStatus: false,
      // scale: 1,
      liveStorytools: false,
      replicateDataStatus: false
    }
  },
  methods: {
    setSpacescale () {
      // set mouse scaling on or off  (add slider with time)
      this.scaleSetting.active = !this.scaleSetting.active
      if (this.scaleSetting.active === true) {
        this.scaleSetting.text = 'Mouse Scale On'
        this.zoomscaleStatus = true
        this.$store.dispatch('actionZoomscale', true)
      } else if (this.scaleSetting.active === false) {
        this.scaleSetting.text = 'Mouse Scale Off'
        this.zoomscaleStatus = false
        this.$store.dispatch('actionZoomscale', false)
      }
    },
    setzoomScale () {
      this.$store.dispatch('actionScalevalue', this.scalelocal)
    },
    viewStorytools (ev) {
      this.liveStorytools = !this.liveStorytools
    },
    viewRoutines () {
      console.log('rounte patterns / reminders')
    },
    saveSpaceLayout () {
      console.log('save spaces layout')
      this.$store.dispatch('actionSaveSpaceNXP', 'nxp')
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
  top: 100px;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: center;
  align-content: center;
  gap: 10px;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid orange;
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
