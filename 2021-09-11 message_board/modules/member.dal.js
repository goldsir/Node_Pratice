const { executeSQL } = require('../mySQLConfig');


async function checkAccountExists(account) {

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


module.exports = {

    checkAccountExists
    , addNewAccount

}

checkAccountExists('tc');