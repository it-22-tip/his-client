import { connection, models } from '@/orm'
const { Users } = models

const findOne = function (where) {
  return connection.transaction(
    transaction => {
      return Users.findOne(
        {
          where: where,
          raw: true,
          transaction: transaction
        }
      )
    }
  )
}

export default findOne
