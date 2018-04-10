import { DataTypes } from 'sequelize'
const tableName = 'LeaveTypes'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING()
  },
  Duration: {
    type: DataTypes.INTEGER()
  }
}
export default { tableName, attributes }
