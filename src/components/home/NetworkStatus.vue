<template>
  <div class="hello">
    <header>Network Status</header>
    <div id="connection-status">{{ msg }}</div>
    <button type="button" class="btn" @click="connectNetwork()">Connect</button>
    <button type="button" class="btn" @click="connectNetwork()">New account</button>
    <button type="button" class="btn" @click="connectNetwork()">Self sign-in</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    connectNetwork () {
      console.log('connect to network')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
