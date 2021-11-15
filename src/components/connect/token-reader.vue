<template>
  <div id="token-system">
    <div id="token-verify" v-if="fileinputSeen">
      <label class="text-reader">
        Read token file
        <input type="file" @change="loadTextFromFile">
      </label>
    </div>
    <div id="keypw-feedback">
      {{ verifyfeedbackM }}
    </div>
    <div v-if="viewPkeybuttons" id="publickey-view">
      <button @click.prevent="viewPublickey" class="button is-primary">View publickey address</button>
      <button @click.prevent="viewtToken" class="button is-primary">View Token</button>
      <div id="view-exttokens" v-if="socketAuth === true">
        <div id="tok-pub" v-if="viewDSPubkey === true">
          {{ token.publickey}}
        </div>- --
        <div id="tok-dstok" v-if="viewDStoken === true">
          {{ token.token }}
        </div>
      </div>
    </div>
    <div id="pwinput-prompt" v-if="pwinputSeen">
      Please enter password
      <passwordk v-model="passwordk" :toggle="true" />
      <button @click.prevent="verifyToken" class="button is-primary">Verify key ownership</button>
    </div>
  </div>
</template>

<script>
import Passwordk from 'vue-password-strength-meter'

export default {
  name: 'unlockkey-page',
  components: {
    Passwordk
  },
  computed: {
    token: function () {
      return this.$store.state.token
    },
    socketAuth: function () {
      return this.$store.state.peerauthStatus
    }
  },
  props: {
    viewPkey: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  mounted () {
  },
  data: () => ({
    keyObject: {},
    verifyfeedbackM: '',
    viewPkeybuttons: false,
    // token: {},
    fileinputSeen: true,
    pwinputSeen: false,
    passwordk: null,
    keybuttonseen: false,
    feedbackM: '',
    viewDSPubkey: false,
    viewDStoken: false
  }),
  methods: {
    loadTextFromFile (ev) {
      // prompt for Password
      const localthis = this
      const file = ev.target.files[0]
      const reader = new FileReader()
      reader.onloadend = function () {
        const tJSONstring = reader.result
        const tokenJSON = JSON.parse(tJSONstring)
        // now use getter to store state
        // localthis.token = tokenJSON
        // localthis.$store.commit('setBoth', tokenJSON)
        localthis.verifyfeedbackM = 'Data token live'
        localthis.viewPkeybuttons = true
        let authBundle = {}
        authBundle.network = 'cloud'
        authBundle.settings = tokenJSON
        // external data store authorisation
        localthis.$store.dispatch('authDatastore', authBundle)
        localthis.$emit('closeTreader')
      }
      reader.readAsText(file)
      // var datadir = process.cwd()
      // this.tokenJSONy = (datadir)
    },
    verifyToken () {
      // verify token is of right structure TODO
    },
    viewPublickey () {
      this.viewDSPubkey = !this.viewDSPubkey
    },
    viewtToken () {
      this.viewDStoken = !this.viewDStoken
    }
  }
}
</script>

<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button looking */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
