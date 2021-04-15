// https://www.bilibili.com/video/BV1o4411T7gv?p=4

let http = require('http');
let url = require('url');

function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
}

Layer.prototype.match = function (pathname) {
    return this.path === pathname;
}

Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next);
}

// --------------------------------------------------------------------------------------
//路由系統
function Router() {
    this.stack = [];
};

Router.prototype.route = function (path) {

    let route = new Route();
    //如果layer的路徑匹配到了就交給route來處理。
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

// 這個out命名很有意思
Router.prototype.handle(req, res, out) = function () {

    let { pathname } = url.parse(req.url)

    let idx = 0;
    let next = () => {

        if (idx >= this.stack.length) { // 遞歸需要有退出條件
            return out();
        }

        let layer = this.stack[idx++];
        if (layer.match(pathname)) {
            layer.handle_request(req, res, next);

        } else {// 路徑不匹配，繼續往下走
            next();
        }
    }
    next();
}

/*
    每次調用get，就創建一個一個的layer
    而且每個layer上都有一個route
    把get方法中的handler傳到route中，route把handler存起來
*/
Router.prototype.get = function (path, handlers) {
    let route = this.route(path);
    route.get(handlers);
}
// --------------------------------------------------------------------------------------
function Route() {
    this.stack = [];
}

Route.prototype.get = function (handlers) {

    handlers.forEach(fn => {
        let layer = new Layer('', fn);
        layer.method = 'get';
        this.stack.push(layer);
    });
}

Route.prototype.dispatch = function (req, res, out) {

    let idx = 0;
    let next = () => {

        if (idx >= this.stack.length) {
            return out();
        }
        let layer = this.stack[idx++];
        if (layer.method === req.method.toLowerCase()) {
            //如果當前route中的layer的方法匹配到了，執行此layer上的handler
            layer.handle_request(req, res, next)
        }
    }
    next();
}
// --------------------------------------------------------------------------------------

function Application() {

    this._router = new Router();
}

Application.prototype.get = function (path, ...handlers) {
    this._router.get(path, handlers);
}

Application.prototype.listen = function () {


    let server = http.createServer((req, res) => {

        //如果路由系統處理不了這個請求，就調用done，然後掰掰
        function done() {
            res.end(`Cannot ${req.method} ${req.url}`);
        }

        this._router.handle(req, res, done);


    });

    server.listen(...arguments);
}