<template>
  <div id="public-network-experiment">
    <experimentnetwork-join
      class="experiment-info" v-if="spaceState === 'public' && spaceJoinStateShow === true && networkNXPListlive.data"
      :experiments="networkNXPListlive.data"
      :columns="networkNXPListlive.columns"
      :filter-key="searchQuery">
    </experimentnetwork-join>
  </div>
</template>

<script>
import ExperimentnetworkJoin from '@/components/spaces/grids/input/ExperimentNetworkJoin.vue'

export default {
  name: 'PublicNetwork',
  components: {
    ExperimentnetworkJoin
  },
  computed: {
    showExperimentList: function () {
      return this.$store.state.experimentListshow
    },
    peerExperimentListlive: function () {
      return this.$store.state.joinedNXPlist
    },
    networkNXPListlive: function () {
      return this.$store.state.NXPexperimentList
    },
    searchQuery: function () {
      return this.$store.state.searchQuery
    },
    nxpView: function () {
      return this.$store.state.viewNXP
    },
    nxpState: function () {
      return this.$store.state.nxpState
    },
    spaceType: function () {
      return this.$store.state.spaceType
    },
    spaceState: function () {
      return this.$store.state.spaceState
    },
    spaceJoinStateShow: function () {
      return this.$store.state.spaceJoinStateShow.state
    }
  },
  data () {
    return {
      isModalNewNetworkExperiment: false
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#public-network-experiment {
  width: 100%;
  z-index: 23;
  border: 0px dashed blue;
}

.nxplist-showspace {
  padding-left: 2em;
}

.nxplist-space.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  margin-right: 2em;
  margin-left: 2em;
  text-align: center;
}

.nxp-experimentslist {
  padding: 1em;
}

.experiment-info {
  border: 0px solid grey;
  text-align: center;
}

</style>
