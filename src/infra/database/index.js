'use strict'
import mongoose from 'src/infra/mongoose'

module.exports = ({ config }) => {
  return mongoose({ config:config.db })
}
