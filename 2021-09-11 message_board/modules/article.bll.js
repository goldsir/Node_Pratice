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

module.exports = {
    getCategories
    , article_add
    , getArticles
}