<script>
import { Line } from '@components/extras/chartjs/BaseCharts'
import Orm from '@mixins/orm'

export default {
  extends: Line,
  mixins: [
    Orm
  ],
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'Mei'],
      datasets: [
        {
          label: 'Keterlambatan Rata-Rata',
          backgroundColor: '#f87979',
          data: [14, 13, 15, 15, 13]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  methods: {
    getData () {

    }
  }
}
</script>
