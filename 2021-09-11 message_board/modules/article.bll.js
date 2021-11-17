const { resultMessage } = require('../common');
const dal = require('./article.dal');
const dbError = 'dbError';


async function getCategories() {


    let dbResult = await dal.getCategories();

    if (dbResult === dbError) {
        return [];
    }

    return dbResult;
}

async function getArticles() {

    let dbResult = await dal.getArticles();

    if (dbResult === dbError) {
        return [];
    }

    return dbResult;

}

async function article_add(account, categoryId, title, content) {


    // 檢查categoryId是不是有效值
    let categories = await getCategories();

    let csCheck = categories.find((item, index) => {

        console.log(item, index);
        return item.id === parseInt(categoryId);

    });

    if (typeof csCheck === 'undefined') {
        return resultMessage(1, '不正確的類別');
    }

    let dbResult = await dal.article_add(account, categoryId, title, content);

    if (dbResult === dbError) {
        return resultMessage(1, '貼文失敗');
    }
    else {
        if (dbResult.affectedRows === 1) {
            updateNodePath(dbResult.insertId);
            return resultMessage(0, '貼文成功');
        }
        else {
            return resultMessage(1, '貼文失敗');
        }
    }
}

async function article_reply(articleId, account, content) {

    let _getArticleById = await dal.getArticleById(articleId);
    let article = _getArticleById[0];

    let dbResult = await dal.article_reply(
        articleId
        , account
        , article.categoryId
        , article.title
        , content)

    if (dbResult === dbError) {
        return resultMessage(1, '回文失敗');
    }
    else {
        if (dbResult.affectedRows === 1) {
            updateNodePath(dbResult.insertId);
            return resultMessage(0, '回文成功');
        }
        else {
            return resultMessage(1, '回文失敗');
        }
    }
}

async function getRepliesByArticleId(articleId) {

    let dbResult = await dal.getRepliesByArticleId(articleId);

    if (dbResult === dbError) {
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

    if (dbResult === dbError) {
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

async function getNodePath(id) {

    let nodePath = [];
    nodePath.push(id)
    let result = await dal.getParentIdById(id);

    if (result.length === 0) {
        return nodePath;
    }

    parentId = result[0].parentId;
    
    while (parentId !== 0) {
        nodePath.unshift(parentId)
        result = await dal.getParentIdById(parentId);
        parentId = result[0].parentId;
    }
    return nodePath;
}

async function updateNodePath(id) {
    let nodePath = await getNodePath(id);
    let result = await dal.updateNodePath(id, nodePath.join(','));
    if (result === dbError) {
        return resultMessage(1, '');
    }
    else {
        return resultMessage(0, '', nodePath);
    }
}

async function getArticleAndAllReplies(id) {

    let result = await dal.getArticleAndAllReplies(id);
    if (result === dbError) {
        return resultMessage(1, '');
    }
    else {
        return resultMessage(0, '', result);
    }
}

[28, 29]
    .forEach((val, index) => {
        updateNodePath(val);
    })


module.exports = {
    getCategories
    , article_add
    , getArticles
    , getArticleById
    , article_reply
    , getRepliesByArticleId
    , updateNodePath
    , getArticleAndAllReplies
}