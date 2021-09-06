<template>
  <div id="app">
    <div id="peer-being">
      <div id="peer-welcome">
        <ul>
          <!-- <li class="toolbar-top">ll
            <img class="small-logo" alt="logo" src="./assets/logo.png">
          </li> -->
          <li class="toolbar-top">
            {{ $t('welcome') }} Peers
          </li>
        </ul>
      </div>
      <div id="peer-pages">
        <router-link class="nav-item" to="/">{{ $t('home') }}</router-link> |
        <router-link class="nav-item" to="/about">{{ $t('about') }}</router-link>
      </div>
      <div id="peer-settings">
        <div class="toolkit-settings" id="select-language">
          <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
            {{ entry.title }}
          </button>
        </div>
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
          <button type="button" class="connect-network" @click="connectNetwork(connectBut)">{{ connectBut.text }}</button>
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
          Where is the data store?  Data is secured on the SAFEnetwork.
        </div>
      </template>
      <template v-slot:feedback>
        {{ helpState }}  {{ activeNetworkExperiment.shellID }} ooo
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
      connectBut: {
        active: false,
        type: 'self-verify',
        text: 'Connect'
      },
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
      this.$store.dispatch('actionLiveConnect')
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
        this.connectBut.text = 'edit-connections'
        this.connectBut.type = 'self-verify'
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
      if (this.statusCALE.active === false) {
        this.statusCALE.active = true
        this.statusCALE.text = 'off'
      } else {
        this.statusCALE.active = false
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

img {
  width: 120px;
}

.small-logo {
  display: inline;
}

#peer-pages {
  border: 1px solid red;
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

.clear {
  clear: both;
}
</style>
