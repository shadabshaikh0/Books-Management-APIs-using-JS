import { resolve } from 'path'
const dotEnvPath = resolve('.env')
require('dotenv').config({ path: dotEnvPath })
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      underscored: true
    },
    dialectOptions: {
      useUTC: true
    },
    pool: {
      max: 30,
      min: 0,
      acquire: 1000000,
      idle: 10000
    },
    sync: true
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    define: {
      underscored: true
    },
    dialectOptions: {
      useUTC: true
    },
    sync: false,
    pool: {
      max: 60,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
