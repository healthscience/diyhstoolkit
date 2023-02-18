<template>
  <div id="space-map"> <!-- v-bind:style="{ translate: '(' + offRight + ')' }"   -->
    <div id="minimap" class="minmove-right" v-bind:style="{ right: offRight }">
      <canvas v-if="openminib === true" id="minimap-canvas" @click="mouseMiniSelect($event)" ></canvas>
    </div>
    <button id="open-mini" @click.prevent="setMiniMapShow">map</button>
  </div>
</template>

<script>

export default {
  name: 'MinnavMap',
  components: {
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
    this.setMinmapcanvas()
  },
  props: {
  },
  computed: {
    spaceCoord: function () {
      return this.$store.state.liveSpaceCoord
    }
  },
  data: function () {
    return {
      c: {},
      ctx: {},
      openminib: true,
      openmini: false,
      offRight: '-400px'
    }
  },
  methods: {
    setMinmapcanvas () {
      let c = document.getElementById('minimap-canvas')
      let ctx = c.getContext('2d')
      this.$store.dispatch('actionSetminmap', ctx)
    },
    mouseMiniSelect (e) {
      this.$store.dispatch('actionMMapMove', e)
    },
    setMiniMapShow () {
      this.openmini = !this.openmini
      if (this.openmini === false) {
        this.offRight = '-400px'
      } else {
        this.offRight = '0px'
      }
    }
  }
}
</script>

<style scoped>
#space-map {
  height: 100px;
  background-color: none;
}

#minimap {
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  bottom: 12px;
  right: 0px;
  z-index: 30;
  opacity: .6;
  /* background-color: lightgrey; */
  width: 240px;
  height: 240px;
}

.minmove-right {
  border: 2px black;
  right: 0px;
}

#minimap-canvas {
  display: block;
  opacity: .6;
  background-color: lightgrey;
  width: 200px;
  height: 200px;
  border: 1px solid red;
}

#open-mini {
  position: fixed;
  bottom: 10px;
  right: 20px;
  z-index: 31;
  display: grid;
  justify-content: center;
  place-self: start;
  align-self: start;
  height: 2em;
  width: 5em;
  background-color: white;
}

</style>
