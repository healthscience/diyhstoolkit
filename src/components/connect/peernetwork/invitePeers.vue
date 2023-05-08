<template>
  <div class="invite-tools">
    Please invite these peers
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
</template>

<script>

export default {
  name: 'Peers-Invite',
  components: {
  },
  computed: {
    connectPeers: function () {
      return this.$store.state.peerList
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
      addWarm: false,
      replicateList: ['board', 'peerlibrary', 'librarynetwork', 'resultspeer', 'kblpeer']
    }
  },
  methods: {
    addWarmpeer () {
      this.addWarm = !this.addWarm
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invite-tools {
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>
