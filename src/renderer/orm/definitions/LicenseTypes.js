import { DataTypes } from 'sequelize'
const tableName = 'LicenseTypes'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING()
  },
  JobTitleId: {
    type: DataTypes.INTEGER()
  }
}
export default { tableName, attributes }
