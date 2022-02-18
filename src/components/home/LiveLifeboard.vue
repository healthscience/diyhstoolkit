<template>
  <div class="lifestyle" id="live=lifestyle">
    <div class="lifeflow-spacelist">
      <a class="flowlist-space" v-bind:class="{ active: lifeboardState === 'private' }" href="" @click.prevent="statusLifeboard('private')" >Private</a>
      <a class="flowlist-space" v-bind:class="{ active: lifeboardState === 'public' }" href="" @click.prevent="statusLifeboard('public')" >Public</a>
      <a class="flowlist-showspace" v-bind:class="{ active: showLifeboardList.text === 'listshow' }" href="" @click.prevent="statusLifeboardshow()" > {{ showLifeboardList.text }}</a>
    </div>
    <list-contracts v-if="lifeboardState === 'private' && peerLifeflowListlive !== undefined"
      class="lifeboard-info"
      :lifeboards="peerLifeflowListlive.data"
      :columns="peerLifeflowListlive.columns"
      :filter-key="searchQuery">
    </list-contracts>
    <!-- <lifeboard-join
      class="experiment-info" v-if="lifeflowState === 'public' && networkNXPListlive.data"
      :experiments="networkNXPListlive.data"
      :columns="networkNXPListlive.columns"
      :filter-key="searchQuery">
    </lifeboard-join> -->
  </div>
</template>

<script>
import ListContracts from '@/components/lists/ListLifeboards.vue'

export default {
  name: 'LiveLifestyle',
  components: {
    ListContracts
  },
  props: {
  },
  computed: {
    showLifeboardList: function () {
      return this.$store.state.lifeBoard.lifeboardtListshow
    },
    peerLifeflowListlive: function () {
      return this.$store.state.joinedLifeboard[0]
    },
    searchQuery: function () {
      return this.$store.state.searchQuery
    }
  },
  data () {
    return {
      lifeboardState: 'private',
      lifestyleActive: false,
      worldActive: false
    }
  },
  methods: {
    statusLifeboard (type) {
      this.lifeboardState = type
    },
    statusLifeboardshow () {
      this.$store.dispatch('actionLifeboardList')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  img {
    width: auto;
  }

.flowlist-showspace {
  padding-left: 2em;
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

.lifeflow-spacelist {
  padding: 1em;
}

.lifeboard-info {
  border: 0px solid grey;
  text-align: center;
}

</style>
