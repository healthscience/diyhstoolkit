<template>
  <div id="chat-interface">
    <!-- Natural Language Chat -->
    <div id="natlang-ai">
      <div class="chat-flow" id="conversation">
        <div class="peer-ask"  id="peer-chat-left">
          <img class="left-chat-peer" src="../.././assets/peerlogo.png" alt="Avatar">
          <div v-if="chatAsk.active === true" class="left-chat"> {{ chatAsk.text }} </div>
          <span class="left-chat">{{ chatAsk.time }}</span>
        </div>
        <div class="cale-reply" id="cale-chat-right">
          <span class="right-chat">{{ aiResponse.time }}</span>
          <div class="right-chat">{{ aiResponse.text }}</div>
          <img class="right-chat-cale" src="../.././assets/logo.png" alt="bbAI">
        </div>
      </div>
      <div class="chat-flow" id="ai-interaction">
        <form id="ask-ai-form" v-on:submit.prevent @keyup.enter.prevent="submitAsk">
          <label for="askname"></label>
          <input type="text" id="askinput" name="ainame" v-on:keyup="askeCalesave" v-model="askInput">
        </form>
        <button v-if="caleAIStatus.active === true" id="natlang-ask" @click.prevent="submitAsk">
          Ask BB
        </button>
      </div>
    </div>
    <!-- <div v-if="helpState.type === 'future'" id="feedback-action">
      Date asked for: {{ helpState.data }}
      <calendar-tool :shellID="helpState.refcontract" :moduleCNRL="'future'" :moduleType="'future'" :mData="'future'"></calendar-tool>
    </div> -->
  </div>
</template>

<script>
// import CalendarTool from '@/components/visualise/tools/calendarTool'

export default {
  name: 'Help-AI',
  components: {
    // CalendarTool
  },
  props: {
  },
  computed: {
    caleAIStatus: function () {
      return this.$store.state.aiInterface.statusCALE
    },
    chatAsk: function () {
      return this.$store.state.aiInterface.helpchatAsk
    },
    aiResponse: function () {
      return this.$store.state.aiInterface.caleaiReply
    }
  },
  data () {
    return {
      askInput: ''
    }
  },
  methods: {
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

#natlang-ai {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  padding: 1em;
  border-radius: 1em;
}

.chat-flow {
  display: block;
  margin-top: .5em;
  width: 800px;
  border: 0px solid red;
}

#conversation {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100px;
  overflow-y: scroll;
}

.peer-ask {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  background-color: pink;
  border-radius: 25px;
  width: 90%;
}

.left-chat-peer {
  width: 50px;
}

.right-chat-cale {
  width: 50px;
}

#peer-chat-left {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.left-chat {
  padding-top: .8em;
  display: inline-grid;
}

.cale-reply {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  background-color: #d8d7e2;
  width: 90%;
  border-radius: 25px;
  justify-self: end;
  margin-top: .5em;
}

.right-chat {
  padding-top: 1em;
}

#ai-interaction {
  display: grid;
  grid-template-columns: 4fr 1fr
}

#askinput {
  font-size: 1.2em;
  padding-left: 1em;
  height:4em;
  width: 600px;
}

#natlang-ask {
}
</style>
