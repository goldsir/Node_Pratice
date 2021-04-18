var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'));

app.get('/setCookie', function (req, res) {

    res.cookie('sid', '123456');
    res.cookie('sid2', '123456', { signed: true });
    res.end();
});

app.get('/cookies', function (req, res) {

    res.json({
        cookies: req.cookies
        , signedCookies: req.signedCookies

    });

});

app.listen(8080)