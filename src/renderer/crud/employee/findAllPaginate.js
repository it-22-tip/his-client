import { connection, models } from '@/orm'
import include from './include'
const { Employees } = models

const findAllPaginate = function (perPage, currentPage) {
  let limit = perPage
  let offset
  let order
  return connection.transaction(
    transaction => {
      return Employees.findAll(
        {
          order: order,
          limit: limit,
          offset: offset,
          raw: true,
          transaction: transaction,
          include: include
        }
      )
    }
  )
}

export default findAllPaginate
