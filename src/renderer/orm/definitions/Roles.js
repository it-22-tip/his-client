import { DataTypes } from 'sequelize'
const tableName = 'Roles'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING()
  }
}

export default { tableName, attributes }
