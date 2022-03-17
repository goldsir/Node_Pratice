// 相对路径是以命令执行的目录作为起点的
const fs = require('fs');


// 當前目錄沒有gy.txt => node relativePah.js 會失敗

fs.readFile('./gy.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err)
    }

    res.end(data);
});
