<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link class="menu-space" to="/dashboard">Dashboards</router-link> |
      <router-link class="menu-space" to="/datadevicesensor">Data</router-link> |
      <router-link class="menu-space" to="/toolkit">Toolkit</router-link> |
      <router-link to="/about">About</router-link>
      <div class="toolkit-settings">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="toolkit-settings" id="select-language">
        english mandarin
      </div>
      <router-link class="toolkit-settings" to="/help">Help</router-link> |
    </div>
    <router-view/>

  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.toolkit-settings {
  border: 1px solid grey;
  float: right;
}

img {
  width: 120px;
}
</style>
