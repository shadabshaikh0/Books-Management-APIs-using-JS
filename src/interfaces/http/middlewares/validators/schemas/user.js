import Joi from '@hapi/joi'

module.exports = {
  createUser: Joi.object().keys({
    email: Joi.string().required(),
    pincode: Joi.string().required(),
    age: Joi.string().required()
  })
}
