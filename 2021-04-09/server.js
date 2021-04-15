let http = require('http');
let fs = require('fs');
let url = require('url');
let getPGAPIData = require('./linkapi');  //  linkapi.js => module.exports = getAPIData;
/*
    req   =  request 請求
    , res =  response 響應

    nodemon server.js

    npm install nodemon -g
     -g 全域安裝，安裝一次，不用在個別目錄每次都裝

*/
let server = http.createServer(async (req, res) => {

    let urlInfo = url.parse(req.url, true);
    let { pathname, query } = urlInfo;

    if (pathname === '/favicon.ico') { // 瀏灠器自動送出的請求，要拿小圖標，不回應
        return res.end();
    }

    console.log(`請求到達: ${req.method} ${pathname}`);

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

    } else if (req.method === 'GET' && pathname === '/PGAPI') {

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        console.log(query);
        let start = query.start;
        let end = query.end;
        console.log(start, end);
        let data = await getPGAPIData(start, end);
        res.end(JSON.stringify(data)); // 把data轉成字串型態才能傳給res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('沒有你要的東西，掰掰');
    }
});

server.listen(3000);  // 啟動服務，監聽有沒有請求進來

// 


