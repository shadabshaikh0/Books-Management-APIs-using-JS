'use strict'
import sequelize from 'src/infra/sequelize'

module.exports = ({ config }) => {
  if (!config.db) {
    return false
  }

  return sequelize({ config: config.db, basePath: __dirname })
}
