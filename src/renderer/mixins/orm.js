'use-strict'
import Orm from '@/orm'

export default {
  created () {
    this.$orm = Orm
  }
}
