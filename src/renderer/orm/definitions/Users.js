import { DataTypes } from 'sequelize'
// import Roles from './roles'
const tableName = 'Users'
const attributes = {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING()
  },
  AccountName: {
    type: DataTypes.STRING()
  },
  PassKey: {
    type: DataTypes.STRING()
  },
  Salt: {
    type: DataTypes.STRING()
  },
  Avatar: {
    type: DataTypes.BLOB()
  },
  RoleId: {
    type: DataTypes.INTEGER()
  }
}

export default { tableName, attributes }
