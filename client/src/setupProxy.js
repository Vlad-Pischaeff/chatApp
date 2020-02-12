require('dotenv').config()
const proxy = require('http-proxy-middleware')
const url = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`

// console.log('proxy--', url, process.env);

module.exports = function(app) {
  app.use('/ws',(req, res, next) => {
    console.log('/ws', req.method, req.params, req.originalUrl, req.path)
    next()
  })
  app.use('/api', proxy({ target: `http://${url}`, changeOrigin: true }))
  app.use('/ws', proxy({ target: `ws://${url}`, ws: true, logLevel: 'debug', changeOrigin: true }))
};