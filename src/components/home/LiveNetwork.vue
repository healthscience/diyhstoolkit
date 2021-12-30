<template>
  <div id="live-network-experiment">
    <div class="nxp-experimentslist">
      <a class="nxplist-space" v-bind:class="{ active: nxpState === 'private' }" href="" @click.prevent="statusNXP('private')" >Private EXPERIMENTS</a>
      <a class="nxplist-space" v-bind:class="{ active: nxpState === 'public' }" href="" @click.prevent="statusNXP('public')" >Public Experiments </a>
      <a class="nxplist-showspace" v-bind:class="{ active: showExperimentList.text === 'listshow' }" href="" @click.prevent="statusNXPshow()" > {{ showExperimentList.text }}</a>
    </div>
    <div id="show-nxplists" v-if="showExperimentList.state === true">
      <list-contracts v-if="nxpState === 'private' && peerExperimentListlive.data"
        class="experiment-info"
        :experiments="peerExperimentListlive.data"
        :columns="peerExperimentListlive.columns"
        :filter-key="searchQuery">
      </list-contracts>
      <experimentnetwork-join
        class="experiment-info" v-if="nxpState === 'public' && networkNXPListlive.data"
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
      console.log(this.$store.state.searchQuery)
      return this.$store.state.searchQuery
    }
  },
  data () {
    return {
      nxpState: 'private',
      isModalNewNetworkExperiment: false
    }
  },
  methods: {
    statusNXP (type) {
      this.nxpState = type
    },
    statusNXPshow () {
      this.$store.dispatch('actionExperimentList')
    }
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

.network-toolbar {
  display: inline-block;
  padding-left: 10px;
}
</style>
