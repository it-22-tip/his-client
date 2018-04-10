import { DataTypes } from 'sequelize'
const tableName = 'Districts'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.CHAR(7),
    unique: true
  },
  RegencyCode: {
    type: DataTypes.CHAR(4)
  },
  Name: {
    type: DataTypes.STRING()
  }
}
export default { tableName, attributes }
