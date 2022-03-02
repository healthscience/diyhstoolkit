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
    <network-activespaces></network-activespaces>
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
import NetworkActivespaces from '@/components/spaces/networkActivespaces.vue'

export default {
  name: 'home',
  components: {
    ChatInterface,
    NetworkActivespaces
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
    showLifeboardList: function () {
      return this.$store.state.lifeBoard.lifeboardtListshow
    }
  },
  data () {
    return {
    }
  },
  methods: {
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

.live-network-header {
  display: grid;
  grid-template-columns: 4fr 1fr;
}

img {
  width: 60px;
}

.toolkit-logo {
  margin-left: 1em;
}

.small-logo {
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
