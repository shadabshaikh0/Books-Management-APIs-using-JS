import { resolve } from 'path'

module.exports = (moduleName, controllerUri) => {
  const controllerPath = resolve(
    'src/interfaces/http/modules/' + moduleName + '/',
    controllerUri
  )
  const Controller = require(controllerPath)
  return Controller()
}
