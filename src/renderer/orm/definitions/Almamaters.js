import { DataTypes } from 'sequelize'
import { startCase, toLower } from 'lodash'
import { AlmamaterLevels } from '../enums'
const tableName = 'Almamaters'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(),
    set: function (Name) {
      Name = toLower(Name)
      Name.replace(/\s+/g, ' ')
      this.setDataValue('Name', Name)
    },
    get: function () {
      let Name = this.dataValues.Name
      Name = startCase(toLower(Name))
      return Name
    }
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
