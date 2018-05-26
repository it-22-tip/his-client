<script>
import { Pie } from '@extras/chartjs/BaseCharts'
import Orm from '@mixins/orm'

export default {
  extends: Pie,
  mixins: [
    Orm
  ],
  mounted () {
    this.populate()
    this.renderChart({
      labels: ['SMA', 'D3', 'S1'],
      datasets: [
        {
          backgroundColor: [
            'violet',
            'purple',
            'pink'
          ],
          data: [20, 10, 10]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  methods: {
    async transaction (transaction) {

    },
    async populate () {
      let data
      this.connection = (new this.$orm()).connect()
      try {
        data = await this.connection.query(
          `SELECT * FROM EducationHistories`
        )
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>
