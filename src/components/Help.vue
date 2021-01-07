<template>
  <div id="help-page">
    <h1>Help</h1>
    <div id="help-section">
      <slot name="body">
        Help content
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>
#help-page {
  margin: 1em;
}

#help-topic {
  margin: 2em;
}

#help-topic header {
  font-size: 1.2em;
  font-weight: bold;
}

</style>
