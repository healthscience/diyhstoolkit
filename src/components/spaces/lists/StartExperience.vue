<template>
  <div id="grid-start">
    <div id="demo-data">Hello, click button to replicate demo data</div>
    <div id="replicate-librarydatastore">
      <button v-if="replicateStatus.data.replicate !== true" type="button" class="btn" @click="peerSyncPublicLibrary()">Get demo data</button>
      <div id="replicate-feedback" v-if="replicateStatus">
        <!-- <button v-if="replicateStatus.data.replicate === true" type="button" class="btn" @click="viewReplicatePubLib()">View synced public library</button> -->
      </div>
    </div>
    <div id="listpeer-publiclibrary" v-if="networkNXPListlive">
      Demo data
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
      peerSynckey: '5ba68eb298f548d6e955987e70acf1fb3dfc5698038bb6d53b0cd79ed037a4c4'
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
