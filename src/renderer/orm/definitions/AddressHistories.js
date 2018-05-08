import { DataTypes } from 'sequelize'
import { AddressTypes } from '../enums'
const tableName = 'AddressHistories'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  Address: {
    type: DataTypes.STRING(128)
  },
  Rt: {
    type: DataTypes.INTEGER(3)
  },
  Rw: {
    type: DataTypes.INTEGER(3)
  },
  VillageCode: {
    type: DataTypes.CHAR(10)
  },
  Type: {
    type: DataTypes.ENUM(...AddressTypes.enum),
    defaultValue: AddressTypes.defaultValue
  }
}
const options = {
  timestamps: true
}
export default { tableName, attributes, options }
