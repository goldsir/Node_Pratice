const { dbConnection, executeSQL } = require('../common.mysql.pool')

async function getUserList(pageIndex, pageSize) {

    let totalRows = 0; // 資料總筆數

    let ids = await executeSQL(`SELECT Id FROM \`User\` ORDER BY Id ASC ;`);
    totalRows = ids.length;  // 取得資料總筆數   

    ids = ids.map(item => { return item.Id });

    let startIndex = (pageIndex - 1) * pageSize;  // 陣列是 0 Base
    let endIndex = pageIndex * pageSize;

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex > ids.length) {
        endIndex = ids.length
    }

    let targets = ids.slice(startIndex, endIndex);
    targets = targets.join(',');

    let result = await executeSQL(`
        SELECT 
            Id
            ,UserName
            , UserAccount
            , UserPassword
            , Memo
            , CreateDate 
        FROM \`User\` 
        Where Id IN (${targets}) 
        ORDER BY Id ASC ;`
    );

    return {
        datas: result
        , totalRows
    }
}

/*
getUserList(2, 30).then(() => {
    dbConnection.end();
}).catch(() => {
    dbConnection.end();
});*/

module.exports = {
    getUserList


}