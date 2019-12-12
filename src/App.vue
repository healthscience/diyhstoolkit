<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{ $t('home') }}</router-link> |
      <router-link class="menu-space" to="/dashboard">{{ $t('dashboard') }}</router-link> |
      <router-link class="menu-space" to="/datadevicesensor">{{ $t('data') }}</router-link> |
      <router-link class="menu-space" to="/toolkit">{{ $t('toolkit') }}</router-link> |
      <router-link to="/about">{{ $t('about') }}</router-link>
      <div class="toolkit-settings">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="toolkit-settings" id="select-language">
        <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
          <a href="#" id="language-learn">{{ entry.title }}</a>
        </button>
      </div>
      <div class="toolkit-settings" id="help-info">
        <button type="button" class="btn" @click="showModal">
          Help
        </button>
        <help-modal v-show="isModalVisible" @close="closeModal">
          <template v-slot:header>
          <!-- The code below goes into the header slot -->
            Help for -- {{ helpContext }}
          </template>
          <template v-slot:body>
          <!-- The code below goes into the header slot -->
            {{ helpContext }} sections are:
          </template>
        </help-modal>
      </div>
    </div>
    <router-view/>

  </div>
</template>

<script>
import HelpModal from '@/components/help/HelpModal.vue'

export default {
  name: 'vue-home',
  components: {
    HelpModal
  },
  data () {
    return {
      isModalVisible: false,
      helpContext: 'home',
      languages: [
        { flag: 'en', language: 'en', title: 'English' },
        { flag: 'zh', language: 'zh', title: '普通话' } // 普通话
      ]
    }
  },
  methods: {
    showModal () {
      console.log('show modal click')
      console.log(this.$router.currentRoute)
      this.isModalVisible = true
      this.helpContext = this.$router.currentRoute.name
    },
    closeModal () {
      this.isModalVisible = false
    },
    changeLocale (locale) {
      console.log('language')
      console.log(locale)
      console.log(this.$i18n)
      this.$i18n.locale = locale
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
  border: 1px solid grey;
  float: right;
}

img {
  width: 120px;
}
</style>
