<template>
  <div class="home">
    <div class="help-info">
      <button type="button" class="btn" @click="showModal">
        Help
      </button>
      <help-modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
        <!-- The code below goes into the header slot -->
          Start learning for dynamic help
        </template>
        <template v-slot:body>
        <!-- The code below goes into the header slot -->
          Help on starting using the toolkit and connecting to the network.
        </template>
      </help-modal>
    </div>
    <div class="diy-settings">
      <div class="diy-info" id="diy-summary">
        <header>Welcome, the DIY HealthScience toolkit</header>
        <p>1. learn & particpate in Experiments</p>
        <p>2. contribute science</p>
        <p>3. build your own dashboards</p>
      </div>
      <div class="diy-info" id="diy-introduction">
        <NetworkStatus msg="not connected"></NetworkStatus>
      </div>
    </div>
    <div class="network-experiments">
      <div class="experiment-info" id="start-network-experiment">
        <img alt="start" src="../assets/start.png">
        Start Network Experiment Wizard Devices, Data, Compute, Toolkit visualisation
      </div>
      <div class="experiment-info" id="live-network-experiment">
        Live Network
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NetworkStatus from '@/components/NetworkStatus.vue'
import HelpModal from '@/components/HelpModal.vue'

export default {
  name: 'home',
  components: {
    HelpModal,
    NetworkStatus
  },
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    showModal () {
      console.log('show modal click')
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style>
.home {
  border: 1px solid grey;
}
.help-info {
  border: 1px solid orange;
}

.diy-settings {
  border: 1px solid grey;
}

.diy-info {
  border: 1px solid grey;
  width: 45%;
  float: left;
}

/* Clear floats after the columns */
.diy-settings:after {
  content: "";
  display: table;
  clear: both;
}

.experiment-info {
  border: 1px solid grey;
  width: 80%;
}

.network-info {
  border: 1px solid grey;
}

.diy-help {
  border: 1px solid grey;
}

/* Clear floats after the columns */
.network-experiments:after {
  content: "";
  display: table;
  clear: both;
}

</style>
