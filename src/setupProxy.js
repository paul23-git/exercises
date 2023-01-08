const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api/main', {
        target: 'http://localhost:1337/',
        pathRewrite: {
            '^/api/twikey': ''
        }
    }));
};
