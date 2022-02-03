const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app){
    app.use(
        createProxyMiddleware({
            target: 'http://i6b109.p.ssafy.io',
            changeOrigin: true,
        })
    );
};