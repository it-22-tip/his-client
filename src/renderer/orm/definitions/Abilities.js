import { DataTypes } from 'sequelize'
const tableName = 'Abilities'
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
