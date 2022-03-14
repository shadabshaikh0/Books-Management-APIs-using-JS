'use strict'
import mongoose from 'src/infra/mongoose'

module.exports = ({ config }) => {
  if (!config.db) {
    return false
  }  
  return mongoose({ config:config.db })
}
