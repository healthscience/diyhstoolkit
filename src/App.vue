<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{ $t('home') }}</router-link> |
      <router-link to="/about">{{ $t('about') }}</router-link>
      <div class="toolkit-settings">
        <img class="small-logo" alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="toolkit-settings" id="select-language">
        <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
          <a href="#" id="language-learn">{{ entry.title }}</a>
        </button>
      </div>
      <div class="toolkit-settings">
        <div class="connect-info">
          <NetworkStatus msg="not connected"></NetworkStatus>
        </div>
        <header class="toolbar-top"> CALE</header>
        <button type="button" class="btn" @click="caleAIStatus">
          {{ statusCALE.text }}
        </button>
        <button type="button" class="btn" @click="showHelpModal">
          {{ $t('help') }}
        </button>
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
      </div>
    </div>
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
      // this.isModalVisible = true
      // this.helpContext = this.$router.currentRoute.name
      this.$store.dispatch('actionShowhelp')
    },
    changeLocale (locale) {
      this.$i18n.locale = locale
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.toolkit-settings {
  float: right;
}

.toolbar-top {
  display: inline-block;
  padding-right: 10px;
}

img {
  width: 120px;
}

.help-section {
  margin: 4em;
  text-align: left;
}

.small-logo {
  width: 50px;
}

.connect-info {
  float: left;
}
</style>
