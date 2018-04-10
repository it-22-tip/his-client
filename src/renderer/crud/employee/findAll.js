import { connection, models } from '@/orm'
import include from './include'
const { Employees } = models

const findAll = function () {
  return connection.transaction(
    transaction => {
      return Employees.findAll(
        {
          raw: true,
          transaction: transaction,
          include: include
        }
      )
        .then(
          data => {
            return data
          }
        )
    }
  )
}

export default findAll
