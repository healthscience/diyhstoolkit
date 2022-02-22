<template>
  <div id="app">
    <div id="peer-being">
      <div id="peer-welcome">
        <div class="toolbar-top">
          {{ $t('welcome') }} Peer
        </div>
        <div class="toolkit-settings" id="select-language">
          <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
            {{ entry.title }}
          </button>
        </div>
      </div>
      <div id="peer-pages">
        <router-link class="nav-item-route" to="/">{{ $t('home') }}</router-link>
        |
        <router-link class="nav-item-route" to="/about">{{ $t('about') }}</router-link>
      </div>
      <div id="peer-settings">
        <div class="toolkit-settings">
          CALE:
          <button class="toolbar-top"  v-bind:class="{ active: caleAIStatus.active === true}" type="button" @click="caleAIset">
            {{ caleAIStatus.text }}
          </button>
        </div>
        <div class="toolkit-settings">
          <button type="button" class="toolbar-top" id="help-live" @click="showHelpModal">
            {{ $t('help') }}
          </button>
        </div>
        <div class="toolkit-settings">
          <button type="button" v-bind:class="{ networklive: connectBut.active === true && authConnectStatus === true}" class="connect-network" @click="connectNetwork(connectBut)">{{ connectBut.text }}</button>
        </div>
      </div>
    </div>
    <network-status class="toolbar-top" msg="not connected"></network-status>
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
      return this.$store.state.networkConnection
    },
    authConnectStatus: function () {
      return this.$store.state.peerauthStatus
    },
    caleAIStatus: function () {
      return this.$store.state.aiInterface.statusCALE
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
      buttonName: 'Connect',
      languages: [
        { flag: 'en', language: 'en', title: 'English' },
        { flag: 'zh', language: 'zh', title: '普通话' } // 普通话
      ]
    }
  },
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = locale
    },
    connectNetwork (typeConnect) {
      this.$store.dispatch('actionCheckConnect')
      // this.$store.dispatch('startconnectNSnetwork')
      // set flowviews active
      console.log(typeConnect.type)
      this.$store.dispatch('actionFlowviews')
    },
    showHelpModal () {
      this.$store.dispatch('actionShowhelp', 'home')
    },
    caleAIset () {
      this.$store.dispatch('actionCALEAI', 'click')
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr;
  width: 1280;
}

#peer-being  {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: 1px solid grey;
  height: 3em;
}

#peer-welcome {
  display: grid;
  grid-template-columns: 1fr 1fr;
  display: inline;
  margin-left: 2em;
}

.toolbar-top {
  display: inline;
  border: 0px solid blue;
  margin-left: 1.2em;
  padding: .6em;
}

.toolbar-top.active {
  font-size: 1.2em;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 6px 14px;
  text-align: center;
}

#nav {
  display: inline;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-self: center;
  justify-self: center;
}

.nav-item-route {
  font-size: 1.2em;
}

#peer-settings {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
  align-items: center;
}

.toolkit-settings {
  display: inline;
  border: 0px solid green;
}

.connect-network {
  margin-left: 3em;
  margin-right: 3em;
  font-size: 1.2em;
  min-width: 10em;
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
