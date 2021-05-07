import { basename as _basename, join } from 'path'
import Sequelize from 'sequelize'
import { operatorsAliases } from './operatorAlias'
import { readdirSync } from 'fs'
const decamelize = require('decamelize')

const basename = _basename(__filename)
module.exports = ({ config, basePath }) => {
  let sequelize
  const db = {}
  db.models = {}
  const Op = Sequelize.Op
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], {
      operatorsAliases: operatorsAliases(Op),
      ...config
    })
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      { 
        operatorsAliases: operatorsAliases(Op),
        ...config
      }
    )
  }

  sequelize.addHook('beforeDefine', attributes => {
    Object.keys(attributes).forEach(key => {
      if (typeof attributes[key] !== 'function') {
        attributes[key].field = decamelize(key)
      }
    })
  })

  const dir = join(basePath, './models')

  readdirSync(dir)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      )
    })
    .forEach(file => {
      const model = sequelize['import'](join(dir, file))
      db[model.name] = model
    })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName]['created_by'] = {
        type: Sequelize.UUID
      }
      db[modelName]['updated_by'] = {
        type: Sequelize.UUID
      }
      db[modelName].associate(db)
    }
  })
  db.sequelize = sequelize
  db.Sequelize = Sequelize
  return db
}
