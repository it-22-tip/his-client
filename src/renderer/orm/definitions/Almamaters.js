import { DataTypes } from 'sequelize'
import { AlmamaterLevels } from '../enums'
const tableName = 'Almamaters'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING()
  },
  AlmamaterLevel: {
    type: DataTypes.ENUM(...AlmamaterLevels.enum),
    defaultValue: AlmamaterLevels.defaultValue
  },
  ProgramStudy: {
    type: DataTypes.STRING()
  },
  RegencyCode: {
    type: DataTypes.CHAR(4)
  }
}
export default { tableName, attributes }
