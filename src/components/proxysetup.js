const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware("/newEntry"), {
            target : 'http://192.168.0.163:8080',       //local machine address
            changeOrigin : true
        },
        createProxyMiddleware("/verifyEmail"), {
            target : 'http://192.168.0.163:8080',       //local machine address
            changeOrigin : true
        }
    )
}