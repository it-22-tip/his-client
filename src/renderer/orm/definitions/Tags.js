import { DataTypes } from 'sequelize'
const tableName = 'Tags'
const attributes = {
  name: DataTypes.STRING
}
export default { tableName, attributes }
