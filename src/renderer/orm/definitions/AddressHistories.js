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
    type: DataTypes.STRING()
  },
  Rt: {
    type: DataTypes.INTEGER()
  },
  Rw: {
    type: DataTypes.INTEGER()
  },
  VillageCode: {
    type: DataTypes.CHAR(10)
  },
  Type: {
    type: DataTypes.ENUM(...AddressTypes.enum),
    defaultValue: AddressTypes.defaultValue
  }
}
export default { tableName, attributes }
