<template>
    <div class="experiment-info" id="live-network-experiment">
      <div class="live-network-header">
        <ul>
          <li class="network-toolbar">
            Live network experiments
          </li>
          <li class="network-toolbar">
            <form id="search">
              Search <input name="query" v-model="searchQuery">
            </form>
          </li>
          <li class="network-toolbar">
            <button type="button" class="btn" @click="newExperiment()">new</button>
          </li>
        </ul>
      </div>
      <experiment-network
        class="experiment-info"
        :experiments="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
      </experiment-network>
    </div>
</template>

<script>
import ExperimentNetwork from '@/components/grids/ExperimentNetwork.vue'

export default {
  name: 'LiveNetwork',
  components: {
    ExperimentNetwork
  },
  props: {
  },
  data () {
    return {
      searchQuery: '',
      gridColumns: ['id', 'name', 'description', 'time', 'dapps', 'device', 'join'],
      gridData: [
        { id: 1, name: 'Exercise', description: 'plan actitivies', time: Infinity, dapps: 'GadgetBridge', device: 'Yes', join: 'JOIN' },
        { id: 2, name: 'Environment', description: 'air quality', time: 9000, dapps: 'luftdaten.info', device: 'Yes', join: 'JOIN' },
        { id: 3, name: 'Sleep', description: 'How to maximise sleep quality', time: 7000, dapps: 'Gadgetbridge', device: 'Yes', join: 'JOIN' },
        { id: 4, name: 'Food', description: 'Intermitting fasting optimisation', time: 8000, dapps: 'DripX', device: 'Yes', join: 'JOIN' }
      ]
    }
  },
  methods: {
    newExperiment () {
      console.log('start new n=1 network experiment')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.experiment-info {
  border: 0px solid grey;
  width: 98%;
  margin: auto;
  text-align: center;
}

.network-toolbar {
  display: inline-block;
  padding-left: 10px;
}
</style>
