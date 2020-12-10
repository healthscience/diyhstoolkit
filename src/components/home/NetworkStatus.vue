<template>
  <div class="hello">
    <header>Network Status</header>
    <div id="connection-status"></div>
    <button type="button" class="btn" @click="connectNetwork(connectBut)">{{ connectBut.text }}</button>
    <connect-modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        CONNECT
      </template>
      <template v-slot:title-form>
        {{ connectContext.message }}
      </template>
      <template v-slot:input-form>
        <token-reader v-if="connectContext.type === 'self-verify'" @closeTreader="closeModal"></token-reader>
        <div id="self-in" v-if="connectContext.type === 'self-verify'">
          <input v-model="secretPeer" placeholder="public key">
          <input v-model="passwordPeer" placeholder="token">
        </div>
      </template>
      <template v-slot:submit-form>
        <button>{{ buttonName }}</button>
      </template>
      <template v-slot:peers-warm>
        <button type="button" class="btn" @click="addWarmpeer()">Add new</button>
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
      </template>
      <template v-slot:peers-cold>
        <button>Connect CALE AI</button>
      </template>
      <template v-slot:peer-keys>
        Key management:
        <ul v-for='pk in publicKeysList' :key='pk.id'>
          <li>{{ pk }}</li>
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

export default {
  name: 'Network-Connect',
  components: {
    ConnectModal,
    TokenReader
  },
  computed: {
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
    }
  },
  props: {
    msg: String
  },
  data () {
    return {
      connectBut: {
        active: false,
        type: 'self-verify',
        text: 'Connect'
      },
      isModalVisible: false,
      connectContext:
      {
        type: '',
        message: '',
        footer: ''
      },
      buttonName: 'Connect',
      secretPeer: '',
      passwordPeer: '',
      addWarm: false,
      newPeer: '',
      newPeername: '',
      peerDStore: '',
      replicateList: ['peerlibrary', 'librarynetwork', 'resultspeer', 'kblpeer']
    }
  },
  methods: {
    connectNetwork (typeConnect) {
      this.isModalVisible = true
      console.log('connect')
      console.log(typeConnect)
      if (typeConnect === 'connect') {
        this.connectContext.type = 'connect'
        this.connectContext.message = 'Anno. connect to network'
        this.buttonName = 'Annon. connect'
        const refContract = {}
        refContract.reftype = 'datatype'
        refContract.action = 'GET'
        const refCJSON = JSON.stringify(refContract)
        this.$store.dispatch('actionGetRefContract', refCJSON)
      } else if (typeConnect.type === 'self-verify') {
        this.connectBut.text = 'edit-connections'
        this.connectBut.type = 'self-verify'
        this.connectContext.type = 'self-verify'
        this.connectContext.message = 'Self verify keys'
        this.buttonName = ''
        // ask peerlink for public keys
        this.$store.dispatch('actionKeymanagement')
        // list of active peers
        this.$store.dispatch('actionWarmPeers')
      } else if (typeConnect.type === 'disconnectTestnetwork') {
        this.isModalVisible = false
        this.connectBut.text = 'Sign-in to Testnetwork'
        this.connectBut.type = 'self-testnetwork'
        this.connectContext.type = 'testnetwork'
        this.connectContext.message = 'TestNetwork'
        this.buttonName = ''
      }
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
    peerSyncLibrary (pubkey) {
      // pass on public key to peerlink and sync datastore for this peer
      this.$store.dispatch('actionPeersyncLibrary', pubkey)
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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

</style>
