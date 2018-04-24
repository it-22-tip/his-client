<script>
import { Pie } from '@extras/chartjs/BaseCharts'
import Orm from '@mixins/orm'

export default {
  mixins: [
    Orm
  ],
  extends: Pie,
  mounted () {
    this.populate()
    this.renderChart({
      labels: ['SMA', 'D3', 'S1'],
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651'
          ],
          data: [5, 25, 5]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  methods: {
    async transaction (transaction) {

    },
    async populate () {
      let data
      this.connection = (new this.$orm).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
      }).connect()
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
