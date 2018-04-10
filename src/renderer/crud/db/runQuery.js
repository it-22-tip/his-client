export default function (sequelize, query) {
  return sequelize.transaction(
    transaction => {
      let options = {
        transaction: transaction,
        type: sequelize.QueryTypes.RAW,
        raw: true
      }
      return sequelize.query(query, options)
        .then(
          value => { return true },
          error => { throw error }
        )
    }
  )
}
