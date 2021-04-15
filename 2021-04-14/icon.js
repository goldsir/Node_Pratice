const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(

    function (req, res) {


        let { pathname, query } = url.parse(req.url, true);

        if ('/' === pathname && req.method === 'GET') {
            res.end('hi jegg');

        } else if (pathname === '/favicon.ico' && req.method === 'GET') { // 瀏灠器自動送出的請求，要拿小圖標

            res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            fs.readFile('./favicon.ico', (err, data) => {
                return res.end(data);
            });
        }

        else {
            res.end('there is nothing i can do');
        }
    }
).listen(8080);