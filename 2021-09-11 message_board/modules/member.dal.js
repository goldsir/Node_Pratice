const { executeSQL } = require('../mySQLConfig');
const { uuid } = require('uuidv4');


async function ifAccountExists(account) {

    let sql = `SELECT Account FROM member WHERE Account = '${account}';`;
    let result = await executeSQL(sql);
    return result;

}

async function addNewAccount(account, password) {

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


    // 帳號、密碼都匹配就給它一個uuid
    let _uuid = uuid()

    let sql = `
        SELECT 
            CRC32('${_uuid}') AS loginSIdCRC32
            , '${_uuid}' AS loginSId
        FROM Member
        WHERE 
            Account = '${account}'
            AND \`PASSWORD\` = MD5('${password}')
    `;

    let result = await executeSQL(sql);
    return result;
}

async function addMemberLoginLog(account, loginSIdCRC32, loginSId) {

    let sql = `
        INSERT INTO MemberLoginLog
        SET
            Account         = '${account}'
            , LoginSIdCRC32 = ${loginSIdCRC32}
            , LoginSId      = '${loginSId}'
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