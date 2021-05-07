import { resolve } from 'src/container'
import moment from 'moment'
moment.tz.setDefault('UTC')
moment.tz.link('Asia/Calcutta|Asia/Kolkata')
// const environment = process.env.NODE_ENV || 'development'
// if (environment.indexOf('staging') >= 0 || environment.indexOf('production') >= 0) {
//   const tracer = require('dd-trace').init()
//   tracer.init({
//     analytics: true,
//     runtimeMetrics: true,
//     logInjection: true
//   })
// }
const app = resolve('app')
app
  .start()
  .catch((error) => {
    console.error(error)
    process.exit()
  })
