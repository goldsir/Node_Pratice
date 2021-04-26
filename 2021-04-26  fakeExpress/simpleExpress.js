const http = require('http');
const url = require('url');

function express() {

    let app = function (req, res) {

        let reqPath = url.parse(req.url).pathname;
        let reqMethod = req.method.toLowerCase();

        for (let i = 0; i < app.routes.length; i++) {
            let route = app.routes[i];
            if (route.method === reqMethod && route.path === reqPath) {
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

    app.listen = function () {
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    return app;
}


module.exports = express;


/*

	http.createServer(app);

	=> 內部實現偽代碼(示意用， 不是真正的實現)

		http.createServer = function(callBack){

			let request  = 解析http請求文本 ...
			let response = ....

			http.on('request', function(){  // 當 `每一次` 請求到來的時候調用

				callBack(request, response)
			
			}) ;
		}

*/