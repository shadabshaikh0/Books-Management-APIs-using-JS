import { errorCodes } from './error_codes'

const environments = {
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production'
}

const PAGINATION_CONSTANT = {
  LIMIT: 10,
  OFFSET: 0
}

module.exports = {
  PAGINATION_CONSTANT,
  ...environments,
  ...errorCodes
}
