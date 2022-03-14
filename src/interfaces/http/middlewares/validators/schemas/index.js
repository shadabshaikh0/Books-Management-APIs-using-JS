import bookSchemas from './book'
const schema = {
  post: {
    '/V1/book/': {
      baseSchema: bookSchemas.createBook
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
