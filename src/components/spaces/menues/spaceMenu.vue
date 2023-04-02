<template>
  <div id="space-menu-area">
    <div class="lifeflow-spacelist">
      <button class="flowlist-space" v-bind:class="{ active: spaceState === 'private' && spaceStateShow.state === true }" href="" @click.prevent="statusSpace('private')" >List</button>
      <button type="button" class="flowlist-space" @click="joinBoard">Join</button>
      <button type="button" class="flowlist-space" @click="boardInvite">+ Invite</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SpaceMenu',
  components: {
  },
  computed: {
    spaceState: function () {
      return this.$store.state.spaceState
    },
    spaceStateShow: function () {
      return this.$store.state.spaceStateShow
    }
  },
  data () {
    return {
    }
  },
  methods: {
    statusSpace (sp) {
      this.$store.dispatch('actionLifeview', 'Boards')
      this.$store.dispatch('actionSpaceList', sp)
      this.$store.dispatch('actionSpaceListShow', true)
    },
    joinBoard () {
      this.$store.dispatch('actionLifeview', 'publicexperiments')
      this.$store.dispatch('actionSpaceList', 'public')
      this.$store.dispatch('actionSpaceJoinListShow', false)
    },
    boardInvite () {
      console.log('invite peers to board')
      this.$store.dispatch('actionLifeview', 'invite')
    }
  }
}
</script>

<style scoped>
.lifeflow-spacelist {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.flowlist-showspace {
  padding-left: 1em;
}

.flowlist-space {
  font-size: 1.2em;
  margin-left: 0.5em;
  padding: 6px 14px;
  margin-right: 1em;
  margin-left: 1em;
}

.flowlist-space.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  margin-right: 1em;
  margin-left: 1em;
  text-align: center;
}
</style>
