<template>
  <div class="network-experiments">
    <div id="toolkit-boards" v-if="peerauth === true"> <!--z18 -->
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
            <div id="flow-styles" v-if="flowMenu === true"><!--z26 -->
              <!-- <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'Lifeboards' }" id="Lifeboards" @click.prevent="setView($event)">
                Lifeboards
              </button> -->
              <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'Experiment' }" id="Boards" @click.prevent="setView($event)">
                Boards
              </button>
              <!-- <button class="peer-medium" id="timeline" v-bind:class="{ active: viewFlowtype === 'timeline' }"  @click.prevent="setView($event)">
                Timeline
              </button> -->
            </div>
          </div>
          <div id="sub-flow-menu">
            <space-menu></space-menu>
          </div>
        </div>
        <div class="flow-menu">
          <div class="live-network-header">
            <div class="network-toolbar">
              <form id="search-form">
                Search <input id="query-input" name="query" @keyup="textQuery" v-model="searchText">
              </form>
            </div>
            <div class="network-toolbar" id="new-button-top">
              <new-experiment></new-experiment>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="list-flows" v-if="peerauth === true"> <!--z25 -->
      <!-- <live-lifestyle v-if="spaceType === 'Lifeboards'"></live-lifestyle>-->
      <live-networknxp v-if="spaceType === 'Boards' && spaceState === 'private'"></live-networknxp>
      <public-networknxp v-if="spaceType === 'publicexperiments' && spaceState === 'public'"></public-networknxp>
      <!-- <live-timeline v-if="spaceType === 'timeline'"></live-timeline> -->
    </div>
    <!-- <lifeboard-network v-if="lifeView === true"></lifeboard-network> -->
    <bento-grid v-if="nxpView === true"></bento-grid>
  </div>
</template>

<script>
import SpaceMenu from '@/components/spaces/menues/spaceMenu.vue'
import NewExperiment from '@/components/bentoboard/new/newExperiment.vue'
// import LiveLifestyle from '@/components/home/LiveLifeboard.vue'
import LiveNetworknxp from '@/components/home/LiveNetwork.vue'
import PublicNetworknxp from '@/components/home/PublicNetwork.vue'
// import LiveTimeline from '@/components/home/LiveTimeline.vue'
// import LifeboardNetwork from '@/components/spaces/grids/LifeboardNetwork.vue'
import BentoGrid from '@/components/spaces/grids/bentoGrid.vue'

export default {
  name: 'Network-Spaces',
  components: {
    SpaceMenu,
    NewExperiment,
    // LiveLifestyle,
    LiveNetworknxp,
    PublicNetworknxp,
    // LiveTimeline,
    // LifeboardNetwork,
    BentoGrid
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
  border: 0px dashed green;
}

#toolkit-boards {
  display: grid;
  grid-template-columns: 1fr 10fr;
  background-color: white;
  position: fixed;
  top: 3em;
  border-top: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  padding-top: 0em;
  z-index: 32;
}

.small-logo {
  width: 50px;
  height: 50px;
}

#peer-views {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: 0px solid red;
  align-items: center;
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
  z-index: 26;
}

.flow-menu {
  border: 0px solid red;
}

#sub-flow-menu {
  display: grid;
  align-self: start;
  width: 240px;
}

.network-toolbar {
  display: grid;
}

.live-network-header {
  display: grid;
  grid-template-columns: 3fr 1fr;
}

#search-form {
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: start;
  align-self: start;
}

#query-input {
  font-size: 1.2em;
}

#new-button-top {
  z-index: 32;
}

#list-flows {
  height: inherit;
  position: fixed;
  top: 6.8em;
  margin-left: 10px;
  z-index: 29;
  border: 0px dashed blue;
}
</style>
