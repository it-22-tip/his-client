import { DataTypes } from 'sequelize'
const tableName = 'Leaves'
const attributes = {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  LeaveTypeId: {
    type: DataTypes.INTEGER()
  },
  SubmissionDate: {
    type: DataTypes.DATEONLY
  },
  EffectiveDate: {
    type: DataTypes.DATEONLY
  },
  Reason: {
    type: DataTypes.STRING()
  }
}
export default { tableName, attributes }
