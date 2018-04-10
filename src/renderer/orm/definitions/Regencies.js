import { DataTypes } from 'sequelize'
const tableName = 'Regencies'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.CHAR(4),
    unique: true
  },
  ProvinceCode: {
    type: DataTypes.CHAR(2)
  },
  Name: {
    type: DataTypes.STRING(255)
  }
}

export default { tableName, attributes }
