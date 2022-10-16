<template>
  <div id="help">
    <help-modal v-show="helpState.active" @close="showHelpModal">
      <template v-slot:contextin>
        <!-- The code below goes into the header slot -->
        {{ $t('help') }} for -- {{ helpContext }}
      </template>
      <template v-slot:feedback>
        <chat-interface></chat-interface>
      </template>
      <template v-slot:body>
        <div v-if="helpContext === 'home'" class="help-section">
          <div id="select-topic">
            <a href="#" id="about"  @click.prevent="viewHelpContent('about')">About</a>
            <a href="#" id="connect" @click.prevent="viewHelpContent('connect')">Connect</a>
            <a href="#" id="demo"  @click.prevent="viewHelpContent('demo')">Demo data</a>
            <a href="#" id="bentospaces" @click.prevent="viewHelpContent('bentospaces')">Bentospaces</a>
            <a href="#" id="experiments" @click.prevent="viewHelpContent('experiments')">Experiments</a>
            <a href="#" id="library" @click.prevent="viewHelpContent('library')">Library</a>
            <a href="#" id="bb-ai"  @click.prevent="viewHelpContent('bb-ai')">BB AI</a>
          </div>
          <div id="help-topics">
            <div class="topic-item" v-if="helpLive === 'about'">
              <article>
                <p>ABOUT</p>
                <p>
                  BentoBox-DS  is a Peer to Peer Data Science open source project.  The Toolkit has a none-coding graphical interface that enbables more people to particpate in understanding data that shapes their health, community or local nature. The core features:
                </p>
                <p>
                  1. Build visualation dashboards, chart data that matters
                </p>
                <p>
                  2. Upload files locally
                </p>
                <p>
                  3. Colloborate to build multi-level collective intelligence.
                </p>
                <p>
                  4. BB-AI is a natural language AI agent to provide help and manage a toolkit. It only works for the owner of the toolkit.
                </p>
                <p>
                  5. The networking of peers is done via the Health Oracle Protocol.
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'connect'">
              <article>
                <p>CONNECT</p>
                <p>
                  Click the Connect button in the top navigation.  This will present the network connection screen. Click Lunch to be taken main BentoSpaces interface. If you have use the toolkit before the visualisaton dashboard will be layout where it was left.
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'bentospaces'">
              <article>
                <p>BENTOSPACES</p>
                <p>
                  1. BentoSpaces is where the individual bentbox visuation are displayed.
                </p>
                <p>
                  2. Drage and drop.   Save layout.
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'experiments'">
              <article>
                <p>EXPERIMENTS</p>
                <p>
                  1. Concept of a network experiment.  First provie gurante when collborating but first ..
                </p>
                <p>
                  2. Setup Experiment  Join  & View an experiment
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
            </div>
            <div class="topic-item" v-if="helpLive === 'collaborate'">
              <article>
                <p>COLLABORATE</p>
                <p>
                  Peer to Peer  or allow AI to collaborate
                </p>
                <p>
                  Form Peer to Peer networks by sharing public keys. Click on Edit-Connection Button
                </p>
                <p>
                  Click on the Add Peer Button and enter public key and select type of peer to peer connect e.g. connect network libraries or network experiments.
                </p>
                </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'demo'">
              <article>
                <p>DEMO DATA</p>
                <p>
                  A BentoBox-DS toolkit empty on first use.  To get familar with the way the toolkit works it is good to have data. To replicate the demo data follow these setups or watch the video:
                </p>
                <p>
                  Click Demo Data BUTTON
                </p>
                <p>
                  Click on the New Button on the toolbar .cc..c.
                </p>
                </article>
            </div>
              <div class="topic-item" v-if="helpLive === 'library'">
              <article>
                <p>LIBRARY</p>
                <p>
                  To provide gurantess on via Library toolkit included within BentoBox.
                </p>
                <p>
                  dfdfd
                </p>
                <p>
                  dfdf.
                </p>
                </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'bb-ai'">
              <article>
                <p>BB AI</p>
                <p>
                  4. Personal AI - BB  "Bee Bee"
                </p>
                <p>
                  The first goal of CALE AI is to produce future times series data based on learning from historical data. This uses an evolutionary algorithm to tune variables in an autregressional model.
                </p>
                <p>
                  The toolkit is open source to encourage others to add AI and other capabilites to aid none-code tools
                </p>
              </article>
            </div>
          </div>
        </div>
      </template>
    </help-modal>
  </div>
</template>

<script>
import HelpModal from '@/components/help/HelpModal.vue'
import ChatInterface from '@/components/bbai/chatInterface.vue'

export default {
  name: 'Help-AI',
  components: {
    HelpModal,
    ChatInterface
  },
  props: {
  },
  computed: {
    helpState: function () {
      return this.$store.state.helpModal
    },
    helpContext: function () {
      return this.$store.state.liveHelpcontext
    },
    chatAsk: function () {
      return this.$store.state.helpchatAsk
    },
    aiResponse: function () {
      return this.$store.state.caleaiReply
    }
  },
  data () {
    return {
      askInput: '',
      helpLive: 'about'
    }
  },
  methods: {
    showHelpModal () {
      this.$store.dispatch('actionShowhelp')
    },
    viewHelpContent (hcontext) {
      console.log(hcontext)
      this.helpLive = hcontext
    },
    askeCalesave () {
      let chatASKCALE = this.askInput
      this.$store.dispatch('actionHelpAsk', chatASKCALE)
    },
    submitAsk () {
      this.$store.dispatch('actionHelpaskentry', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.help-section {
  margin-top: 2em;
}

#select-topic {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

#help-topics {
  display: grid;
  grid-template-columns: 1fr;
  margin-left: 2em;
}

.topic-item {
  width: 80%;
  text-align: justify;
  text-justify: inter-word;
  overflow-wrap: break-word;
}
</style>
