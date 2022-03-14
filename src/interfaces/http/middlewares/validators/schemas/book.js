import Joi from '@hapi/joi'

module.exports = {
  createBook: Joi.object().keys({
    name: Joi.string().required(),
    authorName: Joi.string().required(),
    releaseDate: Joi.number().required()
  })
}
