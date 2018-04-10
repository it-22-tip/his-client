import { DataTypes } from 'sequelize'
const tableName = 'DocumentVersions'
const attributes = {
  DocumentId: {
    type: DataTypes.INTEGER()
  }
}
export default { tableName, attributes }
