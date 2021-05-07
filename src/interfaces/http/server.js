const express = require('express')

module.exports = ({ config, router }) => {
  const app = express()
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,browsertimezone,Authorization'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })
  app.disable('x-powered-by')
  app.use(router)
  app.use(express.static('public'))

  return {
    app,
    start: () =>
      new Promise(resolve => {
        const http = app.listen(config.port, () => {
          const { port } = http.address()
          console.log(`🤘 API === Port ${port} :: Environment === ${process.env.NODE_ENV}`)
        })
      })
  }
}
