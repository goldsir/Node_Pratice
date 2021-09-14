const { resultMessage } = require('../common');
const dal = require('./member.dal');

async function checkAccountExists(account) {

    let dbResult = await dal.checkAccountExists(account)
    return dbResult.length === 1 ? true : false;
}

async function addNewAccount(account, password) {

    let dbResult = await dal.addNewAccount(account, password);
    if (dbResult === 'dbError') {
        return false;
    }
    return dbResult.affectedRows === 1 ? true : false;
}

async function register(account, password) {

    let ifAccountExists = await checkAccountExists(account);
    if (ifAccountExists) {
        return resultMessage(1, '帳號重複');
    }

    let ifRegisterSuccess = await addNewAccount(account, password);
    if (ifRegisterSuccess === false) {
        return resultMessage(1, '註冊失敗');
    }

    return resultMessage(0, '註冊成功');
}

module.exports = {
    checkAccountExists
    , register
}