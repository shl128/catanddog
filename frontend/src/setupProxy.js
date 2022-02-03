const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app){
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://i6b109.p.ssafy.io:3000',
            changeOrigin: true,
        })
    );
};