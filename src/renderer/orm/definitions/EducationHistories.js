import { DataTypes } from 'sequelize'
const tableName = 'EducationHistories'
const attributes = {
  Id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  PersonId: {
    type: DataTypes.INTEGER()
  },
  AlmamaterId: {
    type: DataTypes.INTEGER()
  },
  GraduationDate: {
    type: DataTypes.DATEONLY
  },
  CertificateRegistryNumber: {
    type: DataTypes.STRING()
  },
  CertificateRegistryScore: {
    type: DataTypes.STRING()
  }
}
export default { tableName, attributes }
