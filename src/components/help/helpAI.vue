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
            <a href="#" id="bentospaces" @click.prevent="viewHelpContent('bentospaces')">Bentospaces</a>
            <a href="#" id="experiments" @click.prevent="viewHelpContent('experiments')">Experiments</a>
            <a href="#" id="tools" @click.prevent="viewHelpContent('tools')">BB tools</a>
            <a href="#" id="demo"  @click.prevent="viewHelpContent('demo')">Demo data</a>
            <a href="#" id="library" @click.prevent="viewHelpContent('library')">Library</a>
            <a href="#" id="bb-ai"  @click.prevent="viewHelpContent('bb-ai')">BB AI</a>
          </div>
          <div id="help-topics">
            <div class="topic-item" v-if="helpLive === 'about'">
              <article>
                <header>ABOUT</header>
                <p>
                  BentoBox-DS  is a Peer to Peer Data Science toolkit and is an <a href="https://bentobox.healthscience.network" target="_blank">open source project</a>.  The Toolkit has a none-coding graphical interface that enables more people to particpate in understanding data that shapes their health, community or nature. The core features:
                </p>
                <p>
                  1. Build visualisation dashboards, chart data that matters and perform time analysis.
                </p>
                <p>
                  2. Upload files locally, initialy CSV, JSON or SQLite.
                </p>
                <p>
                  3. Collaborate to build multi-level collective intelligence. Join a network experiment that gurantees data interoperabilty.
                </p>
                <p>
                  4. BB-AI is a natural language AI agent to provide help and manage a toolkit. It works on behalf of the owner of the toolkit.
                </p>
                <p>
                  5. The Toolkit operates on the Health Oracle Protocol. Read more on the <a href="https://www.healthscience.network" target="_blank">HOP website</a>.
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'connect'">
              <article>
                <header>CONNECT</header>
                <p>
                  Click the Connect button in the top navigation.  This will present the network connection screen. Click Lunch to be taken to the BentoSpaces interface. If you have used the toolkit before the dashboard will be layout where it was left.
                  <img class="medium-conect-help" alt="connect UI" src="../../assets/help/connect-help.png">
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'bentospaces'">
              <article>
                <header>BENTOSPACES</header>
                <p>
                  1. A BentoSpace is where BentoBox visualisations are laid out. The space is zoomable.
                  <img class="medium-conect-help" alt="bentospaces" src="../../assets/help/bentospaces-help.png">
                </p>
                <p>
                  2. Drag & drop BentoBox visualisiation and click on the save layout button to keep.  A min-map helps with navigating the entire space.
                </p>
                <p>
                  3. The BB toolbar has a LIST button.  Click to access the Network Experiments joined, this is searchable.  Click view to add to BentoSpaces.
                </p>
                <p>
                  4. The BB toolbar has a NEW button. This produces two options: a. join a network work experiment  b. add a new data.  See the Experiment help section for more details.
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'experiments'">
              <article>
                <header>EXPERIMENTS</header>
                <p>
                  1. The concept of network experiment: this is core building block of a BentoBox. This bring together all the information required to build a visualisation: source devices for the data, this storage location, type of compute and visualisation style e.g. a chart.  Once one peer has contributed a network experiment these templates are available to other peers in the network.  It is import to note the source data is private to each peer and made avaialble for collaboration under the control of each peer.  This setup provides some guarantees on data interoperability.
                </p>
                <p>
                  2. BentoSpaces toobar has a LIST and NEW buttons to give access to show existing peer experiments or give the abilty to join or make a new one.
                </p>
                <p>
                  A list of network experiments from the network will be listed
                  <img class="medium-conect-help" alt="join experiment" src="../../assets/help/listnxp-help.png">
                </p>
                <p>
                  Click Preview / Join Button to learn more about the experiment and select from options to join.  Click on Join the Network Experiment Button
                  <img class="medium-conect-help" alt="join experiment" src="../../assets/help/joinnxp-help.png">
                </p>
                <p>
                   click New Network Exeriment button to contribute
                  <img class="medium-conect-help" alt="join experiment" src="../../assets/help/newnxp-help.png">
                </p>
                <p>
                   Library: the base building block of desribing data: datatypes, data sources, compute etc.
                  <img class="medium-conect-help" alt="join experiment" src="../../assets/help/library-help.png">
                </p>
                <p>
                  d) The Network Experiment will now be listed in Peer list.  Click on View Button to display visualisation and access toolbars
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'tools'">
              <article>
                <header>BB tools</header>
                <p>
                  A BentoBox contains the modules making up a network experiment and supporting tools:
                </p>
                <p>
                  1. Visualiation & charting & Time analysis tools
                  <img class="medium-conect-help" alt="vis tools" src="../../assets/help/bbvistools-help.png">
                </p>
                <p>
                  A calendar tool provides the way to select an specific day, pick many days or series of days via the drop down box. The back and forward buttons give a quick way to go back/forward one day at a time.
                  When more than one day is selected, the drop down button allow for TIME SERIES or OVERLAY modes.  Overlay normalising all day to normalised 24 hour period.  Labels can be removed or added.
                </p>
                <p>
                  2. Compute controls.
                </p>
                <p>
                  3. Device and data information.
                </p>
              </article>
            </div>
            <div class="topic-item" v-if="helpLive === 'demo'">
              <article>
                <header>DEMO DATA</header>
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
                <header>LIBRARY</header>
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
                <header>BB AI</header>
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

header {
  margin: 2em;
  font-weight: bold;
}
.topic-item p {
  margin-left: 2em;
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

.medium-conect-help {
  margin: 1em;
  width: 70%;
}
</style>
