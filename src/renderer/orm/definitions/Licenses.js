import moment from 'moment'
import { DataTypes } from 'sequelize'
const tableName = 'Licenses'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  LicenseTypeId: {
    type: DataTypes.INTEGER()
  },
  Number: {
    type: DataTypes.STRING()
  },
  DueDate: {
    type: DataTypes.DATE(),
    validate: {
      notBeforeToday (BirthDate) {
        if (parseInt(moment(BirthDate).diff(moment(), 'second')) < 0) throw new Error('')
      }
    }
  },
  TimeLeft: {
    type: new DataTypes.VIRTUAL(DataTypes.INTEGER(), ['DueDate']),
    get: function () {
      let DueDate = this.dataValues.DueDate
      if (DueDate === null) return 0
      return Math.abs(parseInt(moment(DueDate).diff(moment(), 'month')))
    },
    set: function (val) {
    }
  }
}
export default { tableName, attributes }
