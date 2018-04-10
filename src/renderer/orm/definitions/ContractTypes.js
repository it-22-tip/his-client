import { DataTypes } from 'sequelize'
const tableName = 'ContractTypes'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING()
  },
  Duration: {
    type: DataTypes.INTEGER()
  },
  Unit: {
    type: DataTypes.ENUM('Month', 'Year')
  }
}
export default { tableName, attributes }
