import { DataTypes } from 'sequelize'
const tableName = 'DocumentCategories'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  ParentId: {
    type: DataTypes.INTEGER()
  },
  Title: {
    type: DataTypes.STRING()
  }
}

export default { tableName, attributes }
