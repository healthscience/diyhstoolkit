<template>
  <div id="toolbar-master">
    <div id="scale-tools">
      <div class="scale-item">
       <button class="scale-space" v-bind:class="{ active: scaleSetting.active }" @click.prevent="setSpacescale()">{{ scaleSetting.text }}</button>
      </div>
      <div class="scale-item">
        <label>Scale</label>
        <input type="range" min="0.1" max="2" step="0.1" v-model.number="scale" @change="zoomScale">
        {{ (scale * 100) }} %
      </div>
      <div id="story-life">
          <a @click.prevent="viewStorytools" href="" id="story-button">Story</a>
      </div>
      <div id="routine-life">
          <a @click.prevent="viewRoutines" href="" id="routine-button">Routines</a>
      </div>
    </div>
    <div v-if="liveStorytools === true" id="story-board">
      <story-tools></story-tools>
    </div>
  </div>
</template>

<script>
import StoryTools from '@/components/grids/story/storyTools.vue'

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
  },
  data: function () {
    return {
      scaleSetting:
      {
        text: 'mouse scale off',
        active: false
      },
      zoomscaleStatus: false,
      scale: 1,
      liveStorytools: false
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
    zoomScale () {
      this.$store.dispatch('actionScalevalue', this.scale)
    },
    viewStorytools (ev) {
      this.liveStorytools = !this.liveStorytools
    },
    viewRoutines () {
      console.log('rounte patterns / reminders')
    }
  }
}
</script>

<style>
#toolbar-master {
  display: grid;
  position: sticky;
  border: 0pmpx solid red;
  top: 45px;
  z-index: 11;
}

#scale-tools {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: center;
  align-content: center;
  gap: 10px;
  /* grid-auto-flow: column; */
  position: sticky;
  top: 400px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid orange;
  background-color: white;
  padding: .1em;
  z-index: 14;
}

.scale-space.active {
  background-color: #4CAF50; /* Green */
}

.scale-item {
  display: inline-block;
  border: 0px solid red;
}

</style>
