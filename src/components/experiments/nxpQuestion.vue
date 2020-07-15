<template>
  <div id="question-nxp">
    <header>QUESTION:</header>
    <div id="prime-question">
      <form id="question_form" name="question_form" method="post" action="#">
        <ul>
          <li class="question-item">
            Prime question:
            <textarea @paste="questionSave" @keyup="questionSave" required="" v-model="question.text" placeholder="prime"></textarea>
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
  data: () => ({
    question:
    {
      text: '',
      forum: ''
    }
  }),
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    questionSave () {
      console.log('save question')
      this.$store.dispatch('actionSetQuestionRefContract', this.question)
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
</style>
