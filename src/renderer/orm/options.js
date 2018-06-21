import path from 'path'
import os from 'os'
const storage = path.join(os.homedir(), '/.hisdata/db.sqlite')
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
  handleDisconnects: true
}
const retry = {
  match: [
    'SequelizeConnectionError',
    'SequelizeConnectionRefusedError',
    'SequelizeHostNotFoundError',
    'SequelizeHostNotReachableError',
    'SequelizeInvalidConnectionError',
    'SequelizeConnectionTimedOutError'
  ]
}
const logging = function () {}

const defaultOptions = {
  dialect: 'sqlite',
  storage: storage,
  define: {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci'
    },
    timestamps: false,
    underscored: false
  },
  pool: pool,
  retry: retry,
  logging: logging
}

export default defaultOptions
