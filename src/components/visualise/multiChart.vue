<template>
  <div id="multi-chart-view"> mmchart
    <!-- <ul v-for="(vEnt) in makeTimeBundles" :key="id">
      <li>
        <div id="additional-chart">
          <reactive :chartData="vEnt.liveDataCollection" :options="vEnt.liveOptions"  :width="1200" :height="600"></reactive>
          {{ vEnt.liveDataCollection.labels[0]}}
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'multichart-view',
  components: {
  },
  data: () => ({
    toolbar:
    {
      active: false,
      text: 'off'
    }
  }),
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
