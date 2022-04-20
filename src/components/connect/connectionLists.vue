<template>
  <div id="connection-lists">
    <div id="peer-social-network">
      <div id="tabs-component">
        <div class="spacer-component-tab"></div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'peers' }"
          v-on:click="selectTab('peers')"
        >
          Peers
        </div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'datastores' }"
          v-on:click="selectTab('datastores')"
        >
          Datastores
        </div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'ai' }"
          v-on:click="selectTab('ai')"
        >
          AI
        </div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'wallets' }"
          v-on:click="selectTab('wallets')"
        >
          Wallet
        </div>
        <div class="spacer-component-tab"></div>
      </div>
      <div id="list-content">
        <div class="list-space" id="peer-list" v-if="listContext === 'peers'">
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
          <ul class="peer-list-set" v-for='peer in warmPeers' :key='peer.id'>
            <li>Peer {{ peer.datastore }} --- {{ peer.name }} --- {{ peer.publickey }}
              <!-- <button type="button" class="btn" @click="peerSyncLibrary(peer.publickey)">Replicate</button> -->
            </li>
          </ul>
        </div>
        <div class="list-space" id="ai-list" v-if="listContext === 'ai'">
          <div id="ai-peers">
          </div>
        </div>
        <datastore-list v-if="listContext === 'datastores'"></datastore-list>
        <div class="list-space" id="wallet-list" v-if="listContext === 'wallets'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatastoreList from '@/components/connect/datastores/listStores.vue'

export default {
  name: 'list-connections',
  components: {
    DatastoreList
  },
  props: {
  },
  created () {
  },
  mounted () {
  },
  computed: {
    publicKeysList: function () {
      let displayKeys = []
      for (let keyi of this.$store.state.publickeys) {
        let keyInfo = {}
        let keyName = Object.keys(keyi)
        keyInfo.keyname = keyName[0]
        keyInfo.pubkey = keyi[keyInfo.keyname]
        displayKeys.push(keyInfo)
      }
      return displayKeys
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
  data: () => ({
    tab:
    {
      isActive: false,
      isDisabled: true
    },
    listContext: 'peers',
    addWarm: false,
    newPeer: '',
    newPeername: '',
    secretPeer: '',
    passwordPeer: '',
    peerDStore: '',
    replicateList: ['peerlibrary', 'librarynetwork', 'resultspeer', 'kblpeer'],
    peerSynckey: ''
  }),
  methods: {
    selectTab (ls) {
      this.listContext = ls
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
      this.$store.dispatch('actionAddwarmPeer', peerCJSON)
      this.newPeername = ''
      this.newPeer = ''
      this.peerDStore = ''
      this.addWarm = false
    }
  }
}
</script>

<style scoped>
#connection-lists {
  display: block;
  height: auto;
}
#tabs-component {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr;
  height: auto;
}

.grid-component-tab {
  border-top: 2px solid grey;
  border-left: 2px solid grey;
  border-right: 2px solid grey;
  font-size: 1.2em;
  padding: 1em;
}

.grid-component-tab.active {
 background-color: lightgrey;
}

.is-disabled {
  background: white;
}

#list-content {
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  min-height: 240px;
  background-color: lightgrey;
  font-size: 1.2em;
  height: auto;
}

.list-space {
  display: block;
  height: auto;
  padding-top: 2em;
}
#peer-social-network {
  display: block;
  height: 100%;
  border-bottom: 1px solid grey;
  margin-top: 0px;
}

#peer-social-network header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}

#peers-listkeys {
  display: block;
  border-bottom: 1px solid grey;
}

#peers-listkeys header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}

#ai-peers {
  border-bottom: 1px solid grey;
}

#ai-peers header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
