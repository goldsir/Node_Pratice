const { executeSQL, escape } = require('../mySQLConfig');

async function ifAccountExists(account) {

    let sql = `SELECT Account FROM member WHERE Account = '${account}';`;
    let result = await executeSQL(sql);
    return result;

}

async function addNewAccount(account, password) {

    account = escape(account);
    password = escape(password);


    let sql = `
        INSERT INTO member
        SET
            Account = '${account}'
            , \`Password\` = MD5('${password}')
            , EMail = NULL
            , CreateTime = CURRENT_TIMESTAMP ;
    `;

    let result = await executeSQL(sql);
    return result;
}


async function checkAccountAndPassword(account, password) {

    account = escape(account);
    password = escape(password);

    let sql = `
        SELECT Account
        FROM Member
        WHERE 
            Account = '${account}'
            AND \`PASSWORD\` = MD5('${password}')
    `;

    let result = await executeSQL(sql);
    return result;
}

async function addMemberLoginLog(account, IP) {

    account = escape(account);
    IP = escape(IP);

    let sql = `
        INSERT INTO MemberLoginLog
        SET
            Account         = '${account}'
            , IP            = '${IP}'
            , LoginTime     = CURRENT_TIMESTAMP ;
    `;

    let result = await executeSQL(sql);
    return result;
}





module.exports = {

    ifAccountExists
    , addNewAccount
    , checkAccountAndPassword
    , addMemberLoginLog
}