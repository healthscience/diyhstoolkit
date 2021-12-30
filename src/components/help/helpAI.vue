<template>
  <div id="help">
    <help-modal v-show="helpState.active" @close="showHelpModal">
      <template v-slot:contextin>
        <!-- The code below goes into the header slot -->
        {{ $t('help') }} for -- {{ helpContext }}
      </template>
      <template v-slot:feedback>
        <!-- Natural Language Chat -->
        <div id="natlang-ai">
          <div class="chat-flow" id="conversation">
            <div class="peer-ask">
              <img class="left-chat" src="../.././assets/world.png" alt="Avatar">
              <p class="left-chat"> {{ chatAsk }} </p>
              <span class="left-chat">11:00</span>
            </div>
            <div class="cale-reply">
              <span class="left-chat">11:01</span>
              <p class="left-chat">Here are you dates, click chart to display.</p>
              <img class="left-chat" src="../.././assets/logo.png" alt="Avatar">
            </div>
          </div>
          <div class="chat-flow" id="ai-interaction">
            <form id="ask-ai-form">
              <label for="askname"></label>
              <input type="text" id="askinput" name="ainame" @keyup="askeCalesave" v-model="askInput">
            </form>
            <button id="natlang-ask" @click="submitAsk">Ask CALE</button>
          </div>
        </div>
        <div v-if="helpState.type === 'future'" id="feedback-action">
          Date asked for: {{ helpState.data }}
          <calendar-tool :shellID="helpState.refcontract" :moduleCNRL="'future'" :moduleType="'future'" :mData="'future'"></calendar-tool>
        </div>
        <div class="help-section">
          What is CALE?  An personal AI that helps manage the toolkit.
        </div>
      </template>
      <template v-slot:body>
        <div v-if="helpContext === 'home'" class="help-section">
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
    </help-modal>
  </div>
</template>

<script>
import HelpModal from '@/components/help/HelpModal.vue'
import CalendarTool from '@/components/visualise/tools/calendarTool'

export default {
  name: 'Help-AI',
  components: {
    HelpModal,
    CalendarTool
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
    }
  },
  data () {
    return {
      askInput: ''
    }
  },
  methods: {
    showHelpModal () {
      this.$store.dispatch('actionShowhelp')
    },
    askeCalesave () {
      console.log('ask tigger')
      let chatASKCALE = this.askInput
      console.log(chatASKCALE)
      this.$store.dispatch('actionHelpAsk', chatASKCALE)
    },
    submitAsk () {
      console.log('sumbin question to CALE')
      this.$store.dispatch('actionHelpaskentry', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#natlang-ai {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid grey;
}

.chat-flow {
  display: block;
  width: 800px;
  border: 1px solid red;
}

#conversation {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100px;
  overflow-y: scroll;
}

.peer-ask {
  background-color: pink;
  width: 80%;
}

.cale-reply {
  background-color: lightgrey;
  width: 80%;
  align-items: right;
}

.left-chat {
  display: inline-grid;
}

#ai-interaction {
  display: grid;
  grid-template-columns: 4fr 1fr
}

#askinput {
  height:4em;
  width: 600px;
}

#natlang-ask {
}

.help-section {
  margin: 4em;
}
</style>
