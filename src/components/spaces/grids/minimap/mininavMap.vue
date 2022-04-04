<template>
  <div id="space-map">
    Nav MAP
      <canvas id="minimap" @click="mouseMiniSelect"></canvas>
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
      mouseLive:
      {
        x: 10,
        y: 10
      },
      c: {},
      ctx: {},
      firstClick: true
    }
  },
  methods: {
    setMinmapcanvas () {
      let c = document.getElementById('minimap')
      let ctx = c.getContext('2d')
      this.$store.dispatch('actionSetminmap', ctx)
    },
    mouseMiniSelect (e) {
      // console.log(e)
      // window.scrollTo(2000, 4000)
      this.$store.dispatch('actionMMapMove', e)
    }
  }
}
</script>

<style scoped>
#space-map {
  display: block;
  right: 20px;
  position: absolute;
  z-index: 10;
  opacity: .6;
  background-color: lightgrey;
  width: 200px;
  height: 200px;
}

#minimap {
  display: block;
  width: 200px;
  height: 200px;
}

</style>
