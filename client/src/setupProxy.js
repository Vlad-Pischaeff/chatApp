const proxy = require('http-proxy-middleware')
// // const port = process.env.PORT || 3001
const port = 3001

module.exports = function(app) {
    app.use(proxy('/api/*', { target: `http://192.168.140.68:${port}`, wss: true }))
}
