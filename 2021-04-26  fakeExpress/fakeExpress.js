const http = require('http');
const url = require('url');

function express() {

    let app = function (req, res) {

        let reqPath = url.parse(req.url).pathname;
        let reqMethod = req.method.toLowerCase();

        for (let i = 0; i < app.routes.length; ++i) {
            let route = app.routes[i];
            if (route.method == reqMethod && route.path == reqPath) {
                return route.handler(req, res);
            }
        }
        return res.end(`can not ${reqMethod} ${reqPath}`);

    };

    app.routes = [];
    app.get = function (path, handler) {
        app.routes.push({
            method: 'get'
            , path
            , handler
        })
    }

    app.listen = function (...arguments) {
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    return app;
}


module.exports = express;