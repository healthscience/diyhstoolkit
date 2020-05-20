<script>
import { Bar, mixins } from 'vue-chartjs'
// eslint-disable-next-line
import annotation from 'chartjs-plugin-annotation'
// eslint-disable-next-line
import draggable from 'chartjs-plugin-draggable'
const { reactiveProp } = mixins

export default ({
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    optionsa: function () {
      console.log('watching for update chart data')
      this.renderChart(this.chartData, this.options)
    },
    options: {
      deep: true,
      handler: function (val, oldVal) {
        console.log('watcheru')
        this.renderChart(this.chartData, this.options)
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
})
</script>
