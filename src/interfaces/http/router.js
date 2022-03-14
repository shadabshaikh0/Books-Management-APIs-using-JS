import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import { Router } from 'express'
import controller from './utils/create_controller'

module.exports = ({
  config,
  containerMiddleware,
  errorHandlerMiddleware,
  validatorMiddleware
}) => {
  const router = Router()
  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  const apiRouter = Router()
  apiRouter
    .use(
      cors({
        origin: [config.clientEndPoint],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
          'Content-Type'
        ]
      })
    )
    .use(
      urlencoded({
        extended: false
      })
    )
    .use(json())
    .use(compression())
    .use(containerMiddleware)

  apiRouter.use(validatorMiddleware())
  apiRouter.use(`/api/V1/book`, controller('book', 'index'))

  router.use(`/`, apiRouter)
  router.use(errorHandlerMiddleware)
  return router
}
