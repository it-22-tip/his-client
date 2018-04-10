import { DataTypes } from 'sequelize'
const tableName = 'RoleAbilities'
const attributes = {
  RoleId: {
    type: DataTypes.INTEGER()
  },
  AbilityId: {
    type: DataTypes.INTEGER()
  }
}
export default { tableName, attributes }
