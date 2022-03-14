const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { bookService, auth, authorizeMiddleware } = container.cradle

  router.post('/', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = await bookService.createBook(req.body)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.patch('/:bookUuid', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = await bookService.updateBook(req.body, req.params.bookUuid)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.delete('/:bookUuid', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = await bookService.deleteBook(req.params.bookUuid)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.get('/', auth.authenticate(), authorizeMiddleware({ idAdmin: false }), async (req, res, next) => {
    try {
      const result = (req?.query?.bookUuid) ? await bookService.findBook(req.query.bookUuid): await bookService.getAllBooks(req.query.page, req.query.size)
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })

  router.delete('/', auth.authenticate(), authorizeMiddleware({ idAdmin: true }), async (req, res, next) => {
    try {
      const result = await bookService.deleteAllBooks()
      res.status(Status.OK).json(await Success(result))
    } catch (e) {
      next(e)
    }
  })


  return router
}
