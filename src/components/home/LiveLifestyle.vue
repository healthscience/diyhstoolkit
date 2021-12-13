<template>
  <div class="lifestyle" id="live=lifestyle">LIFE FLOW
    <!-- LIFESTYLE COMING SOON
    <img src="../../assets/lifestyle.png" @click="lifestyleHex">
    <img src="../../assets/world.png" @click="worldHex">
    <div id="hexDashboard">
      <img v-if="lifestyleActive === true" src="../../assets/swimming.png">
      <img v-if="worldActive === true" src="../../assets/environment.png">
    </div> -->
    <div class="lifeflow-experimentslist">
      <a class="flowlist-space" v-bind:class="{ active: lifeflowState === 'private' }" href="" @click.prevent="statusLifeboard('private')" >Private LIFEBOARDS</a>
      <a class="flowlist-space" v-bind:class="{ active: lifeflowState === 'public' }" href="" @click.prevent="statusLifeboards('public')" >Public Lifeboards</a>
    </div>
    <list-contracts v-if="lifeflowState === 'private' && peerLifeflowListlive.data"
      class="experiment-info"
      :experiments="peerLifeflowListlive.data"
      :columns="peerLifeflowListlive.columns"
      :filter-key="searchQuery">
    </list-contracts>
    <!-- <lifeboard-join
      class="experiment-info" v-if="lifeflowState === 'public' && networkNXPListlive.data"
      :experiments="networkNXPListlive.data"
      :columns="networkNXPListlive.columns"
      :filter-key="searchQuery">
    </lifeboard-join> -->
  </div>
</template>

<script>
import ListContracts from '@/components/lists/ListContracts.vue'

export default {
  name: 'LiveLifestyle',
  components: {
    ListContracts
  },
  props: {
  },
  computed: {
    peerLifeflowListlive: function () {
      let tempData = {}
      tempData.data = [1, 2]
      tempData.columns = ['a', 'b']
      return tempData
      // return this.$store.state.joinedLifeboard
    },
    searchQuery: function () {
      return this.$store.state.searchQuery
    }
  },
  data () {
    return {
      lifeflowState: 'private',
      lifestyleActive: false,
      worldActive: false
    }
  },
  methods: {
    statusLifeboard (type) {
      this.lifeboardState = type
    },
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
