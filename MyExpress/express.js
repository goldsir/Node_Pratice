const http = require('http');
const Router = require('./router');

console.log('my express');

function Application() {

    this._router = new Router();

}

http.METHODS.forEach((method) => {

    method = method.toLowerCase();
    Application.prototype[method] = function (path, ...handlers) { // ...形式參數 => []

        this._router[method](path, handlers);
    }
});

Application.prototype.listen = function () {

    let server = http.createServer((req, res) => {

        function done() {
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this._router.handle(req, res, done);

    });

    server.listen(...arguments);
}

module.exports = function createApplication() {
    return new Application();
};