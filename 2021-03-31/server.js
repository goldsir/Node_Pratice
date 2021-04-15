let http = require('http');  // 載入 Node.js 原生模組 http


// 做為回調函式，當請求(request)到達的時候，做出相對的回應(response)
// 請求 <-> 回應， 不斷重複發生

let count = 1;

function requestListener(req, res) {

    console.log(`這是第 ${count++} 次請求 `);

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write('<html><body>這是首頁，嚶嚶嚶</body></html>');
        res.end();
    }
    else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.write(JSON.stringify(jsonData));
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write('<html><body>抱歉，沒有這個頁面</body></html>');
        res.end();
    }
}

let server = http.createServer(requestListener);  // 這支程式相當於一個網站，只是很微型。


// http://localhost:3000
server.listen(3000, () => {         //監聽3000端口號(port)
    console.log('Server已啟動');
});


/*

    http 協定 {get、post}
    補充資料
    https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type

*/

let jsonData = {
    coord: { lon: 72.85, lat: 19.01 },
    weather: [{ id: 721, main: 'Haze', description: 'haze', icon: '50d' }],
    base: 'stations',
    main: {
        temp: 31.49,
        feels_like: 34.13,
        temp_min: 31,
        temp_max: 32,
        pressure: 1006,
        humidity: 70
    },
    visibility: 5000,
    wind: { speed: 5.7, deg: 300 },
    clouds: { all: 40 },
    dt: 1599127310,
    sys: {
        type: 1,
        id: 9052,
        country: 'IN',
        sunrise: 1599094455,
        sunset: 1599139321
    },
    timezone: 19800,
    id: 1275339,
    name: 'Mumbai',
    cod: 200
}