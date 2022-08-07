<template>
  <div id="question-nxp">
    <header>QUESTION:</header>
    <div id="prime-question">
      <form id="question_form" name="question_form" method="post" action="#">
        <ul>
          <li class="question-item">
            Ask question:
            <textarea @paste="questionSave" @keyup="questionSave" required="" v-model="questionLive.question.text" placeholder="prime"></textarea>
          </li>
          <li class="question-live" v-if="questionLive.question !== undefined">
            Question:
            {{ questionLive.question.text }}
          </li>
          <!--<li class="question-item">
            Forum discussion:<input v-model="question.forum" placeholder="forum link">
          </li> -->
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-question',
  components: {
  },
  props: {
    modData: {
      type: Object
    }
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  computed: {
    questionLive: function () {
      return this.$store.state.refcontractQuestion
    }
  },
  methods: {
    questionSave () {
      let questionMod = {}
      questionMod.module = this.modData
      // questionMod.question = this.questionLive
      this.$store.dispatch('actionSetQuestionRefContract', questionMod)
    }
  }
}
</script>

<style>
#question-nxp {
  margin: 1em;
  border: 0px solid grey;
}

#question-nxp header{
  font-weight: bold;
}

#prime-question {
  margin: 1em;
}

.question-item {
  display: block;
  margin: 1em;
}

.question-live {
  font-size: 1.2em;
}
</style>
