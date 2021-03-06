/* for (let definition of definitions) {
  const { tableName, association } = definition
  if (association === undefined) continue
  for (let item of association) {
    const { type, to, options } = item
    if (type === 'belongsTo') {
      this.sequelize.models[tableName][type](this.sequelize.models[to], options)
    } else {
      this.sequelize.models[to][type](this.sequelize.models[tableName], options)
    }
  }
} */

const associations = function (models) {
  const {
    Addresses,
    AddressHistories,
    Almamaters,
    Districts,
    Employees,
    JobTitles,
    Licenses,
    LicenseTypes,
    Persons,
    Provinces,
    Regencies,
    Villages,
    EducationHistories,
    EmploymentHistories
  } = models

  Provinces.hasMany(Regencies, {foreignKey: 'ProvinceCode', sourceKey: 'Code'})
  Regencies.belongsTo(Provinces, {foreignKey: 'ProvinceCode', targetKey: 'Code'})
  Regencies.hasMany(Districts, {foreignKey: 'RegencyCode', sourceKey: 'Code'})
  Districts.belongsTo(Regencies, {foreignKey: 'RegencyCode', targetKey: 'Code'})
  Districts.hasMany(Villages, {foreignKey: 'DistrictCode', sourceKey: 'Code'})
  Villages.belongsTo(Districts, {foreignKey: 'DistrictCode', targetKey: 'Code'})
  Regencies.hasMany(Almamaters, {foreignKey: 'RegencyCode', sourceKey: 'Code', as: 'AlmamatersRegency'})
  Almamaters.belongsTo(Regencies, {foreignKey: 'RegencyCode', targetKey: 'Code', as: 'RegencyAlmamater'})
  Regencies.hasMany(Persons, {foreignKey: 'BirthPlaceRegencyCode', sourceKey: 'Code'})
  Persons.belongsTo(Regencies, {foreignKey: 'BirthPlaceRegencyCode', targetKey: 'Code', as: 'BirthPlaceRegency'})
  Persons.hasMany(AddressHistories)
  AddressHistories.belongsTo(Persons)

  // AddressHistories.belongsTo(Addresses); // Will add AddressId to AddressHistories

  /* Persons.hasMany(Addresses, {
    through: {
      model: AddressHistories,
      unique: false
    },
    as: 'PersonOfficialAddress',
    foreignKey: 'OfficialAddressId',
    constraints: false
  })

  Persons.hasMany(Addresses, {
    through: {
      model: AddressHistories,
      unique: false
    },
    as: 'PersonPostalAddress',
    foreignKey: 'PostalAddressId',
    constraints: false
  }) */

  Addresses.hasOne(AddressHistories, {foreignKey: 'OfficialAddressId', sourceKey: 'Id', as: 'AddressHistoriesOfficialAddress'})
  Addresses.hasOne(AddressHistories, {foreignKey: 'PostalAddressId', sourceKey: 'Id', as: 'AddressHistoriesPostalAddress'})

  // AddressHistories.belongsTo(Addresses, {foreignKey: 'OfficialAddressId', targetKey: 'Id', as: 'OfficialAddressAddressHistories'})
  // AddressHistories.belongsTo(Addresses, {foreignKey: 'PostalAddressId', targetKey: 'Id', as: 'PostalAddressAddressHistories'})

  /* Persons.belongsToMany(LicenseTypes, {through: Licenses, foreignKey: 'PersonId'})
  LicenseTypes.belongsToMany(Persons, {through: Licenses, foreignKey: 'LicenseTypeId'}) */

  Employees.hasMany(EmploymentHistories, {foreignKey: 'EmployeeId', sourceKey: 'Id'})
  EmploymentHistories.belongsTo(Employees, {foreignKey: 'EmployeeId', targetKey: 'Id'})

  Persons.belongsToMany(Almamaters, {through: EducationHistories, foreignKey: 'PersonId'})
  Almamaters.belongsToMany(Persons, {through: EducationHistories, foreignKey: 'AlmamaterId'})
  // Persons.hasMany(EducationHistories, {foreignKey: 'PersonId', sourceKey: 'Id'})
  // EducationHistories.belongsTo(Persons, {foreignKey: 'PersonId', targetKey: 'Id'})

  EducationHistories.hasOne(Almamaters, {foreignKey: 'AlmamatersId', sourceKey: 'Id'})
  Almamaters.belongsTo(EducationHistories, {foreignKey: 'AlmamatersId', targetKey: 'Id'})

  // Villages.hasMany(AddressHistories, {foreignKey: 'VillageCode', sourceKey: 'Code', as: 'VillageAddress'})
  // AddressHistories.belongsTo(Villages, {foreignKey: 'VillageCode', targetKey: 'Code', as: 'AddressVillage'})

  // Person.hasMany

  JobTitles.hasMany(Employees, {foreignKey: 'JobTitleId', sourceKey: 'Id'})
  Employees.belongsTo(JobTitles, {foreignKey: 'JobTitleId', targetKey: 'Id'})
  Persons.hasOne(Employees, {foreignKey: 'PersonId', sourceKey: 'Id'})
  Employees.belongsTo(Persons, {foreignKey: 'PersonId', targetKey: 'Id'})
  Persons.hasMany(Licenses, {foreignKey: 'PersonId', sourceKey: 'Id'})
  Licenses.belongsTo(Persons, {foreignKey: 'PersonId', targetKey: 'Id'})
  LicenseTypes.hasMany(Licenses, {foreignKey: 'LicenseTypeId', sourceKey: 'Id'})
  Licenses.belongsTo(LicenseTypes, {foreignKey: 'LicenseTypeId', targetKey: 'Id'})
  JobTitles.hasMany(LicenseTypes, {foreignKey: 'JobTitleId', sourceKey: 'Id'})
  LicenseTypes.belongsTo(JobTitles, {foreignKey: 'JobTitleId', targetKey: 'Id'})
}
export default associations
