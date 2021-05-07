module.exports = () => {
  class CustomError extends Error {
    constructor (code = 'GENERIC', status = 500, data = {}, ...params) {
      super()
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError)
      }
      this.code = code
      this.status = status
    }
  }

  return CustomError
}
