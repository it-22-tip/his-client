import { DataTypes } from 'sequelize'
import { startCase, toLower } from 'lodash'
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
  }
}
const associations = [

]

export default { tableName, attributes, associations }
