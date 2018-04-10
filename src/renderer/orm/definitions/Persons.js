import { DataTypes } from 'sequelize'
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
  }
}
export default { tableName, attributes }
