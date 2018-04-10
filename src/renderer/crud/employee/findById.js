import { connection, models } from '@/orm'
import include from './include'
const { Employees } = models

const findById = function (id) {
  return connection.transaction(
    transaction => {
      return Employees.findById(
        id,
        {
          // raw: true,
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

export default findById
