'use-strict'
import Sequelize from 'sequelize'
import runQuery from './runQuery'
let sequelize = null
let query = `DROP database simrs`

const create = async function (options) {
  sequelize = new Sequelize(options)
  try {
    await runQuery(sequelize, query)
  } catch (error) {
    throw error
  }
  sequelize = null
}

export default create
