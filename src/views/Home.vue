<template>
  <div class="home">
    <div class="diy-settings">
      <div class="diy-info" id="diy-summary">
        <header>{{ $t('welcome') }} to the DIY HealthScience Toolkit</header>
        <p>1. join a N=1 network experiment</p>
        <p>2. build scientific evidence</p>
        <p>3. personalise dashboards</p>
      </div>
      <div class="diy-info" id="diy-introduction">
        <NetworkStatus msg="not connected"></NetworkStatus>
      </div>
    </div>
    <div class="network-experiments">
      <div id="peer-views">
        <ul>
          <li>
            <button id="nxp-view" @click.prevent="setView($event)">Network experiments</button>
            <button id="timeline" @click.prevent="setView($event)">Timeline</button>
            <button id="lifestyleworld" @click.prevent="setView($event)">Lifestyle-world</button>
          </li>
        </ul>
      </div>
      <live-timeline v-if="viewTimeline === true"></live-timeline>
      <live-lifestyle v-if="viewLifestyleworld === true"></live-lifestyle>
      <live-network v-if="viewNXP === true"></live-network>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NetworkStatus from '@/components/home/NetworkStatus.vue'
// import StartNetworkExperiment from '@/components/home/StartNetworkExperiment.vue'
import LiveNetwork from '@/components/home/LiveNetwork.vue'
import LiveTimeline from '@/components/home/LiveTimeline.vue'
import LiveLifestyle from '@/components/home/LiveLifestyle.vue'

export default {
  name: 'home',
  components: {
    NetworkStatus,
    // StartNetworkExperiment,
    LiveNetwork,
    LiveTimeline,
    LiveLifestyle
  },
  data () {
    return {
      viewNXP: true,
      viewTimeline: false,
      viewLifestyleworld: false
    }
  },
  methods: {
    setView (e) {
      let viewLive = e.target.id
      if (viewLive === 'nxp-view') {
        this.viewNXP = !this.viewNXP
        this.viewTimeline = false
        this.viewLifestyleworld = false
      } else if (viewLive === 'timeline') {
        this.viewTimeline = !this.viewTimeline
        this.viewNXP = false
        this.viewLifestyleworld = false
      } else if (viewLive === 'lifestyleworld') {
        this.viewLifestyleworld = !this.viewLifestyleworld
        this.viewNXP = false
        this.viewTimeline = false
      }
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
