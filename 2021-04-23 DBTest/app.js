const { createPool } = require('mysql');
let {
        dbConnectionPool
        , executeSQL
} = require('./common.mysql.pool');

let quote = [
        '一直烙賽賽'
        , '嚶嚶嚶嚶嚶嚶'
        , '賴皮鬼'
        , '一把眼淚一把鼻涕'
        , '肚子餓會鬧脾氣'
];

let accountPrefix = 'Jess';

let datas = [];
for (let i = 1; i <= 123; i++) {

        let accountEnd = '0'.padStart(3, '0') + i;
        accountEnd = accountEnd.slice(-4);
        let account = accountPrefix + accountEnd;

        let obj = {
                Id: i
                , UserName: account
                , Memo: quote[Math.ceil(Math.random() * 4)]
        }

        datas.push(obj);
}

(async function () {
        for (data of datas) {

                let { UserName, Memo } = data;

                let sqlStr = `
                INSERT INTO \`User\`
				SET 
						UserName = N'嚶嚶怪'
						, UserAccount = '${UserName}'
						, UserPassword = MD5('123456')
						, Memo = N'${Memo}'
						, CreateDate = CURRENT_TIMESTAMP
				;        
        ` ;

			await executeSQL(sqlStr)
        }
        dbConnectionPool.end();
})();
