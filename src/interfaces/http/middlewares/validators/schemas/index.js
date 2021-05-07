import userSchemas from './user'
const schema = {
  post: {
    '/V1/user/': {
      baseSchema: userSchemas.createUser
    }
  },
  put: {
  },
  get: {
  },
  delete: {
  }
}

module.exports = schema
