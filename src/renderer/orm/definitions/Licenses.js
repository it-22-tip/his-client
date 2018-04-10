import { DataTypes } from 'sequelize'
const tableName = 'Licenses'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  LicenseTypeId: {
    type: DataTypes.INTEGER()
  },
  Number: {
    type: DataTypes.STRING()
  },
  DueDate: {
    type: DataTypes.DATE()
  }
}
export default { tableName, attributes }
