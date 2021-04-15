const http = require('http');
let options = {
    host: '127.0.0.1'
    , port: 3000
    , method: 'POST'
    , path: '/post'
    , headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}


let request = http.request(options, (response) => {

    let buffer = [];
    response.on('data', function (data) {
        buffer.push(data);
    });

    response.on('end', function () {
        let dataStr = Buffer.concat(buffer).toString();  // 01 00 buffer
        console.log(dataStr);
    });

});

request.write('name=jess===');
request.write('&job=rd&&&');
request.end();


/*
    name=jess===&job=rd&&&

    {
        name: 'jess==='
        , job: 'rd&&&'
    }

*/