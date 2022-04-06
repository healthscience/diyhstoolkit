<template>
  <div class="network-experiments">
    <div id="toolkit-boards" v-if="peerauth === true">
      <div class="toolkit-logo">
        <img class="small-logo" alt="logo" src="../.././assets/logo.png">
      </div>
      <div id="peer-views" v-if="flowviews === true">
        <div id="flow-space" class="flow-menu">
          <div id="flow-type">
            <button id="select-flow" @click.prevent="setFlow">Space</button>
            <div id="active-space-selected" v-if="flowMenu === false">
              <button class="select-peer-medium">
                {{ spaceType }}
              </button>
            </div>
            <div id="active-space-selected" v-else>
            </div>
            <div id="flow-styles" v-if="flowMenu === true">
              <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'Lifeboards' }" id="Lifeboards" @click.prevent="setView($event)">
                Lifeboards
              </button>
              <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'Experiment' }" id="Experiments" @click.prevent="setView($event)">
                Experiments
              </button>
              <button class="peer-medium" id="timeline" v-bind:class="{ active: viewFlowtype === 'timeline' }"  @click.prevent="setView($event)">
                Timeline
              </button>
            </div>
          </div>
          <div id="sub-flow-menu">
            <space-menu></space-menu>
          </div>
        </div>
        <div class="flow-menu">
          <div class="live-network-header">
            <div class="network-toolbar">
              <form id="search">
                Search <input name="query" @keyup="textQuery" v-model="searchText">
              </form>
            </div>
            <div class="network-toolbar">
              <new-experiment></new-experiment>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="view-flows" v-if="peerauth === true">
      <!-- <live-lifestyle v-if="spaceType === 'Lifeboards'"></live-lifestyle>-->
      <live-networknxp v-if="spaceType === 'Experiments'"></live-networknxp>
      <!-- <live-timeline v-if="spaceType === 'timeline'"></live-timeline> -->
    </div>
    <!-- <lifeboard-network v-if="lifeView === true"></lifeboard-network> -->
    <experiment-network v-if="nxpView === true"></experiment-network>
  </div>
</template>

<script>
import SpaceMenu from '@/components/spaces/menues/spaceMenu.vue'
import NewExperiment from '@/components/spaces/newExperiment.vue'
// import LiveLifestyle from '@/components/home/LiveLifeboard.vue'
import LiveNetworknxp from '@/components/home/LiveNetwork.vue'
// import LiveTimeline from '@/components/home/LiveTimeline.vue'
// import LifeboardNetwork from '@/components/spaces/grids/LifeboardNetwork.vue'
import ExperimentNetwork from '@/components/spaces/grids/ExperimentNetwork.vue'

export default {
  name: 'Network-Spaces',
  components: {
    SpaceMenu,
    NewExperiment,
    // LiveLifestyle,
    LiveNetworknxp,
    // LiveTimeline,
    // LifeboardNetwork,
    ExperimentNetwork
  },
  computed: {
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    flowviews: function () {
      return this.$store.state.flowviews
    },
    lifeView: function () {
      return this.$store.state.viewLifeboards
    },
    nxpView: function () {
      return this.$store.state.viewNXP
    },
    timeView: function () {
      return this.$store.state.viewTimeline
    },
    spaceState: function () {
      return this.$store.state.spaceState
    },
    spaceType: function () {
      return this.$store.state.spaceType
    }
  },
  data () {
    return {
      viewFlowtype: 'Experiment', // 'lifestyleflow',
      isModalNewLifeboard: false,
      isModalNewNetworkExperiment: false,
      searchText: '',
      newtypeShow: false,
      lifeboardName: '',
      flowMenu: false,
      lifeboardState: 'private'
    }
  },
  methods: {
    setFlow () {
      this.flowMenu = !this.flowMenu
    },
    textQuery () {
      this.$store.dispatch('actionTextquery', this.searchText)
    },
    setView (e) {
      let viewLive = e.target.id
      this.viewFlowtype = e.target.id
      this.$store.dispatch('actionLifeview', viewLive)
      this.flowMenu = !this.flowMenu
    }
  }
}
</script>

<style scoped>
.network-experiments {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  border: 8px dashed green;
}

#toolkit-boards {
  display: grid;
  grid-template-columns: 1fr 10fr;
  background-color: lightgrey;
  position: sticky;
  top: 3em;
  z-index: 25;
  border: 0px dashed blue;
}

.small-logo {
  width: 60px;
}

#peer-views {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: 0px solid red;
}

#flow-type {
  width: 290px;
}

#active-space-selected {
  display: inline;
}

.select-peer-medium {
  font-size: 1.2em;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 6px 14px;
  width: 180px;
  text-align: center;
}

.peer-medium {
  display: grid;
  font-size: 1.2em;
  margin-right: 0em;
  text-align: center;
}

.peer-medium.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  width: 180px;
  text-align: center;
}

#select-flow {
  display: inline;
}

#flow-space {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#flow-styles {
  position: absolute;
  margin-top: -30px;
  margin-left: 70px;
  z-index: 25;
}

.flow-query-new {
}

.live-network-header {
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 0px solid blue;
}

.network-toolbar {
  border: 0px solid red;
}

#sub-flow-menu {
  display: grid;
  align-self: start;
  width: 240px;
}

#view-flows {
  border: 0px solid red;
  height: inherit;
  position: sticky;
  top: 6em;
  z-index: 20;
  border: 1px dashed blue;
}
</style>
