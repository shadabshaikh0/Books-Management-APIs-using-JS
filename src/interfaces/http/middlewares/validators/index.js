import joi from '@hapi/joi'
import Schemas from './schemas'
import { isNil, includes, merge, hasPath, path, map, indexOf } from 'ramda'
import pathToRegexp from 'path-to-regexp'
module.exports = ({
  response: { Success, Fail },
  CustomError,
  constants: { INVALID_REQUEST, DEVELOPMENT },
  config
}) => () => {

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put', 'get', 'patch']

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true // remove unknown keys from the validated data
  }

  // return the validation middleware
  return (req, res, next) => {
    const sanitizedRoute = req.path.lastIndexOf('/') === (req.path.length - 1) ? req.path.substring(0, req.path.lastIndexOf('/')) : req.path
    const route = sanitizedRoute.replace('/api', '')
    const method = req.method.toLowerCase()
    let _schema = null
    if (method === 'put' || method === 'post') {
      const methodObj = Schemas[method]
      for (const key in methodObj) {
        if (Object.prototype.hasOwnProperty.call(methodObj, key)) {
          const element = methodObj[key]
          const regexp = pathToRegexp(key)
          const match = regexp.exec(route)
          if (match) {
            _schema = element.baseSchema || element
            break
          }
        }
      }
    }
    if (
      includes(method, _supportedMethods) &&
      (_schema || hasPath([method, route], Schemas))
    ) {
      // get schema for the current route
      if (!_schema) {
        _schema = path([method, route], Schemas)
        _schema = _schema.baseSchema ? _schema.baseSchema : null
      }
      const validateBody = merge(req.query, req.body, req.params)
      if (_schema) {
        // Validate req.body using the schema and validation options
        return joi.object().validateAsync.call(
          _schema,
          validateBody,
          _validationOptions
        ).then(value => {
          // Replace req.body with the data after Joi validation
          if (indexOf(method, ['post', 'put', 'patch']) >= 0) {
            req.body = value
          } else {
            for (const key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key)) {
                if (value[key] === '' || value[key] === null) { delete value[key] }
              }
            }
            req.query = value
          }
          next()
        }).catch(error => {
          if (error) {
            // Joi Error
            const JoiError = {
              status: 'failed',
              error: {
                original: error._object,
                // fetch only message and type from each error
                details: map(
                  (error) => ({
                    message: error.message.replace(/['"]/g, ''),
                    field: error.path && error.path.length ? error.path[0].replace(/['"]/g, '') : error.context && error.context.peers ? error.context.peers : ''
                  }),
                  error.details
                )
              }
            }
            if (config.env === DEVELOPMENT) {
              console.log(JoiError)
            }
            // Custom Error
            next(
              new CustomError(
                INVALID_REQUEST.code,
                INVALID_REQUEST.status,
                isNil(JoiError.error.details)
                  ? 'Please check the request again'
                  : JoiError.error.details
              ))
          }
        })
      }
    }
    next()
  }
}
