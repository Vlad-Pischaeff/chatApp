const proxy = require('http-proxy-middleware')
// const port = process.env.PORT || 3001
const port = 3001

module.exports = function(app) {
    app.use(proxy('/api/*', { target: `http://localhost:${port}`, ws: true }))
}
