/*

    express 只是對原生的http做出功能封裝，方便使用。

*/

const express = require('./simpleExpress');
let app = express();

app.get('/a', function (req, res) {
    res.end('a');
});

app.get('/b', function (req, res) {
    res.end('b');
});

app.get('/c', function (req, res) {
    res.end('c');
});

app.listen(3000, function () {
    console.log('Server start at 3000 port');
});