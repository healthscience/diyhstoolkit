<template>
  <div id="scale-tools">
    <div class="clearboth"></div>
    <div class="scale-item">
     <button class="scale-space" v-bind:class="{ active: scaleSetting.active }" @click.prevent="setSpacescale()">{{ scaleSetting.text }}</button>
    </div>
    <div class="scale-item">
      <label>Scale</label>
      <input type="range" min="0.1" max="2" step="0.1" v-model.number="scale" @change="zoomScale">
      {{ (scale * 100) }} %
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExperimentNetwork',
  components: {
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
      scale: 1
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
    }
  }
}
</script>

<style>
.clearboth {
  display: clearboth;
}

#scale-tools {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  justify-content: center;
  align-content: center;
  gap: 10px;
  /* grid-auto-flow: column; */
  position: sticky;
  top: 3em;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid orange;
  background-color: white;
  padding: .1em;
  z-index: 4;
}

.scale-space.active {
  background-color: #4CAF50; /* Green */
}

.scale-item {
  display: inline-block;
  border: 0px solid red;
}

</style>
