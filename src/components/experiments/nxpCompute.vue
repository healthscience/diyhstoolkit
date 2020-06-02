<template>
  <div id="compute-nxp">
    <header>COMPUTE used to produce results:</header>
    <div id="prime-compute">
      <form id="compute_form" name="compute_form" method="post" action="#">
        <ul>
          <li class="compute-summary">
            Prime compute:<input v-model="compute.text" placeholder="prime">
          </li>
          <li class="compute-summary">
            Github:<input v-model="compute.forum" placeholder="git link">
          </li>
        </ul>
      </form>
      <div id="view-controls-compute">
      </div>
      <div class="compute-code">
        <a href="#" id="add-compute" >add</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nxp-compute',
  components: {
  },
  computed: {
  },
  data: () => ({
    compute:
    {
      text: '',
      forum: ''
    }
  }),
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
#compute-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#compute-nxp header{
  font-weight: bold;
}

#prime-compute {
  margin: 1em;
}

.compute-summary {
  display: block;
  margin: 2em;
}
</style>
