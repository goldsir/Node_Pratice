const { inputValueCheck } = require('../inputValueCheck');
const bll = require('./member.bll.js');
const router = require('express').Router();
const { jwtVerify } = require('./member.util.login');
const { resultMessage } = require('../common');

router.post('/register', inputValueCheck, async function (req, res, next) {

    let { account, password } = req.body;

    if (typeof account === 'undefined' || account === '') {
        res.json(resultMessage(1, '請輸入帳號'));
    }
    else if (typeof password === 'undefined' || password === '') {
        res.json(resultMessage(1, '請輸入密碼'));
    }

    let result = await bll.register(account, password);
    res.json(result);

});

router.post('/login', inputValueCheck, async function (req, res, next) {

    let { account, password } = req.body;

    if (typeof account === 'undefined' || account === '') {
        res.json(resultMessage(1, '請輸入帳號'));
    }
    else if (typeof password === 'undefined' || password === '') {
        res.json(resultMessage(1, '請輸入密碼'));
    }
    else {
        let result = await bll.login(account, password, req.ip);
        res.json(result);
    }
});

router.get('/checkLogin', async function (req, res) {

    try {
        let _token = req.header('token') || '';
        let data = await jwtVerify(_token);

        if (data.ip !== req.ip) { //簽出去的token載體，要包含ip，不然會gg								
            res.json(resultMessage(-1, 'IP變動，請重新登入'));
        }
        else {
            res.json(resultMessage(0, ''));
        }
    }
    catch (err) {

        res.json(resultMessage(-1, '請重新登入'));
    }

});

module.exports = router;