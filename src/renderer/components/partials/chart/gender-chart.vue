<script>
import { Pie } from '@extras/chartjs/BaseCharts'
import Orm from '@mixins/orm'

export default {
  extends: Pie,
  mixins: [
    Orm
  ],
  mounted () {
    this.renderChart({
      labels: ['Laki-Laki', 'Perempuan'],
      datasets: [
        {
          backgroundColor: [
            'pink',
            'purple'
          ],
          data: [20, 20]
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
