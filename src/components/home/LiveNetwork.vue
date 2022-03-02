<template>
  <div id="live-network-experiment">
    <div id="show-nxplists" v-if="spaceType === 'Experiments' && spaceStateShow === true">
      <list-contracts v-if="spaceState === 'private' && peerExperimentListlive.data"
        class="experiment-info"
        :experiments="peerExperimentListlive.data"
        :columns="peerExperimentListlive.columns"
        :filter-key="searchQuery">
      </list-contracts>
      <experimentnetwork-join
        class="experiment-info" v-if="spaceState === 'public' && networkNXPListlive.data"
        :experiments="networkNXPListlive.data"
        :columns="networkNXPListlive.columns"
        :filter-key="searchQuery">
      </experimentnetwork-join>
    </div>
  </div>
</template>

<script>
import ListContracts from '@/components/lists/ListContracts.vue'
import ExperimentnetworkJoin from '@/components/grids/ExperimentNetworkJoin.vue'

export default {
  name: 'LiveNetwork',
  components: {
    ListContracts,
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
    spaceStateShow: function () {
      return this.$store.state.spaceStateShow.state
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
#live-network-experiment {
  width: inherit;
  border: 0px solid red;
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
