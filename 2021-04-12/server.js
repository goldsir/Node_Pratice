const http = require('http');
const url = require('url');
const fs = require('fs');
let getPGAPIData = require('./linkapi');

let server = http.createServer(async (req, res) => {

    let urlInfo = url.parse(req.url, true);
    let { pathname, query } = urlInfo;


    if (pathname === '/favicon.ico') { // 瀏灠器自動送出的請求，要拿小圖標，不回應
        return res.end();
    }

    console.log(pathname, query);


    if (req.method === 'GET' && pathname === '/') {

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        fs.readFile('./pgslot.html', 'utf8', (err, data) => {

            if (err) {
                res.end('壞掉了');
            }
            else {
                res.end(data);
            }
        });

    }
    else if (req.method === 'GET' && pathname === '/PGAPI') {

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        console.log(query);
        let start = query.start;
        let end = query.end;
        let data = await getPGAPIData(start, end);
        res.end(JSON.stringify(data));
        //res.end(data);
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('沒有你要的東西，掰掰');
    }


});
server.listen(3000);