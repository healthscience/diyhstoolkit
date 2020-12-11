<template>
  <div class="home">
    <div class="diy-settings">
      <div v-if="connected === false" id="diy-summary">
        <header>{{ $t('welcome') }} to the DIY data science toolkit</header>
        <ul>
          <li>1. Interacive lifeboards</li>
          <li>2. Build scientific evidence</li>
          <li>3. Connect with peers & communities</li>
        </ul>
      </div>
    </div>
    <div class="network-experiments">
      <div id="peer-views">
        <ul>
          <li>
            <button class="peer-medium" id="lifestyleworld" @click.prevent="setView($event)">Lifeboards</button>
            <button class="peer-medium" id="nxp-view" @click.prevent="setView($event)">Network experiments</button>
            <button class="peer-medium" id="timeline" @click.prevent="setView($event)">Timeline</button>
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
// import StartNetworkExperiment from '@/components/home/StartNetworkExperiment.vue'
import LiveNetwork from '@/components/home/LiveNetwork.vue'
import LiveTimeline from '@/components/home/LiveTimeline.vue'
import LiveLifestyle from '@/components/home/LiveLifestyle.vue'

export default {
  name: 'home',
  components: {
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
  computed: {
    connected: function () {
      return this.$store.state.connectStatus
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
  border: 1px solid lighgrey;
  margin: 5px;
}

#diy-summary {
  border: 0px solid black;
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

.network-experiments {
  border: 0px solid orange;
}

/* Clear floats after the columns */
.network-experiments:after {
  content: "";
  display: table;
  clear: both;
}

.peer-medium {
  font-size: 1.2em;
  margin-right: 1em
}
</style>
