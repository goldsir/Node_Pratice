const { executeSQL } = require('../mySQLConfig');


async function checkAccountExists(account) {

    let sql = `SELECT Account FROM member WHERE Account = '${account}';`;

	try{
	    let result = await executeSQL(sql);
		return result;
	}
	catch(err){
		return 'dbError'
	}
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
	
    try{
	    let result = await executeSQL(sql);
		return result;
	}
	catch(err){
		return 'dbError'
	}
}


module.exports = {

    checkAccountExists
    , addNewAccount

}

