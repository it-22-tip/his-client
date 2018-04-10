import { DataTypes } from 'sequelize'
const tableName = 'Infos'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING()
  },
  Count: {
    type: DataTypes.INTEGER()
  }
}
const options = {
  updatedAt: 'UpdatedAt'
}
export default { tableName, attributes, options }
