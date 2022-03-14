import {
  createContainer,
  asFunction,
  asValue,
  Lifetime,
  InjectionMode
} from 'awilix'
import { scopePerRequest } from 'awilix-express'

import app from './app'
import server from './interfaces/http/server'
import router from './interfaces/http/router'
import config from '../config'
import database from './infra/database'
import response from './infra/support/response'
import constants from './constants'
import CustomError from './infra/error'
import errorHandlerMiddleware from './interfaces/http/middlewares/error_handler'
import validatorMiddleware from './interfaces/http/middlewares/validators'
import auth from './interfaces/http/auth'


const container = createContainer({
  injectionMode: InjectionMode.PROXY
})

// System
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton()
  })
  .register({
    router: asFunction(router).singleton()
  })
  .register({
    config: asValue(config),
    constants: asValue(constants)
  })

// Middlewares
container
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandlerMiddleware: asFunction(errorHandlerMiddleware)
  })
  .register({
    validatorMiddleware: asFunction(validatorMiddleware).singleton()
  })

// Database
container.register({
  database: asFunction(database).singleton()
})

// Infra
container.register({
  response: asFunction(response).singleton(),
  CustomError: asFunction(CustomError).singleton(),
  auth: asFunction(auth).singleton()
})

container.loadModules(['infra/repositories/**/*.js'], {
  resolverOptions: {
    register: asFunction,
    lifetime: Lifetime.SINGLETON
  },
  cwd: __dirname
})
container.loadModules(['app/**/*.js'], {
  resolverOptions: {
    register: asFunction,
    lifetime: Lifetime.SINGLETON
  },
  cwd: __dirname
})

module.exports = container
