/*
    express 只是對原生的http做出功能封裝，方便使用。
*/

const express = require('./simpleExpress');
let app = express();   //express 是一個函式 (一對圓括號調用) 


// 註冊一個路由: 匹配規則 
app.get('/a', function (req, res, next) {
    res.write('1.a\n');
    console.log('1');
    next();
});

app.get('/a', function (req, res, next) {
    res.write('2.a\n');
    console.log('2');
    next();

});

app.get('/a', function (req, res, next) {
    res.end('3.a\n');
    console.log('3');
});

app.listen(3000, function () {
    console.log('Server start at 3000 port');
});