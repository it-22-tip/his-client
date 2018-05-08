import { DataTypes } from 'sequelize'
import { startCase, toLower, toUpper } from 'lodash'
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
    type: DataTypes.STRING(32),
    set: function (Name) {
      Name = toLower(Name)
      Name.replace(/\s+/g, ' ')
      if (Name.includes('jakarta')) {
        Name = 'dki jakarta'
      }
      if (Name.includes('yogyakarta') || Name.includes('jogjakarta')) {
        Name = 'di yogyakarta'
      }
      this.setDataValue('Name', Name)
    },
    get: function () {
      let Name = this.dataValues.Name
      if (Name.includes('jakarta') || Name.includes('yogyakarta')) {
        let splitName = Name.split(' ')
        return toUpper(splitName[0]) + ' ' + startCase(splitName[1])
      } else {
        Name = startCase(toLower(Name))
      }
      return Name
    }
  }
}
const associations = [

]

export default { tableName, attributes, associations }
