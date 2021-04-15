const { urlencoded } = require('express');
const express = require('express');
let app = express();
app.use('/', express.static('web'));

app.use('/', function (req, res, next) {
    res.setHeader('X-powered-By', 'PHP');
    next();
})

app.post('/post', function (req, res) {

    let buffer = [];

    req.on('data', function (data) {
        buffer.push(data);

    });

    req.on('end', function () {

        let dataStr = Buffer.concat(buffer).toString('utf8');
        let obj = {};

        dataStr.split('&').forEach((str) => {
            let [key, value] = str.split('=');
            obj[key] = formURLDecodeComponent(value);
        });


        res.json(obj);
    });
});

app.listen(3000);


// application/x-www-form-urlencoded
function formURLDecodeComponent(s) {
    return decodeURIComponent((s + '').replace(/\+/g, ' '));
}