const defaultOptions = {
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci'
    },
    timestamps: false,
    underscored: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    handleDisconnects: true
  },
  retry: {
    macth: [
      'SequelizeConnectionError',
      'SequelizeConnectionRefusedError',
      'SequelizeHostNotFoundError',
      'SequelizeHostNotReachableError',
      'SequelizeInvalidConnectionError',
      'SequelizeConnectionTimedOutError'
    ]
  },
  logging: () => {}
}

export default defaultOptions
