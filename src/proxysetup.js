const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware("/newEntry"), {
            target : 'http://192.168.0.163:8080',
            changeOrigin : true
        }
    )
}