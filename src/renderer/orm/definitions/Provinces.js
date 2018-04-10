import { DataTypes } from 'sequelize'
const tableName = 'Provinces'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.CHAR(2),
    unique: true
  },
  Name: {
    type: DataTypes.STRING()
  }
}
const associations = [

]

export default { tableName, attributes, associations }
