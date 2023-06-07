<template>
  <div id="education-nxp">Education
    <div v-if="liveEducation">
      <div>
        Allow the embedding of video
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-education',
  components: {
  },
  props: {
    shellID: String,
    moduleCNRL: String,
    mData: String
  },
  computed: {
    liveEducation: function () {
      let boardEducation = {}
      return boardEducation
    }
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
  }
}
</script>

<style scoped>
#education-nxp {
  display: grid;
  grid-template-columns: 1fr;
  border: 0px solid green;
}
</style>
