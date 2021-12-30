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
    <help-ai></help-ai>
    <router-view/>
  </div>
</template>

<script>
import NetworkStatus from '@/components/home/NetworkStatus.vue'
import HelpAi from '@/components/help/helpAI.vue'

export default {
  name: 'vue-home',
  components: {
    NetworkStatus,
    HelpAi
  },
  computed: {
    connectBut: function () {
      return this.$store.state.networkConnetion
    },
    authConnectStatus: function () {
      return this.$store.state.peerauthStatus
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
    showHelpModal () {
      this.$store.dispatch('actionShowhelp')
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
