import { DataTypes } from 'sequelize'
const tableName = 'Documents'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING()
  }
}
export default { tableName, attributes }
