import { DataTypes } from 'sequelize'
const tableName = 'Villages'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.CHAR(10),
    unique: true
  },
  DistrictCode: {
    type: DataTypes.CHAR(7)
  },
  Name: {
    type: DataTypes.STRING(255)
  }
}

export default { tableName, attributes }
