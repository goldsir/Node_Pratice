const http = require('http');

let options = {
    host: '127.0.0.1'
    , port: '3000'
    , method: 'POST'  // http方法名都是大寫  【HTTP方法+網址 = 路由】
    , path: '/handlePost'
    , headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // 
    }
}

let request = http.request(options, (response) => {

    let buffer = [];

    response.on('data', function (data) {
        console.log('data from server', data);
        buffer.push(data);
    });

    response.on('end', function () {
        let dataStr = Buffer.concat(buffer).toString();  // 01 00 buffer
        console.log('end', dataStr);
    });

    response.on('error', function (error) {

        console.log(error);
    });

});

// 資料傳輸: stream
//request.write('name=jess');
//request.write('&job=rd');
//request.write('&sound=嚶嚶嚶');
//request.write('&action=扁嘴');
request.end();

/*


let request = http.request(options, (response) => {

    let buffer = [];
    response.on('data', function (data) {
        console.log('data from server', data);
        buffer.push(data);
    });


    response.on('end', function () {
        let dataStr = Buffer.concat(buffer).toString();
        console.log('end', dataStr);
    });
});

request.write('name=jess');
request.write('&job=rd');
request.write('&sound=嚶嚶嚶');
request.write('&action=扁嘴');
request.end();




&& req.method === 'GET'

    else if (req.url === '/handlePost' && req.method === "POST") {



    }

*/