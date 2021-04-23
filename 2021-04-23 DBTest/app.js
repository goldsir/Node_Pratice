const { createPool } = require('mysql');
let {
        dbconnectionPool
        , executeSQL
} = require('./common.mysql.pool');


//let sqlStr = `INSERT INTO \`user\` SET Account = 'TTT3', PASSWORD=MD5('123456'), CreateDate=CURRENT_TIMESTAMP;`;
let sqlStr = `
        select * from \`user\` where Account ='ttt3';
        select * from \`user\` where Account ='ttt3';
`;

(async function () {
        let result = await executeSQL(sqlStr);
        console.log(result);
        dbconnectionPool.end();
})();
