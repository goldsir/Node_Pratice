const express = require('./fakeExpress');
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