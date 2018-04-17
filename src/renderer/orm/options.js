import path from 'path'
import os from 'os'
const storage = path.join(os.homedir(), '/.hisdata/db.sqlite')
const defaultOptions = {
  dialect: 'sqlite',
  operatorsAliases: false,
  storage: storage,
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
    match: [
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
