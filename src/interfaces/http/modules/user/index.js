const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { userService } = container.cradle

  router.post('/', async (req, res, next) => {
    try {
      const result = await userService.createUser(req.body)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })
  return router
}
