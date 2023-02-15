<template>
  <div id="space-mapsolo"> <!-- v-bind:style="{ translate: '(' + offRight + ')' }"   -->
    <div id="minimapsolo" class="minmove-right" v-bind:style="{ right: offRight }">
      <canvas v-if="openminib === true" id="minimapsolo-canvas" @click="mouseMiniSelect($event)" ></canvas>
    </div>
    <button id="open-minisolo" @click.prevent="setMiniMapShowSolo">map</button>
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
    this.setMinmapcanvasSolo()
  },
  props: {
  },
  computed: {
    spaceCoord: function () {
      return this.$store.state.liveSpaceCoordsolo
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
    setMinmapcanvasSolo () {
      let c = document.getElementById('minimapsolo-canvas')
      let ctx = c.getContext('2d')
      this.$store.dispatch('actionSetsolominmap', ctx)
    },
    mouseMiniSelect (e) {
      this.$store.dispatch('actionMMapSoloMove', e)
    },
    setMiniMapShowSolo () {
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
#space-mapsolo {
  height: 100px;
  background-color: none;
}

#minimapsolo {
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  bottom: 12px;
  right: 0px;
  z-index: 70;
  opacity: .6;
  /* background-color: lightgrey; */
  width: 240px;
  height: 240px;
}

.minmovesolo-right {
  border: 2px black;
  right: 0px;
}

#minimapsolo-canvas {
  display: block;
  opacity: .6;
  background-color: lightgrey;
  width: 200px;
  height: 200px;
  border: 1px solid blue;
}

#open-minisolo {
  position: fixed;
  bottom: 10px;
  right: 20px;
  z-index: 71;
  display: grid;
  justify-content: center;
  place-self: start;
  align-self: start;
  height: 2em;
  width: 5em;
  background-color: white;
}

</style>
