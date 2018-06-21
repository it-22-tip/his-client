import { DataTypes } from 'sequelize'
const tableName = 'Addresses'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
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
  }
}
export default { tableName, attributes }
