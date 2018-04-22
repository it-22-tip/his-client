import { DataTypes } from 'sequelize'
import { startCase, toLower } from 'lodash'
import moment from 'moment'
import { Faiths, Genders, BloodTypes, MaritalStatuses, BloodRhTypes } from '../enums'
const tableName = 'Persons'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(),
    set: function (Name) {
      this.setDataValue('Name', toLower(Name))
    },
    get: function () {
      let Name = this.dataValues.Name
      Name = startCase(toLower(Name))
      return Name
    }
  },
  Avatar: {
    type: DataTypes.BLOB
  },
  Gender: {
    type: DataTypes.ENUM(...Genders.enum),
    defaultValue: Genders.defaultValue
  },
  Faith: {
    type: DataTypes.ENUM(...Faiths.enum),
    defaultValue: Faiths.defaultValue
  },
  BirthDate: {
    type: DataTypes.DATEONLY
  },
  BirthPlaceRegencyCode: {
    type: DataTypes.CHAR(4)
  },
  MaritalStatus: {
    type: DataTypes.ENUM(...MaritalStatuses.enum),
    defaultValue: MaritalStatuses.defaultValue
  },
  BloodType: {
    type: DataTypes.ENUM(...BloodTypes.enum),
    defaultValue: BloodTypes.defaultValue
  },
  BloodRhTypes: {
    type: DataTypes.ENUM(...BloodRhTypes.enum),
    defaultValue: BloodRhTypes.defaultValue
  },
  Phone: {
    type: DataTypes.JSON
  },
  Age: {
    type: new DataTypes.VIRTUAL(DataTypes.INTEGER(), ['BirthDate']),
    get: function () {
      let BirthDate = this.dataValues.BirthDate
      if (BirthDate === null) return 0
      return Math.abs(parseInt(moment(BirthDate).diff(moment(), 'years')))
    },
    set: function (val) {
    }
  }
}
export default { tableName, attributes }
