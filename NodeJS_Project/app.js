const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser');
const common = require("./common");
const { resultMessage } = common;
const app = express();
const cookieSessionSecret = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";

// API    http://expressjs.com/zh-tw/4x/api.html#express
// static https://expressjs.com/zh-tw/starter/static-files.html
// router https://expressjs.com/zh-tw/guide/routing.html
// jwt    https://www.npmjs.com/package/jsonwebtoken


// 統一前置處理流程
app.use(express.static(path.resolve('./web')));         // 靜態資源服務
app.use(express.urlencoded({ extended: false }));       // 解析請求體  => req.body
app.use(express.json());
app.use(cookieParser(cookieSessionSecret));             // 解析cookie => req.cookies

app.use((req, res, next) => {

    let config = common.getConfig();

    if (config.maintainingFlag === true) {

        res.json(resultMessage(1, '網站維護中'));
    }
    else {
        //res.setHeader("Content-Type", "application/json;charset=utf8"); 
        next(); // 讓流程往下走
    }
});

//路由加載
const router_index = require("./routers/index.router");
app.use("/", router_index);

//最末端，不匹配處理
app.all("*", (req, res, next) => {

    res.json(resultMessage(1, '404 not found'));
});

app.use((err, req, res, next) => {
    common.log('uncaughtError.txt', err.stack + '\r\n');
    res.json(resultMessage(1, '網站忙碌中，請稍後重試。'));
});


// 啟動網站
const { port } = common.getConfig();
app.listen(port, () => {
    console.log(`網站已啟動，監聽 ${port} 埠`);
});


/*

    session配置: 目前不想用， 因為只有captcha會需要用而已

    const { v4: uuidv4 } = require('uuid');
    const session = require('express-session');
    app.use(session({
        resave: true
        , saveUninitialized: true
        , secret: cookieSessionSecret
        , genid: function (req) {
            return uuidv4();
        }
    }));

*/