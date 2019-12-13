<template>
  <div class="home">
    <div class="diy-settings">
      <div class="diy-info" id="diy-summary">
        <header>{{ $t('welcome') }} to the DIY HealthScience Toolkit</header>
        <p>1. join a N=1 network experiment</p>
        <p>2. contribute science</p>
        <p>3. build dashboards</p>
      </div>
      <div class="diy-info" id="diy-introduction">
        <NetworkStatus msg="not connected"></NetworkStatus>
      </div>
    </div>
    <div class="network-experiments">
      <live-network></live-network>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NetworkStatus from '@/components/home/NetworkStatus.vue'
// import StartNetworkExperiment from '@/components/home/StartNetworkExperiment.vue'
import LiveNetwork from '@/components/home/LiveNetwork.vue'

export default {
  name: 'home',
  components: {
    NetworkStatus,
    // StartNetworkExperiment,
    LiveNetwork
  },
  data () {
    return {
    }
  },
  methods: {
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

#diy-summary header {
  font-weight: bold;
}

/* Clear floats after the columns */
.diy-settings:after {
  content: "";
  display: table;
  clear: both;
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
