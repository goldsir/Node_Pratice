const express = require('express');
const mysqlConnectionPool = require('./mySQLConfig').pool;
let app = express();


// 統一的前置處理流程
app.use(express.static('./web'));                       // 靜態資源服務
app.use(express.urlencoded({ extended: false }));       // 解析請求體  => req.body
app.use(express.json());


//加載路由
app.use('/member', require('./modules/member.router'));
app.use('/article', require('./modules/article.router'));



// 寫爽的， 測試參數型而已
app.get('/', function (req, res, next) {
    let xxx = req.query.xxx || req.body.xxx;
    console.log(xxx, typeof xxx, typeof (typeof xxx), typeof xxx === 'undefined');
    res.end();
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.json(resultMessage(1, '網站忙碌中，請稍後重試。'));
});



app.listen(3000, () => {
    console.log('server start at 3000 port');
});

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);

    mysqlConnectionPool.end(function (err) {
        console.log(`關閉資料庫連線錯誤: ${err}`);
    });
});