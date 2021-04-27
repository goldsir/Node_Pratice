const express = require("express");
const router = express.Router();
const service = require("./index.service");
const { v4: uuidv4 } = require('uuid');
const captcha = require("svg-captcha");
const { resultMessage, checkLogin, getConfig, log, jwtVerify } = require('../common');
const keepCaptcha = {}; // 儲存圖片驗證碼用的

/*
    res.send 會在 response header 中加上 Content-Type
    res.end  不會加 Content-Type
*/
router.get("/", function (req, res) {
    res.send("這是首頁");
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

    let captchaObj = createCaptcha();
    console.log(sid, captchaObj.text);
    keepCaptcha[sid] = captchaObj.text;
    res.setHeader("Content-Type", "image/svg+xml")
    res.send(captchaObj.data);
});

router.post('/checkLogin', async function (req, res) {

    let isLogin = false;

    try {

        let _token = req.get('token') || '';
        let data = await jwtVerify(_token);
        if (data.ip == req.ip) {
            isLogin = true;
        }
    }
    catch (err) {
    }

    res.json({ isLogin: isLogin });

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
                res.json(resultMessage(1, '帳號/密碼錯誤'));
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