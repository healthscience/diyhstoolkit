<template>
  <div class="story-tools-holder">
    <div id="story-toolbar">
      <ul>
        <li class="tools-stage">
          <a @click.prevent="listStory" href="" class="story-button">list</a>
        </li>
        <li class="tools-stage">
          <a @click.prevent="newStory" href="" class="story-button">new</a>
        </li>
        <li class="tools-story">
          Record</li>
        <li>
          <button @click.prevent="startStory" class="button is-primary">Play story</button>
        </li>
      </ul>
    </div>
    <div v-if="storyListlive === true" id="story-list">
      <header>List of saved stories</header>
      <ul v-for="storyi of liveStorylist" :key="storyi.id" v-bind:value="storyi">
        <li class="story-list-live">
          {{ storyi.name }}
          <button @click.prevent="viewStory(storyi.id)" class="button is-primary">view</button>
        </li>
      </ul>
    </div>
    <div v-if="stageView === true" id="story-stages-summary">
      Story name: {{ storyName }}
      <ul>
        <li class="tools-stage">
          <a @click.prevent="addStorystage" href="" class="story-button">add</a>
        </li>
      </ul>
      <ul v-for="stagei in storyStages" :key='stagei.id'>
        <li class="story-stage">
          <story-stage :stageID="stagei"></story-stage>
        </li>
      </ul>
      <div class="clearFloat"></div>
    </div>
    <div v-if="viewBuildtools === true" id="new-story-holder">
      <div id="setup-new-story">
        <form id="story-name">
          <label>Story Name</label>
          <input name="query" v-model="storyName" @input="storyNameText" @change="storyNameText">
        </form>
      </div>
      <a @click.prevent="addStorystage" href="" class="story-button">add stage</a>
      <story-buildstage :stageActive="addStageactive"></story-buildstage>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StoryBuildstage from '@/components/spaces/grids/story/buildStage.vue'
import StoryStage from '@/components/spaces/grids/story/viewStage.vue'

export default {
  name: 'StoryTools',
  components: {
    StoryStage,
    StoryBuildstage
  },
  computed: {
    liveStorylist () {
      return this.$store.state.storyLive
    },
    storyStages () {
      return this.$store.state.storyStages
    }
  },
  data: () => ({
    storyListlive: false,
    storyName: '',
    stageView: true,
    addStageactive: false,
    viewBuildtools: false
  }),
  methods: {
    listStory () {
      this.storyListlive = !this.storyListlive
    },
    viewStory (vs) {
      this.$store.dispatch('actionLivestory', vs)
      for (let sn of this.liveStorylist) {
        if (sn.id === vs) {
          this.storyName = sn.name
        }
      }
      this.storyListlive = false
    },
    newStory () {
      this.viewBuildtools = true
      // this.$store.dispatch('actionNewstoryCount')
      this.$store.dispatch('actionEmptystages')
    },
    addStorystage (ev) {
      // if the build stage tools are not visible make them
      if (this.viewBuildtools === false) {
        this.viewBuildtools = true
      }
      this.addStageactive = !this.addStageactive
    },
    storyNameText () {
      this.$store.dispatch('actionStoryname', this.storyName)
    }
  }
}
</script>

<style>
#story-list {
  border: 1px solid lightgrey;
  margin: 1em;
}
#story-stages-summary {
  border: 1px solid lightgrey;
  margin: 1em;
  min-height: 100px;
}
.story-button {
  margin-right: 0.4em;
}
.clearFloat {
  clear: both;
}
</style>
