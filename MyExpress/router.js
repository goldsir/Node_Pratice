let Route = require('./route');
let Layer = require('./layer');
const url = require('url');

function Router() {
    this.stack = [];
}

Router.prototype.route = function (path) {
    let route = new Route(path);
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;	// 用來區分一般路由還是中間件
    this.stack.push(layer);
    return route;

    /*
        Router.stack.layer.route   外層匹配 路徑， layer上有 route
         Route.stack.layer         內層匹配 方法， layer上沒 route
    */
}

http.METHODS.forEach((method) => {
    method = method.toLowerCase();
    Router.prototype[method] = function (path, handlers) {
        let route = this.route(path);
        route[method](handlers);
    }
});

Router.prototype.handle = function (req, res, out) {

    let reqPath = url.parse(req.url).pathname;
    let reqMethod = req.method.toLowerCase();

    let idx = 0;
    let next = () => {

        if (idx >= this.stack.length) {
            return out();
        }

        let layer = this.stack[idx++];

        if (layer.match(reqPath) && layer.route && layer.route.handleMethod(reqMethod)) {

            layer.handleRequest(req, res, next);
        }
        else {
            next();
        }
    }

    next();

}
module.exports = Router;