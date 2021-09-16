const { resultMessage } = require('../common');
const dal = require('./member.dal');
const { jwtSign } = require('./member.util.login');

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

async function login(account, password, ip) {

    let dbResult = await dal.checkAccountAndPassword(account, password)
    if (dbResult === 'dbError') {
        return resultMessage(1, '登入失敗');  // 不對外揭露原因
    }

    if (dbResult.length === 1) {

        await dal.addMemberLoginLog(account, ip);

        let token = await jwtSign({
            account: account
            , ip: ip
        });

        return resultMessage(0, '登入成功', token);
    }
    else {
        return resultMessage(1, '帳號/密碼錯誤');  // 不對外揭露原因
    }
}

module.exports = {
    register
    , login
}