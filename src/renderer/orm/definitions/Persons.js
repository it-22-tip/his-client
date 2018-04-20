import { DataTypes } from 'sequelize'
// import moment from 'moment'
import { Faiths, Genders, BloodTypes, MaritalStatuses, BloodRhTypes } from '../enums'
const tableName = 'Persons'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING()
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
    type: DataTypes.VIRTUAL(),
    get: function () {
      return this.get('BirthDate')// Math.abs(parseInt(this.get('BirthDate').diff(moment(), 'years')))
    },
    set: function (val) {
      // this.setDataValue('password', val)
    }
  }
}
export default { tableName, attributes }
