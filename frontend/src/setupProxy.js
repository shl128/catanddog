const { createProxyMiddleware } = require('http-proxy-middleware');
// 로컬로 테스트 할 경우 => http://localhost:8080
// 배포된 서버로 테스트 할 경우 => http://i6b109.p.ssafy.io:8080
module.exports = function (app){
    app.use(
        createProxyMiddleware('/api/v1', {
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};