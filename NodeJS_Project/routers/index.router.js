const express = require("express");
const router = express.Router();
const service = require("./index.service");
const { v4: uuidv4 } = require('uuid');
const captcha = require("svg-captcha");
const fs = require('fs');
const path = require('path');
const common = require('../common');
const { resultMessage } = common;
const keepCaptcha = {};				 // 儲存圖片驗證碼用的

router.get("/", function (req, res) {
    res.send("這是首頁");
    // send 會在 response header 中加上 Content-Type
    // end 則不會加 Content-Type
});

/*  檢查環境參數用的*/
router.get("/config", (req, res) => {
    let config = common.getConfig();
    res.json(config);
});

router.get("/keepCaptcha", (req, res) => {
    let config = common.getConfig();
    res.json(keepCaptcha);
});

router.get("/myIP", (req, res) => {
    res.send(req.ip);
});

router.get("/captcha", (req, res) => {

    let sid = req.signedCookies["sid"] || uuidv4();

    if (req.signedCookies.sid === undefined) // 沒拿sid，就塞一個給你
    {
        res.cookie("sid", sid, {
            maxAge: 1000 * 60 * 10,       // 10分鐘內有效 (不寫maxAge的話，會變session cookie)
            signed: true,                 // 會丟進 req.signedCookies => 還原: decodeURIComponent('signedCookieValue');
            httpOnly: true
        });
    }

    res.setHeader("Content-Type", "image/svg+xml")
    let captchaObj = createCaptcha();
    console.log(sid, captchaObj.text);
    keepCaptcha[sid] = captchaObj.text;
    res.send(captchaObj.data);
});

router.post('/login', (req, res) => {

    let msg = {};

    let _captcha = req.body.captcha || "";

    if (_captcha === "") {

        return res.json(resultMessage(-1, '請輸入驗證碼'));
    }

    let sid = req.signedCookies["sid"] || '';

    if (sid !== '') {

        let captcha = keepCaptcha[sid];

        if (_captcha.toLowerCase() !== captcha.toLowerCase()) {

            res.json(resultMessage(-1, '驗證碼錯誤'));
        }
        else {

            // 要再向資料庫那驗證帳號密碼
            let { userName, userPW } = req.body;

            if (userName === 'tc' && userPW === '123456') {

                delete keepCaptcha[sid]; // 驗證碼正確，從儲存區移掉 
                res.json(resultMessage(0, '登入成功'));
            }
            else {

                res.json(resultMessage(-1, '帳號/密碼錯誤'));
            }

        }

    } else {

        res.json(resultMessage(-1, '請重新登入'));
    }
});

function createCaptcha() {
    return captcha.create({
        size: 4
        , ignoreChars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        , noise: 2
        , color: true
        , background: "#888888"
        , fontSize: 64
        , width: 120
        , height: 60
    });
}

module.exports = router;