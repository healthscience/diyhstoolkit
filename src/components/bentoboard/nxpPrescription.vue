<template>
  <div id="prescription-nxp">
    <header>Food & Medicine:</header>
    <div id="prime-prescription">
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-prescription',
  components: {
  },
  data: () => ({
    prescription:
    {
      text: '',
      forum: ''
    }
  }),
  created () {
  },
  mounted () {
  },
  prescriptiond: {
  },
  methods: {
    saveprescription () {
      console.log('save prescription')
    }
  }
}
</script>

<style>
#prescription-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#prescription-nxp header{
  font-weight: bold;
}

#prime-prescription {
  margin: 1em;
}

.prescription-summary {
  display: inline-block;
}
</style>
