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

Router.prototype.use = function (path, handler) {

    let layer = new Layer(path, handler);
    this.stack.push(layer);

}

Router.prototype.handle = function (req, res, out) {

    let reqPath = url.parse(req.url).pathname;
    let reqMethod = req.method.toLowerCase();

    let idx = 0;
    let next = () => {

        if (idx >= this.stack.length) {
            return out();
        }

        let layer = this.stack[idx++];

        // Router.stack這個棧中，目前有路由跟中間件2種東西
        if (layer.route) {//一般路由

            if (layer.match(reqPath) && layer.route.handleMethod(reqMethod)) { //路徑跟請求方法都匹配

                layer.handleRequest(req, res, next);
            }
            else {
                next();  // 走下一個layer
            }
        }
        else {// 中間件 (layer上沒有route)

            if (layer.path === '/'

                /* 
                   加上斜線 避免 /user 跟 /user123 匹配上
                   '/user123'.startsWith('/user/') : false
                */
                || reqPath.startsWith(layer.path + '/')
                || layer.match(reqPath)) {

                layer.handleRequest(req, res, next);
            }
            else {
                next();
            }

        }
    }

    next();

}
module.exports = Router;