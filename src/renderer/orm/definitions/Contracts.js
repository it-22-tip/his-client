import { DataTypes } from 'sequelize'
const tableName = 'Contracts'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  ContractTypesId: {
    type: DataTypes.INTEGER()
  },
  StartDate: {
    type: DataTypes.DATE()
  },
  EndDate: {
    type: DataTypes.DATE()
  }
}
export default { tableName, attributes }
