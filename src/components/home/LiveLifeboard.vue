<template>
  <div class="lifestyle" id="live=lifestyle">
    <list-contracts v-if="spaceType === 'Lifeboards' && spaceStateShow === true && peerLifeflowListlive !== undefined"
      class="lifeboard-info"
      :lifeboards="peerLifeflowListlive.data"
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
import ListContracts from '@/components/spaces/lists/ListLifeboards.vue'

export default {
  name: 'LiveLifestyle',
  components: {
    ListContracts
  },
  props: {
  },
  computed: {
    showLifeboardList: function () {
      return this.$store.state.lifeBoard.lifeboardtListshow
    },
    peerLifeflowListlive: function () {
      return this.$store.state.joinedLifeboard[0]
    },
    searchQuery: function () {
      return this.$store.state.searchQuery
    },
    spaceType: function () {
      return this.$store.state.spaceType
    },
    spaceState: function () {
      return this.$store.state.spaceState
    },
    spaceStateShow: function () {
      return this.$store.state.spaceStateShow.state
    }
  },
  data () {
    return {
      lifeboardState: 'private',
      lifestyleActive: false,
      worldActive: false
    }
  },
  methods: {
    statusLifeboard (type) {
      this.lifeboardState = type
    },
    statusLifeboardshow () {
      this.$store.dispatch('actionLifeboardList')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  img {
    width: auto;
  }

.flowlist-showspace {
  padding-left: 2em;
}

.flowlist-space.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  margin-right: 2em;
  margin-left: 2em;
  text-align: center;
}

.lifeflow-spacelist {
  padding: 1em;
}

.lifeboard-info {
  border: 0px solid grey;
  text-align: center;
}

</style>
