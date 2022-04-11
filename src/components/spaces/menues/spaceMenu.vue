<template>
  <div id="space-menu-area">
    <div class="lifeflow-spacelist">
      <a class="flowlist-space" v-bind:class="{ active: spaceState === 'private' }" href="" @click.prevent="statusSpace('private')" >Private</a>
      <a class="flowlist-space" v-bind:class="{ active: spaceState === 'public' }" href="" @click.prevent="statusSpace('public')" >Public </a>
      <a href="" class="flowlist-space-plain" v-bind:class="{ active: spaceStateShow.text === 'show' }" @click.prevent="statusSpaceshow()" > {{ spaceStateShow.text }}</a>
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
  grid-template-columns: 1fr 1fr 1fr;
}

.flowlist-showspace {
  padding-left: 1em;
}

.flowlist-space {
  margin-left: 0.5em;
  border: 0px solid red;
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
