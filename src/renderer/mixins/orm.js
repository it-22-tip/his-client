'use-strict'
import Orm from '@/orm'

export default {
  created () {
    this.$orm = Orm
    this.$connection = null
  },
  methods: {
    async closeConnection (connection) {
      if (connection !== undefined && connection !== null && typeof connection.close === 'function') {
        console.log('cleaning connection')
        try {
          await connection.close()
        } finally {
          connection = null
        }
      }
    }
  }
}
