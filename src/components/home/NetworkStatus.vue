<template>
  <div class="network-connectstatus">
    <connect-modal v-show="connectToolstatus" @close="closeModal">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        CONNECT <a href="#" id="disconnect-network" @click="disconnectNetwork">Disconnect</a>
      </template>
      <template v-slot:title-form>
        <header class="connect-info">Health Oracle Network</header>
      </template>
      <template v-slot:connect-network>
        <div id="network-status">
          <div class="status-info">
            Status: <div class="hon-square-status"></div>
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
            <token-reader v-if="connectContext.type === 'self-verify'" @closeTreader="closeModal"></token-reader>
            <div id="self-in" v-if="connectContext.type === 'self-verify'">
              <!-- <input v-model="secretPeer" placeholder="public key">
              <input v-model="passwordPeer" placeholder="token"> -->
            </div>
          </div>
          <div class="external-token-status">
            <header>SQLite</header>
            <ul>
              <li>
                gadgetbridge
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template v-slot:submit-form>
        <!-- <button>{{ buttonName }}</button> -->
      </template>
      <template v-slot:peers-warm>
        <div id="peer-social-network">
          <button type="button" class="btn" @click.prevent="addWarmpeer()">Add new</button>
          <div v-if="addWarm === true" id="add-warm-peer">
            <input v-model="newPeername" placeholder="name">
            <input v-model="newPeer" placeholder="public key">
            <ul v-if="replicateList.length > 0">
              <label for="datastore-select"></label>
              <select class="select-yaxis-id" id="datastore-select-rep" v-model="peerDStore">
                <option value="none" selected="">please select</option>
                <option v-for="ds in replicateList" :key="ds.id" v-bind:value="ds">
                {{ ds }}
                </option>
              </select>
            </ul>
            <button type="button" class="btn" @click="addWarmNetwork()">save</button>
          </div>
          <ul v-for='peer in warmPeers' :key='peer.id'>
            <li>Peer {{ peer }} <button type="button" class="btn" @click="peerSyncLibrary(peer.publickey)">Replicate</button></li>
          </ul>
        </div>
      </template>
      <template v-slot:peers-cold>
        <!-- <button>Connect CALE AI</button> -->
      </template>
      <template v-slot:peer-keys>
        <div v-if="swarmState === true" id="open-connect">Public Library OPEN for replication</div>
        <ul v-for='pk in publicKeysList' :key='pk.id'>
          <li>{{ pk }} <button type="button" class="btn" @click="openReplication(pk)">sync</button></li>
        </ul>
      </template>
      <template v-slot:replicate-library>
        Replicate library:
        <input v-model="peerSynckey" placeholder="public key">
        <button type="button" class="btn" @click="peerSyncLibrary()">Sync Library</button>
      </template>
    </connect-modal>
  </div>
</template>

<script>
import ConnectModal from '@/components/connect/ConnectModal.vue'
import TokenReader from '@/components/connect/token-reader.vue'
// const remote = require('electron').remote

export default {
  name: 'Network-Connect',
  components: {
    ConnectModal,
    TokenReader
  },
  computed: {
    connectToolstatus: function () {
      return this.$store.state.connectStatus
    },
    connectContext: function () {
      return this.$store.state.connectContext
    },
    authState: function () {
      return this.$store.state.authorised
    },
    publicKeysList: function () {
      return this.$store.state.publickeys
    },
    publicKeysIndex: function () {
      return this.$store.state.publickeysIndex
    },
    warmPeers: function () {
      return this.$store.state.warmNetwork
    },
    swarmState: function () {
      return this.$store.state.swarmStatus
    }
  },
  props: {
    msg: String
  },
  data () {
    return {
      // w: remote.getCurrentWindow(),
      isModalVisible: false,
      buttonName: 'verify token',
      /* connectContext:
      {
        type: '',
        message: '',
        footer: ''
      }, */
      secretPeer: '',
      passwordPeer: '',
      addWarm: false,
      newPeer: '',
      newPeername: '',
      peerDStore: '',
      replicateList: ['peerlibrary', 'librarynetwork', 'resultspeer', 'kblpeer'],
      peerSynckey: ''
    }
  },
  methods: {
    disconnectNetwork () {
      // close peerLINK
      this.$store.dispatch('actionDisconnect')
      // close electron / webapp
      this.w.close()
    },
    addWarmpeer () {
      this.addWarm = !this.addWarm
    },
    addWarmNetwork () {
      let peerHolder = {}
      peerHolder.name = this.newPeername
      peerHolder.publickey = this.newPeer
      peerHolder.datastore = this.peerDStore
      const peerContract = {}
      peerContract.type = 'library'
      peerContract.reftype = 'peer-add'
      peerContract.action = 'PUT'
      peerContract.data = peerHolder
      const peerCJSON = JSON.stringify(peerContract)
      console.log(peerCJSON)
      this.$store.dispatch('actionAddwarmPeer', peerCJSON)
      this.newPeername = ''
      this.newPeer = ''
      this.peerDStore = ''
      this.addWarm = false
    },
    openReplication (info) {
      console.log('open close replication for data store')
      console.log(info)
      this.$store.dispatch('actionOpenLibrary', info)
    },
    peerSyncLibrary (pubkey) {
      // pass on public key to peerlink and sync datastore for this peer
      this.$store.dispatch('actionPeersyncLibrary', pubkey)
    },
    closeModal () {
      this.$store.dispatch('actionLiveConnect')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.network-connectstatus {
}

#network-status {
  font-size: 1.4em;
  border: 0px solid red;
  margin-top: 10px;
}

.status-info {
  display: inline-block;
  margin-left: 30px;
}

.hon-square-status {
  display: inline-block;
  border: 1px solid grey;
  width: 20px;
  height: 20px;
  background-color: green;
}

#external-datastores {
  margin: 30px;
}

.external-token-status {
  margin-top: 30px;
}

#peer-social-network {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.connect-info {
  font-size: 1.4em;
}

.network-state {
  display: inline-block;
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
