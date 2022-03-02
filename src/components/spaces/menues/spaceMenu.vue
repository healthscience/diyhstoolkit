<template>
  <div id="space-menu-area">
    <div class="lifeflow-spacelist">
      <a class="flowlist-space" v-bind:class="{ active: spaceState === 'private' }" href="" @click.prevent="statusSpace('private')" >Private</a>
      <a class="flowlist-space" v-bind:class="{ active: spaceState === 'public' }" href="" @click.prevent="statusSpace('public')" >Public</a>
      <a class="flowlist-showspace" v-bind:class="{ active: spaceStateShow.text === 'show' }" href="" @click.prevent="statusSpaceshow()" > {{ spaceStateShow.text }}</a>
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
      this.$store.dispatch('actionSpaceList', sp)
    },
    statusSpaceshow () {
      this.$store.dispatch('actionSpaceListShow')
    }
  }
}
</script>

<style scoped>
.lifeflow-spacelist {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
}

.flowlist-showspace {
  padding-left: 1em;
}

.flowlist-space {
  align-self: start;
}

.flowlist-space.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  margin-right: 2em;
  margin-left: 2em;
  text-align: center;
}
</style>
