const { assoc } = require('ramda')

module.exports = ({ config }) => {
  const defaultResponse = (success = true) => {
    return {
      success,
      version: config.version,
      date: new Date()
    }
  }

  const Success = async (data) => {
    return assoc(
      'data',
      data,
      defaultResponse(true)
    )
  }

  const Fail = async (data) => {
    return assoc(
      'error',
      data,
      defaultResponse(false)
    )
  }

  return {
    Success,
    Fail
  }
}
