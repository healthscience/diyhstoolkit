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
      <template v-slot:submit-self v-if="selfConnect === 'self-sign' && peerauth === false">
        <div id="connect-wallet">
          <div id="create-wallet">
            <!-- <button id="create-new-wallet" @click=createWallet>create +</button> -->
          </div>
          <div id="self-verify">
            <form id="self-signin-form" >
              <div class="self-inputs">
                <label class="form-couple-type" for="signin-self">Peer name</label>
                <input class="form-couple" type="text" id="usernameself" name="username" v-model="selfsigninInput">
              </div>
              <!-- <div class="self-inputs">
                <label class="form-couple-type" for="password-cloud">password</label>
                <input class="form-couple" type="password" id="passwordcloud" name="password" v-model="selfpwInput">
              </div> -->
              <div class="self-confirm">
                <button id="self-submit" @click.prevent="submitLaunch">
                  Launch
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="self-build-wallet" v-if="selfWallet === 'new-wallet-start'">
          Start new wallet
        </div>
      </template>
      <template v-slot:connect-network>
        <div id="network-status">
          <div class="status-info">
            Connection Status: <div class="hon-square-status" v-bind:class="{ active: connectNetworkstatus === true && peerauth === true }"></div>
          </div>
          <div class="status-info">
            Warm peers connected: {{ warmPeers.length }}
          </div>
          <div v-if="peerauth === true" class="status-info">
            <button class="buttonspaces" @click.prevent="closeModal">go to bento spaces</button>
          </div>
        </div>
      </template>
      <template v-slot:input-form>
        <!-- <div id="external-datastores" v-if="selfConnect === 'signin-self' && peerauth === true">
          <header class="connect-info">External data source connections</header>
          <div class="external-token-status">
            <header>REST</header>
            <token-reader v-if="peerauth === true" @closeTreader="closeModal"></token-reader>
            <div id="self-in" v-if="peerauth === true">
              <input v-model="secretPeer" placeholder="public key">
              <input v-model="passwordPeer" placeholder="token">
            </div>
          </div>
          <div class="external-token-status">
            <header>-</header>
              <p>-</p>
          </div>
        </div> -->
      </template>
      <template v-slot:peers-tabs>
        <connection-lists v-if="peerauth === true"></connection-lists>
      </template>
    </connect-modal>
  </div>
</template>

<script>
import ConnectModal from '@/components/connect/ConnectModal.vue'
// import TokenReader from '@/components/connect/token-reader.vue'
import ConnectionLists from '@/components/connect/connectionLists.vue'

export default {
  name: 'Network-Connect',
  components: {
    ConnectModal,
    // TokenReader,
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
      isModalVisible: false,
      buttonName: 'verify token',
      selfConnect: 'self-sign',
      selfWallet: '',
      selfsigninInput: 'peerspace',
      selfpwInput: ''
    }
  },
  methods: {
    disconnectNetwork () {
      this.$store.dispatch('actionDisconnect')
      window.quit()
    },
    closeModal () {
      this.$store.dispatch('actionCloseNetworkModal')
    },
    createWallet () {
      this.selfWallet = 'new-wallet-start'
    },
    submitLaunch () {
      let peerConnect = {}
      peerConnect.peer = this.selfsigninInput.trim()
      peerConnect.password = this.selfpwInput.trim()
      this.$store.dispatch('actionSelfSignin', peerConnect)
      this.selfsigninInput = ''
      this.selfpwInput = ''
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
  border-bottom: 1px solid lightgrey;
  padding: .5em;
  font-size: 1.4em;
  padding-bottom: 2em;
  height: 100%;
}

.status-info {
  display: block;
  margin-left: 30px;
  padding-top: 1em;
}

.hon-square-status {
  display: inline-block;
  border: 1px solid grey;
  width: 40px;
  height: 20px;
  background-color: red;
}

.hon-square-status.active {
  display: inline-block;
  border: 1px solid grey;
  width: 40px;
  height: 20px;
  background-color: green;
}

#connect-wallet {
  display: grid;
  grid-template-columns: 1fr 9fr;
}

#self-signin-form {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%
}

.self-inputs {
  display: grid;
  grid-template-columns: 200px 400px;
  grid-gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 1em;
  font-size: 1.2em;
}

.self-inputs input {
  font-size: 1.2em;
}

.form-couple-type {
  font-size: 1.2em;
  justify-self: end;
}
.self-confirm {
  display: grid;
  align-items: center;
  justify-content: center;
}

#self-submit {
  font-size: 1.1em;
  width: 200px;
  padding: 1em;
}

#external-datastores {
  display: block;
  border-bottom: 1px solid grey;
  height: auto;
}

.external-token-status {
  display: block;
}

.local-sqlite {
  display: block;
}

.connect-info {
  padding-bottom: 1.2em;
  font-size: 1.4em;
  font-weight: bold;
}

.network-state {
  display: inline-block;
}

.peer-set {
  font-size: 1.4em;
}

.peer-ledgers {
  font-size: 1.4em;
}

.btn {
  font-size: 1.2em;
}

.buttonspaces {
  font-size: 1.4em;
  padding: 0.5em;
}

#disconnect-network {
  color: red;
}

.reset {
  clear: both;
}

</style>
