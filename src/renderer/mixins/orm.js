'use-strict'
import Orm from '@/orm'

export default {
  created () {
    this.$orm = Orm
    this.$connection = null
  },
  methods: {
    async closeConnection () {
      if (this.$connection !== null && typeof this.$connection.close === 'function') {
        console.log('cleaning connection')
        try {
          await this.$connection.close()
        } finally {
          this.$connection = null
        }
      }
    }
  },
  async beforeDestroy () {
    await this.closeConnection()
  }
}
