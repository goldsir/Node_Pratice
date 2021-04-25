let Layer = require('./layer');
const url = require('url');

function Route(path) {
    this.stack = [];
    this.path = path;
    this.methods = {};
}

http.METHODS.forEach((method) => {
    method = method.toLowerCase();

    Route.prototype[method] = function (handlers) {

        handlers.forEach((handler) => {
            let layer = new Layer('/', handler);
            layer.method = method;
            this.methods[method] = true;
            this.stack.push(layer);
        });
    }
});

Route.prototype.dispatch = function (req, res, out) {

    let reqMethod = req.method.toLowerCase();

    let idx = 0;
    let next = () => {

        if (idx >= this.stack.length) {
            return out();
        }

        let layer = this.stack[idx++];

        if (layer.method === reqMethod) {

            layer.handleRequest(req, res, next);
        }
        else {
            next();
        }
    }
    next();
}

Route.prototype.handleMethod = function (method) {
    method = method.toLowerCase();
    return this.methods[method];

}
module.exports = Route;