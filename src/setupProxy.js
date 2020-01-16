const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    console.log("PROXY THE REQUEST FOR AUTHLOGIN ROUTE");
    app.use(proxy('/authLogin', { target: 'http://localhost:5000/' }));
};
