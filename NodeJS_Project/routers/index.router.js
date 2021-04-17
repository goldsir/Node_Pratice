const express = require("express");
const router = express.Router();
const service = require("./index.service");
const { v4: uuidv4 } = require('uuid');
const captcha = require("svg-captcha");
const fs = require('fs');
const path = require('path');
const common = require('../common');
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

        msg = {
            resultCode: -1,
            resultMessage: "請輸入驗證碼",
        };
        return res.json(msg);
    }

    let sid = req.signedCookies["sid"] || '';

    if (sid !== '') {

        let captcha = keepCaptcha[sid];

        if (_captcha.toLowerCase() !== captcha.toLowerCase()) {
            msg = {
                resultCode: -1,
                resultMessage: "驗證碼錯誤",
            };
            res.json(msg);
        }
        else {

            // 要再向資料庫那驗證帳號密碼
            let { userName, userPW } = req.body;

            if (userName === 'tc' && userPW === '123456') {

                msg = {
                    resultCode: 0,
                    resultMessage: "登入成功",
                };

                delete keepCaptcha[sid]; // 驗證碼正確，從儲存區移掉 
            }
            else {
                msg = {
                    resultCode: 1,
                    resultMessage: "帳號/密碼錯誤",
                };
            }
            res.json(msg);
        }

    } else {
        msg = {
            resultCode: -1,
            resultMessage: "請重新登入",
        };
        return res.json(msg);
    }
});

function createCaptcha() {
    return captcha.create({
        size: 4,
        ignoreChars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        noise: 2,
        color: false,
        background: "#fff",
        fontSize: 24
    });
}

module.exports = router;