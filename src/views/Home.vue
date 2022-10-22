<template>
  <div class="home">
    <div class="diy-settings">
      <div v-if="peerauth === false" id="diy-summary">
        <header>BentoBox - DS</header>
        <ul>
          <li>1. Peer to Peer Data Science</li>
          <li>2. Charting Time Analysis</li>
          <li>3. Private or Collaborate</li>
          <li>4. Personal AI</li>
        </ul>
        <div id="interface">
          <div id="cale-ai">
            <div id="cale-interface" v-if="caleAIStatus.active === true">
              <div class="ci-space"></div>
              <!-- <img class="medium-start-cale" alt="caleAI" src=".././assets/caleailogo.png"> -->
              <chat-interface></chat-interface>
            </div>
          </div>
          <div id="bentobox-datascience" v-if="caleAIStatus.active !== true">
            <img class="medium-start" alt="bentox data science" src=".././assets/logo.png">
          </div>
        </div>
      </div>
      <div id="connection-message" v-if="socketClosed ===  true">
        Connecting to the HOP .. .. .
      </div>
    </div>
    <network-activespaces></network-activespaces>
    <div class="network-protocol">
      <img class="hop-small" alt="bentox data science" src=".././assets/hoplogosmall.png">
      <div id="health-oracle-protocol">
        BB-v0.7.6 HOP-v0.9.25
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatInterface from '@/components/bbai/chatInterface.vue'
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
    socketClosed: function () {
      return this.$store.state.socketClosed
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

<style scoped>
.home {
  display: grid;
  /* grid-template-columns: 1fr; */
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  height: 100%;
  width: 96vw;
  /* overflow: visible; */
  border: 0px dashed red;
}

.diy-settings {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  margin-top: 20px;
  margin-left: 10em;
  position: fixed;
  top: 3em;
  z-index: 11;
  border: 0px dashed black;
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

.live-network-header {
  display: grid;
  grid-template-columns: 4fr 1fr;
}

img {
  width: 60px;
}

.medium-start {
  width: 160px;
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

#interface {
  display: grid;
  grid-template-columns: auto 1fr;
}

#cale-interface {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
}

#connection-message {
  font-size: 2em;
  background-color: #ffcccb;
  height: 2em;
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
