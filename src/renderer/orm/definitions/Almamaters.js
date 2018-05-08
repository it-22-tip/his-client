import { DataTypes } from 'sequelize'
import { startCase, toLower, toUpper } from 'lodash'
import { AlmamaterLevels } from '../enums'
const tableName = 'Almamaters'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(64),
    set: function (Name) {
      Name = toLower(Name)
      Name.replace(/\s+/g, ' ')
      this.setDataValue('Name', Name)
    },
    get: function () {
      let Name = this.dataValues.Name
      Name = toUpper(Name)
      return Name
    }
  },
  AlmamaterLevel: {
    type: DataTypes.ENUM(...AlmamaterLevels.enum),
    defaultValue: AlmamaterLevels.defaultValue
  },
  ProgramStudy: {
    type: DataTypes.STRING(32),
    set: function (ProgramStudy) {
      ProgramStudy = toLower(ProgramStudy)
      ProgramStudy.replace(/\s+/g, ' ')
      if (ProgramStudy.length === 0) ProgramStudy = 'N/A'
      this.setDataValue('ProgramStudy', ProgramStudy)
    },
    get: function () {
      let ProgramStudy = this.dataValues.ProgramStudy
      if (ProgramStudy === 'ipa' || ProgramStudy === 'ips') return toUpper(ProgramStudy)
      if (ProgramStudy !== 'N/A') return startCase(toLower(ProgramStudy))
      return ProgramStudy
    }
  },
  RegencyCode: {
    type: DataTypes.CHAR(4)
  }
}
export default { tableName, attributes }
