const { inputValueCheck } = require('../common');
const bll = require('./member.bll.js');
const router = require('express').Router();

router.post('/register', inputValueCheck, async function (req, res, next) {

    let { account, password } = req.body;
    let result = await bll.register(account, password);
    res.json(result);

});

router.post('/login', inputValueCheck, async function (req, res, next) {

    let { account, password } = req.body;
    let result = await bll.login(account, password);
    res.json(result);

});

module.exports = router;