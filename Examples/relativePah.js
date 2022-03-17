const fs = require('fs');

/* 
    當前目錄沒有gy.txt => node relativePah.js 會失敗
     退回TC_Node_Pratice目錄 node example\relativePah.js 才會成功
        |- 相對路徑是以命令執行的目錄作為起點的
*/

fs.readFile('./gy.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err)
    }

    res.end(data);
});