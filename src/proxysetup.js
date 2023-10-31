const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        // createProxyMiddleware("/newEntry"), {
        //     target : 'http://51.20.101.214:8080',
        //     changeOrigin : true
        // },
        // createProxyMiddleware("/verifyEmail"), {
        //     target : 'http://51.20.101.214:8080',
        //     changeOrigin : true
        // }
    )
}