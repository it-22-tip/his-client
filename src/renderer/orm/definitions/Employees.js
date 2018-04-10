import { DataTypes } from 'sequelize'
const tableName = 'Employees'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  JobTitleId: {
    type: DataTypes.INTEGER()
  },
  AcceptedDate: {
    type: DataTypes.DATEONLY
  },
  AppointedDate: {
    type: DataTypes.DATEONLY
  },
  ResignDate: {
    type: DataTypes.DATEONLY
  }
}
export default { tableName, attributes }
