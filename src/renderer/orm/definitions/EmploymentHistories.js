import { DataTypes } from 'sequelize'
const tableName = 'EmploymentHistories'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  EmployeeId: {
    type: DataTypes.INTEGER()
  },
  EmploymentEventDate: {
    type: DataTypes.DATEONLY
  },
  EmploymentEvent: {
    type: DataTypes.STRING()
  }
}
export default { tableName, attributes }
