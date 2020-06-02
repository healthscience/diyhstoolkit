<template>
  <div class="lifestyle" id="live=lifestyle">
    LIFESTYLE COMING SOON
    <img src="../../assets/lifestyle.png" @click="lifestyleHex">
    <img src="../../assets/world.png" @click="worldHex">
    <div id="hexDashboard">
      <img v-if="lifestyleActive === true" src="../../assets/swimming.png">
      <img v-if="worldActive === true" src="../../assets/environment.png">
    </div>
  </div>
</template>

<script>

export default {
  name: 'LiveLifestyle',
  components: {
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      lifestyleActive: false,
      worldActive: false
    }
  },
  methods: {
    lifestyleHex () {
      console.log('lifehex')
      this.lifestyleActive = !this.lifestyleActive
    },
    worldHex () {
      console.log('worldhex')
      this.worldActive = !this.worldActive
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  img {
    width: auto;
  }
</style>
