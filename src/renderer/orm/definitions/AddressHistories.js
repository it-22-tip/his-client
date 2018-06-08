import { DataTypes } from 'sequelize'
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
  OfficialAddressId: {
    type: DataTypes.INTEGER()
  },
  PostalAddressId: {
    type: DataTypes.INTEGER()
  }
}
const options = {
  timestamps: true
}
export default { tableName, attributes, options }
