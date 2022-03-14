import { resolve } from 'src/container'
import moment from 'moment'
const app = resolve('app')
app
  .start()
  .catch((error) => {
    console.error(error)
    process.exit()
  })
