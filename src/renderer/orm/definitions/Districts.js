import { DataTypes } from 'sequelize'
import { startCase, toLower } from 'lodash'
const tableName = 'Districts'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.CHAR(7),
    unique: true
  },
  RegencyCode: {
    type: DataTypes.CHAR(4)
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
export default { tableName, attributes }
