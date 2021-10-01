const { inputValueCheck } = require('../inputValueCheck');
const bll = require('./article.bll.js');
const router = require('express').Router();
const { jwtVerify, checkLoginForAPI } = require('./member.util.login');
const { resultMessage } = require('../common');
const { webPath } = require('../src/js/webPath');
const { json } = require('express');


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
});

router.get('/:articleId', async function (req, res) {

    // 不帶id的話，匹配不到這條路由，所以不用費心檢查是不是有傳id了
    const articleId = req.params.articleId;

    // 只要確保id是數字就好了
    if (/^\d+$/.test(articleId) === false) {

        res.json(resultMessage(-1, ''));
    }
    else {
        let result = await bll.getArticleById(articleId);
        res.json(result);
    }
});

router.get('/getRepliesByArticleId/:articleId', async function (req, res) {

    // 不帶id的話，匹配不到這條路由，所以不用費心檢查是不是有傳id了
    const articleId = req.params.articleId;

    // 只要確保id是數字就好了
    if (/^\d+$/.test(articleId) === false) {

        res.json(resultMessage(-1, ''));
    }
    else {
        let result = await bll.getRepliesByArticleId(articleId);
        res.json(result);
    }
});

router.post('/reply', checkLoginForAPI, inputValueCheck, async function (req, res) {

    const account = req.userData.account;
    const { articleId, content } = req.body;


    if (typeof content === 'undefined' || content === '') {
        res.json(resultMessage(1, '請輸入內容'));
    }
    else {

        let result = await bll.article_reply(articleId, account, content);
        res.json(result);
    }


});

module.exports = router;