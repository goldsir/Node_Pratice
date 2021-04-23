const { createPool } = require('mysql');
let {
        dbconnectionPool
        , executeSQL
} = require('./common.mysql.pool');


let sqlStr = `slect * from game_list;`;

(async function () {

        let result = await executeSQL(sqlStr);
        console.log(result);
        dbconnectionPool.end();
})();
