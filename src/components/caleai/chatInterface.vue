<template>
  <div id="chat-interface">
    <!-- Natural Language Chat -->
    <div id="natlang-ai">
      <div class="chat-flow" id="conversation">
        <div class="peer-ask"  id="peer-chat-left">
          <img class="left-chat" src="../.././assets/world.png" alt="Avatar">
          <p v-if="chatAsk.active === true" class="left-chat"> {{ chatAsk.text }} </p>
          <span class="left-chat">11:00</span>
        </div>
        <div class="cale-reply" id="cale-chat-right">
          <span class="right-chat">11:01</span>
          <p class="right-chat">{{ aiResponse.text }}</p>
          <img class="right-chat" src="../.././assets/caleailogo.png" alt="Avatar">
        </div>
      </div>
      <div class="chat-flow" id="ai-interaction">
        <form id="ask-ai-form">
          <label for="askname"></label>
          <input type="text" id="askinput" name="ainame" @keyup="askeCalesave" v-model="askInput">
        </form>
        <button v-if="caleAIStatus.active === true" id="natlang-ask" @click="submitAsk">Ask CALE</button>
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
      return this.$store.state.helpchatAsk
    },
    aiResponse: function () {
      return this.$store.state.calaReply
    }
  },
  data () {
    return {
      askInput: ''
    }
  },
  methods: {
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
  width: 100%;
}

#peer-chat-left {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.cale-reply {
  background-color: lightgrey;
  width: 100%;
  align-items: right;
}

.left-chat {
  display: inline-grid;
}

#cale-chat-right {
  display: grid;
  grid-template-columns: auto 6fr 1fr;
}

.right-chat {
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
</style>
