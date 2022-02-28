<template>
  <div class="home">
    <div class="diy-settings">
      <div v-if="peerauth === false" id="diy-summary">
        <header>BentoBox - DS</header>
        <ul>
          <li>1. Interacive visualisations</li>
          <li>2. Join network experiments</li>
          <li>3. Share with peers & communities</li>
          <li>4. Personal AI - CALE</li>
        </ul>
        <div id="interface">
          <div id="cale-ai">
            <div id="cale-interface" v-if="caleAIStatus.active === true">
              <div class="ci-space"></div>
              <img class="medium-start-cale" alt="caleAI" src=".././assets/caleailogo.png">
              <chat-interface></chat-interface>
            </div>
          </div>
          <div id="bentobox-datascience" v-if="caleAIStatus.active !== true">
            <img class="medium-start" alt="bentox data science" src=".././assets/logo.png">
          </div>
        </div>
      </div>
    </div>
    <div class="network-experiments">
      <div id="toolkit-boards" v-if="peerauth === true">
        <div class="toolkit-logo">
          <img class="small-logo" alt="logo" src=".././assets/logo.png">
        </div>
        <div id="peer-views" v-if="flowviews === true">
          <div class="flow-menu">
            <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'lifestyleflow' }" id="lifestyleflow" @click.prevent="setView($event)">
              Lifeboards
            </button>
            <button class="peer-medium" v-bind:class="{ active: viewFlowtype === 'nxp-view' }" id="nxp-view" @click.prevent="setView($event)">
              Experiments
            </button>
            <button class="peer-medium" id="timeline" v-bind:class="{ active: viewFlowtype === 'timeline' }"  @click.prevent="setView($event)">
              Timeline
            </button>
          </div>
          <div class="flow-menu">
            <div class="live-network-header">
              <div class="network-toolbar">
                <form id="search">
                  Search <input name="query" @keyup="textQuery" v-model="searchText">
                </form>
              </div>
              <div class="network-toolbar">
                <button type="button" class="btn" @click="newType()">new</button>
                <div id="new-type" v-if="newtypeShow === true">
                  <button type="button" class="btn-new" @click="newExperiment('lifeboard')">lifeboard</button>
                  <button type="button" class="btn-new" @click="newExperiment('experiment')">experiment</button>
                </div>
                <new-lifeboard v-show="isModalNewLifeboard" @close="closeModalNewLB">
                  <template v-slot:header>
                  <!-- The code below goes into the header slot -->
                    NEW LIFEBOARD
                  </template>
                  <template v-slot:body>
                    <div class="scale-item">
                    New <input name="query" v-model="lifeboardName">
                  <button class="new-lifeboard" @click.prevent="saveLifeboard()">save</button>
              </div>
                  </template>
                </new-lifeboard>
                <new-networkexperiment v-show="isModalNewNetworkExperiment" @closeNnxp="closeModalNewN1">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="view-flows" v-if="peerauth === true">
        <live-lifestyle v-if="lifeView === true"></live-lifestyle>
        <live-networknxp v-if="nxpView === true"></live-networknxp>
        <live-timeline v-if="timeView === true"></live-timeline>
      </div>
      <lifeboard-network v-if="lifeView === true"></lifeboard-network>
      <experiment-network v-if="nxpView === true"></experiment-network>
    </div>
    <div class="network-protocol">
      <img class="hop-small" alt="bentox data science" src=".././assets/hoplogosmall.png">
      <div id="health-oracle-protocol">
        HOP v0.7.3.1
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatInterface from '@/components/caleai/chatInterface.vue'
import LiveLifestyle from '@/components/home/LiveLifeboard.vue'
import LiveNetworknxp from '@/components/home/LiveNetwork.vue'
import LiveTimeline from '@/components/home/LiveTimeline.vue'
import NewLifeboard from '@/components/lifeboard/NewLifeboard.vue'
import NewNetworkexperiment from '@/components/experiments/NewNetworkExperiment.vue'
import ModuleBuilder from '@/components/grids/moduleBuilder.vue'
import LifeboardNetwork from '@/components/grids/LifeboardNetwork.vue'
import ExperimentNetwork from '@/components/grids/ExperimentNetwork.vue'

export default {
  name: 'home',
  components: {
    ChatInterface,
    LiveLifestyle,
    LiveNetworknxp,
    LiveTimeline,
    NewLifeboard,
    NewNetworkexperiment,
    ModuleBuilder,
    LifeboardNetwork,
    ExperimentNetwork
  },
  computed: {
    connected: function () {
      return this.$store.state.connectStatus
    },
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    caleAIStatus: function () {
      return this.$store.state.aiInterface.statusCALE
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
    }
  },
  data () {
    return {
      viewFlowtype: 'nxp-view', // 'lifestyleflow',
      isModalNewLifeboard: false,
      isModalNewNetworkExperiment: false,
      searchText: '',
      newtypeShow: false,
      lifeboardName: ''
    }
  },
  methods: {
    setView (e) {
      let viewLive = e.target.id
      this.viewFlowtype = e.target.id
      this.$store.dispatch('actionLifeview', viewLive)
    },
    textQuery () {
      this.$store.dispatch('actionTextquery', this.searchText)
    },
    newType () {
      this.newtypeShow = !this.newtypeShow
    },
    saveLifeboard () {
      this.$store.dispatch('actionSaveLifeboard', this.lifeboardName)
    },
    newExperiment (type) {
      if (type === 'experiment') {
        this.isModalNewNetworkExperiment = true
        // create a set of modules and save if contributed
        this.$store.dispatch('actionMakeModuleRefContract')
      } else if (type === 'lifeboard') {
        this.isModalNewLifeboard = true
      }
      this.newtypeShow = !this.newtypeShow
    },
    closeModalNewLB () {
      // this.$store.dispatch('actionClear')
      this.isModalNewLifeboard = false
    },
    closeModalNewN1 () {
      // clear the form
      this.$store.dispatch('actionClearContributeNXP')
      this.isModalNewNetworkExperiment = false
    },
    contributeNXP () {
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
  display: grid;
  grid-template-columns: 1fr;
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
}

.network-info {
  border: 0px solid grey;
}

.diy-help {
  border: 1px solid grey;
}

.live-network-header {
  display: grid;
  grid-template-columns: 4fr 1fr;
}

.network-experiments {
  display: grid;
  grid-template-columns: 1fr;
}

#toolkit-boards {
  display: grid;
  grid-template-columns: 1fr 6fr;
}

img {
  width: 60px;
}

.toolkit-logo {
  margin-left: 1em;
}

.small-logo {
}

#peer-views {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

#interface {
  display: grid;
  grid-template-columns: auto 1fr;
}

.medium-start {
  width: 300px;
}

.medium-start-cale {
  width: 200px;
  align-self: center;
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

.flow-menu {
  padding-top: 1em;
}

#search input{
  width: 20em;
}

#cale-interface {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
}

#view-flows {
  display: grid;
  grid-template-columns: 1fr;
  margin-left: 2em;
}

#new-type {
  position: absolute;
  margin-left: -134px;
}

.btn {
  font-size: 1.2em;
  border: none;
  padding: 6px 14px;
}

.btn-new {
  font-size: 1.2em;
  background-color: white; /*#4CAF50; /* Green */
  border: 1px solid lightgrey;
  color: black;
  padding: 6px 14px;
  margin-right: 2em;
  margin-left: 2em;
  min-width: 10em;
  text-align: center;
}

.btn-new:hover {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  margin-right: 2em;
  margin-left: 2em;
  min-width: 10em;
  text-align: center;
}

.network-protocol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  justify-self: center;
}

#health-oracle-protocol {
  align-self: center;
}
</style>
