<template>
  <div id="datastore-lists">
    <div class="list-space" id="datastore-list">
      <div id="peers-listkeys">
          <div v-if="swarmState === true" id="open-connect">Public Library OPEN for replication
          </div>
          <div id="drive-pubkey">
            Drive key: {{ publickeyDrive }}
            </div>
          <ul class="peer-ledgers" v-for='pk in publicKeysList' :key='pk.id'>
            <li>{{ pk.keyname }} pubkey- {{ pk.pubkey }}
            <!-- <button type="button" class="btn" @click="openReplication(pk)">sync</button> -->
            </li>
          </ul>
        </div>
        <div id="replicate-librarydatastore">
          <header>Network Library</header>
          Replicate library:
          <input v-model="peerSynckey" placeholder="public key">
          <button type="button" class="btn" @click="peerSyncPublicLibrary()">Sync Library</button>
          <div id="replicate-feedback" v-if="replicateStatus">
            <button v-if="replicateStatus.data.replicate === true" type="button" class="btn" @click="viewReplicatePubLib()">View synced public library</button>
          </div>
        </div>
    </div>
    <div id="listpeer-publiclibrary" v-if="networkNXPListlive">
      Peers friends public library
      <button type="button" class="btn" @click="removePublicLibrary()">Remove</button>
      <experimentnetwork-join
        class="experiment-info" v-if="networkNXPListlive.data"
        :experiments="networkNXPListlive.data"
        :columns="networkNXPListlive.columns"
        >
      </experimentnetwork-join>
    </div>
  </div>
</template>

<script>
import ExperimentnetworkJoin from '@/components/spaces/grids/input/ExperimentNetworkReplicate.vue'

export default {
  name: 'list-datastores',
  components: {
    ExperimentnetworkJoin
  },
  props: {
  },
  created () {
  },
  mounted () {
  },
  computed: {
    publickeyDrive: function () {
      return this.$store.state.publickeyHyperdrive
    },
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
    swarmState: function () {
      return this.$store.state.swarmStatus
    },
    replicateStatus: function () {
      return this.$store.state.replicatePubliclibrary
    },
    networkNXPListlive: function () {
      // another peers public library list of contracts
      return this.$store.state.replicateNXPexperimentList
    }
  },
  data: () => ({
    peerSynckey: ''
  }),
  methods: {
    openReplication (info) {
      console.log('open close replication for data store')
      console.log(info)
      this.$store.dispatch('actionOpenLibrary', info)
    },
    peerSyncPublicLibrary () {
      // pass on public key to peerlink and sync datastore for this peer
      console.log(this.peerSynckey)
      this.$store.dispatch('actionPeersyncLibrary', this.peerSynckey)
    },
    viewReplicatePubLib () {
      this.$store.dispatch('actionViewSyncLibrary', 'replicate-publiclibrary')
    },
    removePublicLibrary () {
      this.$store.dispatch('actionRemoveTempNLibrary', 'remove-temppubliclibrary')
    }
  }
}
</script>

<style scoped>
#datastore-lists {
  display: block;
  height: auto;
}

#replicate-librarydatastore {
  display: block;
  border-bottom: 1px solid grey;
}

#replicate-librarydatastore header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
