<template>
  <div id="device-nxp">
    <header>Device Data Source:</header>
    <div id="network-library">
      All device, sensors, data stores need to be described in the <a href="" id="network-library-damahub">Network Library</a>
    </div>
    <div id="prime-device">
      <form id="device_form" name="device_form" method="post" action="#">
        <ul>
          <li class="device-item">
            Network Library Reference Contract:<input placeholder="Reference Contract">
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nxp-device',
  components: {
  },
  computed: {
  },
  data: () => ({
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
#network-library {
  margin: 2em;
}
</style>
