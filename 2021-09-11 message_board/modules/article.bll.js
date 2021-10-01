const { resultMessage } = require('../common');
const dal = require('./article.dal');


async function getCategories() {


    let dbResult = await dal.getCategories();

    if (dbResult === 'dbError') {
        return [];
    }

    return dbResult;
}

async function getArticles() {

    let dbResult = await dal.getArticles();

    if (dbResult === 'dbError') {
        return [];
    }

    return dbResult;

}

async function article_add(account, categoryId, title, content) {

    let dbResult = await dal.article_add(account, categoryId, title, content);

    if (dbResult === 'dbError') {
        return resultMessage(1, '貼文失敗');
    }
    else {
        if (dbResult.affectedRows === 1) {
            return resultMessage(0, '貼文成功');
        }
        else {
            return resultMessage(1, '貼文失敗');
        }
    }
}

async function article_reply(articleId, account, content) {

    let dbResult = await dal.article_reply(articleId, account, content)

    if (dbResult === 'dbError') {
        return resultMessage(1, '貼文失敗');
    }
    else {
        if (dbResult.affectedRows === 1) {
            return resultMessage(0, '貼文成功');
        }
        else {
            return resultMessage(1, '貼文失敗');
        }
    }
}



async function getRepliesByArticleId(articleId) {

    let dbResult = await dal.getRepliesByArticleId(articleId);

    if (dbResult === 'dbError') {
        return resultMessage(1, '');
    }
    else {

        if (dbResult.length === 0) {
            return resultMessage(1, '', []);
        }
        else {
            return resultMessage(0, '', dbResult);
        }

    }
}

async function getArticleById(articleId) {

    let dbResult = await dal.getArticleById(articleId);

    if (dbResult === 'dbError') {
        return resultMessage(1, '');
    }
    else {

        if (dbResult.length === 0) {
            return resultMessage(1, '');
        }
        else {
            return resultMessage(0, '', dbResult[0]);
        }

    }
}

module.exports = {
    getCategories
    , article_add
    , getArticles
    , getArticleById
    , article_reply
    , getRepliesByArticleId
}