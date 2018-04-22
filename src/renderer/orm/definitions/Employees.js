import { DataTypes } from 'sequelize'
const tableName = 'Employees'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  Ein: {
    type: DataTypes.VIRTUAL(10),
    unique: true,
    get: function () {
      let Id = this.dataValues.Id
      console.log(this)
      // let Birth
      // if (Id === null) return 0
      // return Math.abs(parseInt(moment(BirthDate).diff(moment(), 'years')))
      return Id
    }
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  JobTitleId: {
    type: DataTypes.INTEGER()
  },
  AcceptedDate: {
    type: DataTypes.DATEONLY
  },
  AppointedDate: {
    type: DataTypes.DATEONLY
  },
  ResignDate: {
    type: DataTypes.DATEONLY
  }
}
export default { tableName, attributes }
