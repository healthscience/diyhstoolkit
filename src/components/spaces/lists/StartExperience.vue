<template>
  <div id="grid-start">
    <div id="demo-data">Hello start experiencedemo data</div>
    <div id="replicate-librarydatastore">
      Replicate library:
      <input v-model="peerSynckey" placeholder="public key">
      <button type="button" class="btn" @click="peerSyncPublicLibrary()">Sync Library</button>
      <div id="replicate-feedback" v-if="replicateStatus">
        <button v-if="replicateStatus.data.replicate === true" type="button" class="btn" @click="viewReplicatePubLib()">View synced public library</button>
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
import ExperimentnetworkJoin from '@/components/spaces/grids/ExperimentNetworkReplicate.vue'

export default {
  name: 'start-experience',
  components: {
    ExperimentnetworkJoin
  },
  created () {
  },
  mounted () {
  },
  props: {
  },
  computed: {
    replicateStatus: function () {
      return this.$store.state.replicatePubliclibrary
    },
    networkNXPListlive: function () {
      // another peers public library list of contracts
      return this.$store.state.replicateNXPexperimentList
    }
  },
  data () {
    return {
      peerSynckey: ''
    }
  },
  methods: {
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
#grid-start {
  display: grid;
  grid-template-columns: 1fr;
  width: 96%;
  margin-top: 60em;
  border: 2px solid red;
}

#demo-data {
  margin-top: 4em;
  border: 2px solid red;
}
</style>
