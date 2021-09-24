const { inputValueCheck } = require('../inputValueCheck');
const bll = require('./article.bll.js');
const router = require('express').Router();
const { jwtVerify, checkLoginForAPI } = require('./member.util.login');
const { resultMessage } = require('../common');


router.get('/getCategories', async function (req, res, next) {
    let categories = await bll.getCategories();
    res.json(categories);
});

router.post('/add', checkLoginForAPI, async function (req, res) {


    let { categoryId, title, content } = req.body;
    let { account } = req.userData;

    if (typeof categoryId === 'undefined' || categoryId === '') {
        res.json(resultMessage(1, '請選擇分類'));
    }
    else if (typeof title === 'undefined' || title === '') {
        res.json(resultMessage(1, '請輸入標題'));
    }
    else if (typeof content === 'undefined' || content === '') {
        res.json(resultMessage(1, '請輸入內容'));
    }
    else {

        let result = await bll.article_add(account, categoryId, title, content);
        res.json(result);
    }

});

router.get('/list', async function (req, res) {

    let articles = await bll.getArticles();
    res.json(articles);


})

module.exports = router;