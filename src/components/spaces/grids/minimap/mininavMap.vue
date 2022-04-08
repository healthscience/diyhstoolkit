<template>
  <div id="space-map">
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
      this.$store.dispatch('actionMMapMove', e)
      console.log('scorll sett')
      console.log(e)
      // window.scrollTo(0, 4000)
      // window.scrollTo(2000, 2000)
      // document.getElementById('spaceitem-controls').scrollIntoView()
      // document.getElementsByClassName('drag-handle').scrollIntoView()
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
  display: block;
  bottom: 10px;
  right: 20px;
  z-index: 30;
  opacity: .6;
  background-color: lightgrey;
  width: 200px;
  height: 200px;
}

</style>
