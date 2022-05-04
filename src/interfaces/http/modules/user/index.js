const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { userService, auth, authorizeMiddleware } = container.cradle

  router.post('/', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = await userService.createUser(req.body)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.patch('/:userUuid', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = await userService.updateUser(req.body, req.params.userUuid)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.delete('/:userUuid', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = await userService.deleteUser(req.params.userUuid)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.get('/', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = (req?.query?.userUuid) ? await userService.findUser(req.query.userUuid): await userService.getAllUsers(req.query.page, req.query.size)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.delete('/', auth.authenticate(), authorizeMiddleware({ idAdmin: true }), async (req, res, next) => {
    try {
      const result = await userService.deleteAllUsers()
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })


  return router
}
