const { resultMessage, inputValueCheck } = require('../common');
const bll = require('./member.bll.js');
const router = require('express').Router();


router.post('/register', inputValueCheck, async function (req, res, next) {

    let { account, password } = req.body;
    let registerResult = await bll.register(account, password);
    res.json(registerResult);

});

module.exports = router;