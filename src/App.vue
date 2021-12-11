<template>
  <div id="app">
    <div id="peer-being">
      <div id="peer-welcome">
        <ul>
          <li class="toolbar-top">
            {{ $t('welcome') }} Peer
          </li>
          <li class="toolkit-settings" id="select-language">
            <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
              {{ entry.title }}
            </button>
          </li>
        </ul>
      </div>
      <div id="peer-pages">
        <router-link class="nav-item" to="/">{{ $t('home') }}</router-link> |
        <router-link class="nav-item" to="/about">{{ $t('about') }}</router-link>
      </div>
      <div id="peer-settings">
        <div class="toolkit-settings">
          CALE:
          <button class="toolbar-top" type="button" @click="caleAIStatus">
            {{ statusCALE.text }}
          </button>
        </div>
        <div class="toolkit-settings">
          <button type="button" class="toolbar-top" @click="showHelpModal">
            {{ $t('help') }}
          </button>
        </div>
        <div class="toolkit-settings">
          <button type="button" v-bind:class="{ networklive: connectBut.active === true && authConnectStatus === true}" class="connect-network" @click="connectNetwork(connectBut)">{{ connectBut.text }}</button>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <NetworkStatus class="toolbar-top" msg="not connected"></NetworkStatus>
    <help-modal v-show="helpState.active" @close="showHelpModal">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        {{ $t('help') }} for -- {{ helpContext }}
      </template>
      <template v-slot:body>
      <!-- The code below goes into the header slot -->
        {{ helpContext }} sections are:
        <div class="help-section">
          Custom content for page help button clicked
        </div>
        <div class="help-section">
          What is CALE?  An AI that helps manage the toolkit.
        </div>
        <div class="help-section">
          <ul>
            <li>
              <article>
                <p>INSTRUCTIONS</p>
                <p>
                  1. Interacive lifeboard visualisations
                </p>
                <p>
                  Interactive charts come with a toolbar to select different time periods, present in time series or overlay mode.  Select what data to present.
                </p>
              </article>
            </li>
            <li>
              <article>
                <p>
                  2. Join network experiments
                </p>
                <p>
                  a) First connect to the network using the Connect Button top right
                </p>
                <p>
                  b) A list of network experiments from the network will be listed or search for key words or click New Network Exeriment button to contribute
                </p>
                <p>
                  c) Click Preview / Join Button to learn more about the experiment and select from options to join.  Click on Join the Network Experiment Button
                </p>
                <p>
                  d) The Network Experiment will now be listed in Peer list.  Click on View Button to display visualisation and access toolbars
                </p>
              </article>
            </li>
            <li>
              <article>
                <p>
                  3. Share knowledge with peers & communities
                </p>
                <p>
                  Form Peer to Peer networks by sharing public keys. Click on Edit-Connection Button
                </p>
                <p>
                  Click on the Add Peer Button and enter public key and select type of peer to peer connect e.g. connect network libraries or network experiments.
                </p>
                </article>
            </li>
            <li>
              <article>
                <p>
                  4. Personal AI - CALE (not active)
                </p>
                <p>
                  The first goal of CALE AI is to produce future times series data based on learning from historical data. This uses an evolutionary algorithm to tune variables in an autregressional model.
                </p>
                <p>
                  The toolkit is open source to encourage others to add AI and other capabilites to aid none-code tools
                </p>
              </article>
            </li>
          </ul>
        </div>
      </template>
      <template v-slot:feedback>
        <!-- {{ helpState }} -->
        <div v-if="helpState.type === 'future'" id="feedback-action">
          Date asked for: {{ helpState.data }}
          <calendar-tool :shellID="helpState.refcontract" :moduleCNRL="'future'" :moduleType="'future'" :mData="'future'"></calendar-tool>
        </div>
      </template>
    </help-modal>
    <router-view/>
  </div>
</template>

<script>
import NetworkStatus from '@/components/home/NetworkStatus.vue'
import HelpModal from '@/components/help/HelpModal.vue'
import CalendarTool from '@/components/visualise/tools/calendarTool'

export default {
  name: 'vue-home',
  components: {
    NetworkStatus,
    HelpModal,
    CalendarTool
  },
  computed: {
    connectBut: function () {
      return this.$store.state.networkConnetion
    },
    authConnectStatus: function () {
      return this.$store.state.peerauthStatus
    },
    helpState: function () {
      return this.$store.state.helpModal
    },
    activeNetworkExperiment: function () {
      if (Object.keys(this.$store.state.entityUUIDsummary).length > 0) {
        if (this.$store.state.entityUUIDsummary.data[this.helpState.refcontract] !== undefined) {
          return this.$store.state.entityUUIDsummary.data[this.helpState.refcontract]
        } else {
          return {}
        }
      } else {
        return {}
      }
    }
  },
  data () {
    return {
      isModalVisible: false,
      connectContext: {
        type: '',
        message: ''
      },
      buttonName: 'Connect',
      helpContext: 'home',
      languages: [
        { flag: 'en', language: 'en', title: 'English' },
        { flag: 'zh', language: 'zh', title: '普通话' } // 普通话
      ],
      statusCALE:
      {
        text: 'off',
        active: false
      }
    }
  },
  methods: {
    showHelpModal () {
      this.$store.dispatch('actionShowhelp')
    },
    changeLocale (locale) {
      this.$i18n.locale = locale
    },
    connectNetwork (typeConnect) {
      // remove the welcome message
      console.log('connect butoton')
      console.log(typeConnect)
      this.$store.dispatch('actionLiveConnect')
      this.$store.dispatch('startconnectNSnetwork')
      // set flowviews active
      this.$store.dispatch('actionFlowviews')
      if (typeConnect === 'connect') {
        this.connectContext.type = 'connect'
        this.connectContext.message = 'Anno. connect to network'
        this.buttonName = 'Annon. connect'
        const refContract = {}
        refContract.reftype = 'datatype'
        refContract.action = 'GET'
        const refCJSON = JSON.stringify(refContract)
        this.$store.dispatch('actionGetRefContract', refCJSON)
      } else if (typeConnect.type === 'self-verify') {
        this.connectContext.type = 'self-verify'
        this.connectContext.message = 'Self verify keys'
        this.$store.dispatch('actionSelfVerify', this.connectContext)
        // this.buttonName = ''
        // ask peerlink for public keys
        this.$store.dispatch('actionKeymanagement')
        // list of active peers
        this.$store.dispatch('actionWarmPeers')
      }
    },
    caleAIStatus () {
      this.statusCALE.active = !this.statusCALE.active
      if (this.statusCALE.active === false) {
        this.statusCALE.text = 'off'
      } else {
        this.statusCALE.text = 'ON'
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#peer-being  {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: 1px solid grey;
  height: 3em;
}

#peer-welcome {
  border: 0px solid blue;
  display: inline;
  float: left;
  margin-left: 2em;
}

.toolbar-top {
  display: inline;
  border: 0px solid blue;
  margin-left: 1.2em;
  padding: .6em;
}

#nav {
  display: inline;
  border: 2px solid blue;
  padding: 0px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.help-section {
  margin: 4em;
}

#peer-pages {
  border: 0px solid red;
  display: inline;
}

.nav-item {
  display: inline;
}

#peer-settings {
  border: 0px solid pink;
  display: inline;
  float: right;
}

.toolkit-settings {
  display: inline;
  border: 0px solid green;
}

.connect-network {
  margin-left: 3em;
  margin-right: 3em;
  font-size: 1.2em;
}

.networklive {
  margin-left: 3em;
  margin-right: 3em;
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 8px 24px;
  text-align: center;
}

.clear {
  clear: both;
}
</style>
