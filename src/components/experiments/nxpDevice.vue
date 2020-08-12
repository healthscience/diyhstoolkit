<template>
  <div id="device-nxp">
    <header>Device Data Source:</header>
    <div id="network-library">
      All device, sensors, data stores need to be described in the <a href="" id="network-library-damahub">Network Library</a>
    </div>
    <div id="prime-device">
      <form id="device_form" name="device_form" method="post" action="#">
        <ul v-for="ds of datasource" :key="ds.id">
          <device-source></device-source>
        </ul>
          <button type="button" class="btn" @click="addDatasource()">add data source</button>

      </form>
    </div>
  </div>
</template>

<script>
import DeviceSource from './nxpDeviceAdd.vue'

export default {
  name: 'nxp-device',
  components: {
    DeviceSource
  },
  computed: {
  },
  data: () => ({
    countD: 1,
    datasource: [1]
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    addDatasource () {
      console.log('add another data source')
      console.log(this.countD)
      this.countD++
      console.log(this.countD)
      this.datasource.push(this.countD)
    }
  }
}
</script>

<style>
#network-library {
  margin: 2em;
}

.ref-pair {
  display: block;
}
</style>
