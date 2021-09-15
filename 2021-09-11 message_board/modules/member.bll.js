const { resultMessage } = require('../common');
const dal = require('./member.dal');

async function ifAccountExists(account) {

    let dbResult = await dal.ifAccountExists(account)

    if (dbResult === 'dbError') {
        return false;
    }
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

    let _ifAccountExists = await ifAccountExists(account);
    if (_ifAccountExists) {
        return resultMessage(1, '帳號重複');
    }

    let ifRegisterSuccess = await addNewAccount(account, password);
    if (ifRegisterSuccess === false) {
        return resultMessage(1, '註冊失敗');
    }

    return resultMessage(0, '註冊成功');
}

async function login(account, password) {

    let dbResult = await dal.checkAccountAndPassword(account, password)
    if (dbResult === 'dbError') {
        return resultMessage(1, '登入失敗');  // 不對外揭露原因
    }

    if (dbResult.length === 1) {

        let { loginSId, loginSIdCRC32 } = dbResult[0];

        await dal.addMemberLoginLog(account, loginSIdCRC32, loginSId);

        return resultMessage(0, '登入成功', loginSId);
    }
    else {
        return resultMessage(1, '帳號/密碼錯誤');  // 不對外揭露原因
    }
}

module.exports = {
    register
    , login
}