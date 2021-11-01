<template>
  <div id="live-network-experiment">
    <div class="live-network-header">
      <ul>
        <li class="network-toolbar">
          <form id="search">
            Search <input name="query" v-model="searchQuery">
          </form>
        </li>
        <li class="network-toolbar">
          <button type="button" class="btn" @click="newExperiment()">new</button>
          <new-networkexperiment v-show="isModalNewNetworkExperiment" @close="closeModalNewN1">
            <template v-slot:header>
            <!-- The code below goes into the header slot -->
              NEW N=1 Network Experiment
            </template>
            <template v-slot:body>
            <!-- The code below goes into the header slot -->
              <header>Build Network Experiment</header>
            </template>
            <template v-slot:dashboard>
              <module-builder></module-builder>
            </template>
            <template v-slot:submit-join>
              <button @click="contributeNXP" >Contribute experiment to network</button>
            </template>
          </new-networkexperiment>
        </li>
      </ul>
    </div>
    <div class="nxp-experimentslist">
      <a class="nxplist-space" v-bind:class="{ active: nxpState === 'private' }" href="" @click.prevent="statusNXP('private')" >Private EXPERIMENTS</a>
      <a class="nxplist-space" v-bind:class="{ active: nxpState === 'public' }" href="" @click.prevent="statusNXP('public')" >Public Experiments</a>
    </div>
    <experiment-network v-if="nxpState === 'private' && peerExperimentListlive.data"
      class="experiment-info"
      :experiments="peerExperimentListlive.data"
      :columns="peerExperimentListlive.columns"
      :filter-key="searchQuery">
    </experiment-network>
    <experimentnetwork-join
      class="experiment-info" v-if="nxpState === 'public' && networkNXPListlive.data"
      :experiments="networkNXPListlive.data"
      :columns="networkNXPListlive.columns"
      :filter-key="searchQuery">
    </experimentnetwork-join>
  </div>
</template>

<script>
import ExperimentNetwork from '@/components/grids/ExperimentNetwork.vue'
import ExperimentnetworkJoin from '@/components/grids/ExperimentNetworkJoin.vue'
import NewNetworkexperiment from '@/components/experiments/NewNetworkExperiment.vue'
import ModuleBuilder from '@/components/grids/moduleBuilder.vue'

export default {
  name: 'LiveNetwork',
  components: {
    ExperimentNetwork,
    ExperimentnetworkJoin,
    NewNetworkexperiment,
    ModuleBuilder
  },
  computed: {
    peerExperimentListlive: function () {
      return this.$store.state.joinedNXPlist
    },
    networkNXPListlive: function () {
      return this.$store.state.NXPexperimentList
    }
  },
  data () {
    return {
      nxpState: 'private',
      searchQuery: '',
      isModalNewNetworkExperiment: false
    }
  },
  methods: {
    statusNXP (type) {
      this.nxpState = type
    },
    newExperiment () {
      this.isModalNewNetworkExperiment = true
      // create a set of modules and save if contributed
      this.$store.dispatch('actionMakeModuleRefContract')
    },
    closeModalNewN1 () {
      // clear the form
      this.$store.dispatch('actionClearContributeNXP')
      this.isModalNewNetworkExperiment = false
    },
    contributeNXP () {
      console.log('contribute NXP to world')
      this.nxpState = 'public'
      // start building NXP refcontract
      this.$store.dispatch('actionNewNXPrefcontract')
      this.closeModalNewN1()
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
