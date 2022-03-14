import Joi from '@hapi/joi'

module.exports = {
  createBook: Joi.object().keys({
    name: Joi.string().required(),
    author: Joi.string().required()
  })
}
