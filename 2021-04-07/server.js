let http = require('http');
let count = 1;
function requestListener(req, res) {// req = request, res =response

    console.log(`這是第 ${count++} 次請求 `);
    console.log(req.url, req.method);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(`
				<html>
					<body>這是首頁，嚶嚶嚶</body>
				</html>
		`);
        res.end();
    } else if (req.url === '/handlePost' && req.method === 'POST') {

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

        let buffer = [];

        req.on('data', function (data) {

            console.log('data from client', data);
            res.write(`【${data}】<br>`);
            buffer.push(data);
        });

        req.on('end', function () {  // 客戶端把請求資料傳輸完畢

            let dataStr = Buffer.concat(buffer).toString();  // 收集完全部資料
            console.log(`data from client ${dataStr}`);
            res.end(`<br>接收完客戶端全部資料${dataStr}`);          // 回應給客戶端

        });

    }

    else if (req.url === '/api' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.write(JSON.stringify(jsonData));
        res.end();
    }

    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(`
				<html>
					<body>抱歉，沒有這個頁面</body>
				</html>`
        );
        res.end();
    }
}

let server = http.createServer(requestListener);
server.listen(3000, () => {
    console.log('Server已啟動');
});

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