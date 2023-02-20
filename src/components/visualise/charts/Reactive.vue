<script>
import { Bar, mixins } from 'vue-chartjs'
// eslint-disable-next-line
import annotation from 'chartjs-plugin-annotation'
// eslint-disable-next-line
import draggable from 'chartjs-plugin-draggable'
const { reactiveProp } = mixins
export default ({
  name: 'reactive-chart',
  components: {
  },
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    options: {
      deep: true,
      // immediate: true,
      handler: function (val, oldVal) {
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
