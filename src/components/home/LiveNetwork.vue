<template>
    <div class="experiment-info" id="live-network-experiment">
      <!-- demo root element -->
      <div id="demo">
        <form id="search">
          Search <input name="query" v-model="searchQuery">
        </form>
        <experiment-network
          :experiments="gridData"
          :columns="gridColumns"
          :filter-key="searchQuery">
        </experiment-network>
      </div>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.experiment-info {
  border: 1px solid grey;
  width: 80%;
}
</style>
