<template>
  <div class="network-connectstatus">
    <connect-modal v-show="connectBut.active === true" @close="closeModal">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        <button
          type="button"
          class="btn-green"
          @click="closeModal"
          aria-label="Close modal"
        >
          Close
        </button>
        CONNECT <a href="#" id="disconnect-network" @click="disconnectNetwork">Disconnect</a>
      </template>
      <template v-slot:title-form>
        <header class="connect-info">Health Oracle Network</header>
      </template>
      <template v-slot:connect-network>
        <div id="network-status">
          <div class="status-info">
            Status: <div class="hon-square-status" v-bind:class="{ active: connectNetworkstatus === true && peerauth === true }"></div>
          </div>
          <div class="status-info">
            Warm peers connected: {{ warmPeers.length }}
          </div>
        </div>
      </template>
      <template v-slot:input-form>
        <div id="external-datastores">
          <header class="connect-info">External data source connections</header>
          <div class="external-token-status">
            <header>REST</header>
            <token-reader v-if="peerauth === true" @closeTreader="closeModal"></token-reader>
            <div id="self-in" v-if="peerauth === true">
              <!-- <input v-model="secretPeer" placeholder="public key">
              <input v-model="passwordPeer" placeholder="token"> -->
            </div>
          </div>
          <div class="external-token-status">
            <header>SQLite</header>
              <p>Gadgetbridge</p>
          </div>
        </div>
      </template>
      <template v-slot:submit-form>
        <!-- <button>{{ buttonName }}</button> -->
      </template>
      <template v-slot:peers-warm>
        <connection-lists></connection-lists>
      </template>
    </connect-modal>
  </div>
</template>

<script>
import ConnectModal from '@/components/connect/ConnectModal.vue'
import TokenReader from '@/components/connect/token-reader.vue'
import ConnectionLists from '@/components/connect/connectionLists.vue'
// const remote = require('electron').remote

export default {
  name: 'Network-Connect',
  components: {
    ConnectModal,
    TokenReader,
    ConnectionLists
  },
  computed: {
    connectBut: function () {
      return this.$store.state.networkConnection
    },
    connectNetworkstatus: function () {
      return this.$store.state.connectStatus
    },
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    connectContext: function () {
      return this.$store.state.connectContext
    },
    warmPeers: function () {
      return this.$store.state.warmNetwork
    }
  },
  props: {
    msg: String
  },
  data () {
    return {
      // w: remote.getCurrentWindow(),
      isModalVisible: false,
      buttonName: 'verify token'
    }
  },
  methods: {
    disconnectNetwork () {
      // close peerLINK
      this.$store.dispatch('actionDisconnect')
      // close electron / webapp
      this.w.close()
    },
    closeModal () {
      this.$store.dispatch('actionCloseNetworkModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.network-connectstatus {
}

#network-status {
  display: block;
  font-size: 1.4em;
  border: 0px solid red;
  margin-top: 10px;
}

.status-info {
  display: block;
  margin-left: 30px;
}

.hon-square-status {
  display: inline-block;
  border: 1px solid grey;
  width: 20px;
  height: 20px;
  background-color: red;
}

.hon-square-status.active {
  display: inline-block;
  border: 1px solid grey;
  width: 20px;
  height: 20px;
  background-color: green;
}

#external-datastores {
  display: block;
  border-bottom: 1px solid grey;
}

.external-token-status {
  display: block;
}

.local-sqlite {
  display: block;
}

.connect-info {
  font-size: 1.4em;
}

.network-state {
  display: inline-block;
}

.peer-list-set {
  font-size: 1.4em;
}

.peer-ledgers {
  font-size: 1.4em;
}

.btn {
  font-size: 1.2em;
}

#disconnect-network {
  color: red;
}

.reset {
  clear: both;
}

</style>
