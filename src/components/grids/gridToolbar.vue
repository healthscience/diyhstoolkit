<template>
  <div id="scale-tools">
    <div class="scale-item">
     <button class="scale-space" v-bind:class="{ active: scaleSetting.active }" @click.prevent="setSpacescale()">{{ scaleSetting.text }}</button>
    </div>
    <div class="scale-item">
      <label>Scale</label>
      <input type="range" min="0.1" max="2" step="0.1" v-model.number="scale">
    </div>
    <div class="scale-item">
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
  filters: {
  },
  data: function () {
    return {
      zoomdashdata: 0,
      scaleZoom: '',
      scaleSetting:
      {
        text: 'scale off',
        active: false
      },
      zoomscaleStatus: false,
      zoomCalibrate: 1,
      width: 0,
      height: 0,
      x: 800,
      y: 0,
      scale: 1
    }
  },
  methods: {
    setSpacescale () {
      // set mouse scaling on or off  (add slider with time)
      this.scaleSetting.active = !this.scaleSetting.active
      if (this.scaleSetting.active === true) {
        this.scaleSetting.text = 'Scale On'
        this.zoomscaleStatus = true
      } else if (this.scaleSetting.active === false) {
        this.scaleSetting.text = 'Scale Off'
        this.zoomscaleStatus = false
      }
    }
  }
}
</script>

<style>

</style>
