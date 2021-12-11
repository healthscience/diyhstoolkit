<template>
  <div class="home">
    <div class="diy-settings">
      <div v-if="peerauth === false" id="diy-summary">
        <header>BentoBox - DaiaR</header>
        <ul>
          <li>1. Interacive visualisations</li>
          <li>2. Join network experiments</li>
          <li>3. Share knowledge with peers & communities</li>
          <li>4. Personal AI - CALE</li>
        </ul>
        <div id="bentobox-datascience">
          <img class="medium-start" alt="bentox data science" src=".././assets/logo.png">
        </div>
      </div>
    </div>
    <div class="network-experiments">
      <div id="toolkit-boards">
        <div class="toolkit-logo">
          <img class="small-logo" alt="logo" src=".././assets/logo.png">
        </div>
        <div id="peer-views" v-if="flowviews === true">
          <ul>
            <li>
              <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'lifestyleflow' }" id="lifestyleflow" @click.prevent="setView($event)">
                Lifeboards
              </button>
              <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'nxp-view' }" id="nxp-view" @click.prevent="setView($event)">
                Network experiments
              </button>
              <button class="peer-medium" id="timeline" v-bind:class="{ active: viewFlowtype === 'timeline' }"  @click.prevent="setView($event)">
                Timeline
              </button>
            </li>
            <li>
              <div class="live-network-header">
                <ul>
                  <li class="network-toolbar">
                    <form id="search">
                      Search <input name="query" @keyup="textQuery" v-model="searchText">
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
            </li>
          </ul>
        </div>
      </div>
      <div id="view-flows">
        <live-lifestyle v-if="viewLifestyleworld === true"></live-lifestyle>
        <live-network v-if="viewNXP === true"></live-network>
        <live-timeline v-if="viewTimeline === true"></live-timeline>
      </div>
      <experiment-network></experiment-network>
      <img class="hop-small" alt="bentox data science" src=".././assets/hoplogosmall.png"> health oracle network
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LiveLifestyle from '@/components/home/LiveLifestyle.vue'
import LiveNetwork from '@/components/home/LiveNetwork.vue'
import LiveTimeline from '@/components/home/LiveTimeline.vue'
import NewNetworkexperiment from '@/components/experiments/NewNetworkExperiment.vue'
import ModuleBuilder from '@/components/grids/moduleBuilder.vue'
import ExperimentNetwork from '@/components/grids/ExperimentNetwork.vue'

export default {
  name: 'home',
  components: {
    LiveNetwork,
    LiveTimeline,
    LiveLifestyle,
    NewNetworkexperiment,
    ModuleBuilder,
    ExperimentNetwork
  },
  computed: {
    connected: function () {
      return this.$store.state.connectStatus
    },
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    flowviews: function () {
      return this.$store.state.flowviews
    }
  },
  data () {
    return {
      viewFlowtype: 'nxp-view',
      viewNXP: true,
      viewTimeline: false,
      viewLifestyleworld: false,
      isModalNewNetworkExperiment: false,
      searchText: ''
    }
  },
  methods: {
    setView (e) {
      let viewLive = e.target.id
      this.viewFlowtype = e.target.id
      if (viewLive === 'nxp-view') {
        this.viewNXP = !this.viewNXP
        this.viewTimeline = false
        this.viewLifestyleworld = false
      } else if (viewLive === 'timeline') {
        this.viewTimeline = !this.viewTimeline
        this.viewNXP = false
        this.viewLifestyleworld = false
      } else if (viewLive === 'lifestyleworld') {
        this.viewLifestyleworld = !this.viewLifestyleworld
        this.viewNXP = false
        this.viewTimeline = false
      }
    },
    textQuery () {
      this.$store.dispatch('actionTextquery', this.searchText)
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

<style>
.home {
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
}
.help-info {
  border: 1px solid orange;
}

.diy-settings {
  margin: 2px;
}

#diy-summary {
  font-size: 1.4em;
}

#diy-summary ul li {
  font: 1.2em;
}

#diy-summary header {
  font-weight: bold;
}

/* Clear floats after the columns */
.diy-settings:after {
  content: "";
  display: table;
  clear: both;
}

.network-info {
  border: 0px solid grey;
}

.diy-help {
  border: 1px solid grey;
}

.network-experiments {
  border: 0px solid orange;
}

img {
  width: 90px;
}

.toolkit-logo {
  float: left;
  margin-left: 2em;
}

.small-logo {
}

.medium-start {
  width: 360px;
}

.hop-small {
  width: 20px;
}

/* Clear floats after the columns */
.network-experiments:after {
  content: "";
  display: table;
  clear: both;
}

.peer-medium {
  font-size: 1.2em;
  margin-right: 1em
}

.peer-medium.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  margin-right: 2em;
  margin-left: 2em;
  text-align: center;
}
</style>
