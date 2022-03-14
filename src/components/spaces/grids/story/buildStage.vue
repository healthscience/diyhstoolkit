<template>
  <div v-if="stageActive === true" class="stage-build-holder">
    <div id="setup-tools">
      <form id="stage-name">
        <label>Stage Name</label>
        <input name="query" v-model="stageName">
        <label for="stagetype-select">type</label>
        <select class="select-stage-id" id="stage-mapping-build" @change="statetypeSelect" v-model="stageType">
          <!-- <option value="none" selected="">please select</option> -->
          <option v-for="stype in stagetypeList" :key="stype.id" v-bind:value="stype">
            {{ stype.name }}
          </option>
        </select>
      </form>
      <div v-if="stageType.id === 0" >
        text box - please write story
        <form id="stage_form" name="stage_form" method="post" action="#">
          <ul>
            <li class="stage-text">
              <textarea required="" v-model="stageText" placeholder="write story"></textarea>
            </li>
          </ul>
        </form>
      </div>
      <div v-if="stageType.id === 1" >
        data
      </div>
      <div v-if="stageType.id === 2" >
        Image
      </div>
      <div v-if="stageType.id === 3" >
        <header>Experiment</header>
        <form id="experiment_form" name="experiment_form" method="post" action="#">
          <ul>
            <li class="stage-experiment">
              <input required="" v-model="stageExperiment" @change="experimentLookup" placeholder="experiment reference">
            </li>
          </ul>
        </form>
      </div>
      <button @click.prevent="saveStage" class="button is-primary">Save</button>
    </div>
    <div v-if="stageActive === true" id="stage-display-preview">
      <header>Stage preview area {{ stageID }} </header>
      <ul>
        <li>
          Stage name: {{ stageName }}
        </li>
        <li>
          Type: {{ stageType }}
        </li>
        <li>
          Text: {{ stageText }}
        </li>
        <li>
          Experiment Reference {{ stageExperiment }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'stage-build',
  components: {
  },
  props: {
    stageID: Object,
    stageActive: null
  },
  computed: {
    liveStageCount () {
      return this.$store.state.stageCount
    }
  },
  data: () => ({
    stageName: '',
    stageType: '',
    stagetypeList:
    [
      { id: 0, name: 'Text' },
      { id: 1, name: 'Data' },
      { id: 2, name: 'Image' },
      { id: 3, name: 'Experiment' }
    ],
    stageText: '',
    stageExperiment: ''
  }),
  methods: {
    saveStage (ev) {
      console.log(ev)
      console.log('save stage')
      // first stage if yes, save name of story
      console.log('stage count')
      console.log(this.liveStageCount)
      if (this.liveStageCount === 0) {
        // save story name and create holder for story
        this.$store.dispatch('actionNewstory')
      }
      let prepareStage = {}
      prepareStage.type = 1
      prepareStage.text = 2
      prepareStage.data = 3
      prepareStage.image = 4
      prepareStage.Experiment = 5
      this.$store.dispatch('actionNewstage', prepareStage)
      // clear the forms
      this.stageText = ''
      this.stageName = ''
      this.stageExperiment = ''
    },
    statetypeSelect () {
      console.log('change s')
    },
    experimentLookup () {
      console.log('lookup reference contract')
      console.log(this.stageExperiment)
    }
  }
}
</script>

<style>
#stage-story-holder {
}

#setup-tools {

}

#stage-display-preview {
  border: 2px solid lightgrey;
}
</style>
